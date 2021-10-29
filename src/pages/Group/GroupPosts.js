import React, { useEffect, useRef, useState } from "react";
import { getPostByGroup } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import Loader from "../../components/loader";
import { getReturnData } from "../../Utility/Util";
import API from "@aws-amplify/api";
import { onPostByGroup } from "../../graphql-custom/post/subscription";
import Card from "../../components/card";
import PendingPostItem from "../../components/PendingPost/PendingPostItem";
import Checkbox from "../../components/checkbox/Checkbox";

export default function GroupPosts({ groupId, type, card }) {
    const [groupPosts, setGroupPosts] = useState([]);
    const [subscriptionPost, setSubscriptionPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(0);
    const [isCheck, setIsCheck] = useState([])

    const subscriptions = {};
    const itemRef = useRef();

    const [nextPosts] = useListPager({
        query: getPostByGroup,
        variables: {
            group_id: groupId,
            sortDirection: "DESC",
            filter: { status: { eq: type } },
            limit: 6,
        },
    });

    const [setPostScroll] = useInfiniteScroll(groupPosts, setGroupPosts, itemRef);
    //FORCE RENDER STATE
  
    const subscrib = () => {
      subscriptions.onPostByGroupConfirmedPost = API.graphql({
        query: onPostByGroup,
        variables: {
          group_id: groupId,
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
  
      subscriptions.onPostByGroupPendingPost = API.graphql({
        query: onPostByGroup,
        variables: {
          group_id: groupId,
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
      subscriptions.onPostByGroupArchivedPost = API.graphql({
        query: onPostByGroup,
        variables: {
          group_id: groupId,
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
  
    const fetchGroupPosts = async (data, setData) => {
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
      fetchGroupPosts(groupPosts, setGroupPosts);
      setPostScroll(fetchGroupPosts);
      // eslint-disable-next-line
    }, []);
  
    useEffect(() => {
      if (groupId) subscrib();
      return () => {
        Object.keys(subscriptions).map((key) => {
          subscriptions[key].unsubscribe();
          return true;
        });
        setPostScroll(null);
      };
      // eslint-disable-next-line
    }, [groupId]);
  
    useEffect(() => {
      if (subscriptionPost) {
        const postIndex = groupPosts.findIndex(
            (post) => post.id === subscriptionPost.id
        );
  
        if (subscriptionPost.status === type) {
          if (postIndex <= -1) {
            setGroupPosts(prev=>[subscriptionPost, ...prev]);
          }
        } else {
          if (postIndex > -1) {
            groupPosts.splice(postIndex, 1);
            setRender(render + 1);
          }
        }
      }
      // eslint-disable-next-line
    }, [subscriptionPost]);

  useEffect(() => {
    fetchGroupPosts(groupPosts, setGroupPosts);
    setPostScroll(fetchGroupPosts);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (groupId) subscrib();
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
      setPostScroll(null);
    };
    // eslint-disable-next-line
  }, [groupId]);

  useEffect(() => {
    if (subscriptionPost) {
      const postIndex = groupPosts.findIndex(
          (post) => post.id === subscriptionPost.id
      );
      if (subscriptionPost.status === type) {
        if (postIndex <= -1) {
          setGroupPosts(prev=>[subscriptionPost, ...prev]);
        }
      } else {
        if (postIndex > -1) {
          groupPosts.splice(postIndex, 1);
          setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscriptionPost]);

  
  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (!checked) {
      setIsCheck(isCheck.filter((e) => e !== id));
    } else {
      setIsCheck([...isCheck, id]);
    }
  };

  return (
      <div
        className={
          "grid_container_container w-full flex flex-col justify-center"
        }
      >
            {
              card
              ?
              <div
                className={
                  "grid-container justify-center md:justify-center lg:justify-start"
                }
              >
                {groupPosts.length > 0 &&
                  groupPosts.map((data, index) => {
                    return (
                      <Card
                        key={index}
                        video={data?.items?.items[0]?.file?.type?.startsWith(
                          "video"
                        )}
                        post={data}
                        className="ph:mb-4 sm:mb-4"
                      />
                    );
                  })
                }
              </div>
              :
              <div
                className={
                  "w-full"
                }
              >
              {groupPosts.length > 0 &&
                groupPosts.map((data, index) => {
                  return (
                    <div key={index} className="flex items-center  border-t">
                      <Checkbox
                        key={data.id}
                        id={data.id}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(data.id)}
                        className="ml-c34 w-b4 h-b4 border-caak-darkgray border-2 rounded cursor-pointer"
                      />
                      <PendingPostItem post={data}/>
                    </div>
                  );
                })}
              </div>
            }
            <div ref={itemRef} className={"flex justify-center items-center"}>
              <Loader
                containerClassName={"self-center"}
                className={`bg-caak-primary ${loading ? "opacity-100" : "opacity-0"}`}
              />
            </div>
      </div>
  );
}
