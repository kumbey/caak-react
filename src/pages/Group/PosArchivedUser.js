import React, { useEffect, useRef, useState } from "react";
import { getPostByUser } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import UserPostItem from "../../components/PendingPost/UserPostItem";
import Loader from "../../components/loader";
import { getReturnData } from "../../Utility/Util";
import API from "@aws-amplify/api";
import { onPostByUser } from "../../graphql-custom/post/subscription";

export default function PostArchivedUser({ userId }) {
  const [userArchivedPosts, setUserArchivedPosts] = useState([]);
  const [subscriptionArchived, setSubscriptionArchived] = useState(null);
  const subscriptions = {};
  const itemRef = useRef();
  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: userId,
      sortDirection: "DESC",
      filter: { status: { eq: "ARCHIVED" } },
      limit: 6,
    },
  });

  const [setPostScroll] = useInfiniteScroll(
    userArchivedPosts,
    setUserArchivedPosts,
    itemRef
  );
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);

  const subscrib = () => {
    subscriptions.onPostByUserArchived = API.graphql({
      query: onPostByUser,
      variables: {
        user_id: userId,
        status: "ARCHIVED",
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionArchived(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
    subscriptions.onPostByUserConfirmed = API.graphql({
      query: onPostByUser,
      variables: {
        user_id: userId,
        status: "CONFIRMED",
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionArchived(onData);
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
    fetchUserPosts(userArchivedPosts, setUserArchivedPosts);
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
    if (subscriptionArchived) {
      if (
        !userArchivedPosts.find((item) => item?.id === subscriptionArchived?.id)
      ) {
        if (subscriptionArchived.status === "ARCHIVED")
          setUserArchivedPosts((prev) => [subscriptionArchived, ...prev]);
      } else {
        const filtered = userArchivedPosts.filter(
          (item) => item.id !== subscriptionArchived.id
        );
        setUserArchivedPosts([...filtered]);
      }
    }
    // eslint-disable-next-line
  }, [subscriptionArchived]);

  return (
    <div className={"w-full"}>
      <div className="py-b4 flex items-center w-full pr-2 bg-white border-t">
        <div className="text-16px flex items-center w-full">
          <div className="w-1/2 text-center">
            <p>Постын нэр</p>
          </div>
          <div className="w-1/4">
            <p>Нийтлэгч</p>
          </div>
          <div className="w-1/4">
            <p>Хугацаа</p>
          </div>
        </div>
      </div>
      {userArchivedPosts.map((data, index) => {
        return (
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
