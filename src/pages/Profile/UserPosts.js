import React, { useEffect, useRef, useState } from "react";
import { getPostByUser } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import UserPostItem from "../../components/PendingPost/UserPostItem";
import Loader from "../../components/loader";
import { getReturnData } from "../../Utility/Util";
import API from "@aws-amplify/api";
import { onPostByUser } from "../../graphql-custom/post/subscription";
import Card from "../../components/card";

export default function UserPosts({ userId, type, card }) {
  const [userPosts, setUserPosts] = useState([]);
  const [subscriptionPost, setSubscriptionPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(0);

  const subscriptions = {};
  const itemRef = useRef();

  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: userId,
      sortDirection: "DESC",
      filter: { status: { eq: type } },
      limit: 6,
    },
  });

  const [setPostScroll] = useInfiniteScroll(userPosts, setUserPosts, itemRef);
  //FORCE RENDER STATE

  const subscrib = () => {
    subscriptions.onPostByUserConfirmedPost = API.graphql({
      query: onPostByUser,
      variables: {
        user_id: userId,
        status: "CONFIRMED",
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPost(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });

    subscriptions.onPostByUserPendingPost = API.graphql({
      query: onPostByUser,
      variables: {
        user_id: userId,
        status: "PENDING",
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPost(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
    subscriptions.onPostByUserArchivedPost = API.graphql({
      query: onPostByUser,
      variables: {
        user_id: userId,
        status: "ARCHIVED",
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPost(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  const fetchUserPosts = async (data, setData) => {
    try {
      if (!loading) {
        setLoading(true);
        let resp = await nextPosts();
        if (resp) {
          setData([...data, ...resp]);
        }
        setLoading(false);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchUserPosts(userPosts, setUserPosts);
    setPostScroll(fetchUserPosts);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userId) subscrib();
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
      setPostScroll(null);
    };
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (subscriptionPost) {
      const postIndex = userPosts.findIndex(
          (post) => post.id === subscriptionPost.id
      );

      if (subscriptionPost.status === type) {
        if (postIndex <= -1) {
          setUserPosts(prev=>[subscriptionPost, ...prev]);
        }
      } else {
        if (postIndex > -1) {
          userPosts.splice(postIndex, 1);
          setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscriptionPost]);
  return (
    <div className={"w-full"}>
      {userPosts.length > 0 &&
        userPosts.map((data, index) => {
          return card ? (
            <div key={index} className="grid-container mt-b5 justify-center">
              <Card
                video={data.items.items[0].file.type.startsWith("video")}
                post={data}
                className="ph:mb-4 sm:mb-4"
              />
            </div>
          ) : (
            <div
              key={index}
              className="hover:shadow hover:bg-caak-liquidnitrogen flex items-center bg-white border-t"
            >
              <div className="flex items-center w-full">
                <UserPostItem post={data} className="ph:mb-4 sm:mb-4 " />
              </div>
            </div>
          );
        })}
      <div ref={itemRef} className={"flex justify-center items-center"}>
        <Loader
          containerClassName={"self-center"}
          className={`bg-caak-primary ${loading ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
