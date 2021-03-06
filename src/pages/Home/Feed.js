import { useEffect, useRef, useState } from "react";
import Card from "../../components/card";
import Button from "../../components/button";
import { useUser } from "../../context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listGroupsForAddPost } from "../../graphql-custom/group/queries";
import { checkUser, getReturnData } from "../../Utility/Util";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import useInfiniteScroll from "./useFetch";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import Suggest from "../../components/Sidebar/Suggest";
import { useListPager } from "../../Utility/ApiHelper";
import { onPostUpdateByStatus } from "../../graphql-custom/post/subscription";
// import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";

const Feed = () => {
  const feedType = [
    {
      id: 0,
      type: "Тренд",
      icon: "icon-fi-rs-trend",
    },
    {
      id: 1,
      type: "Шинэ",
      icon: "icon-fi-rs-new",
    },
    {
      id: 2,
      type: "Шилдэг",
      icon: "icon-fi-rs-top",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef();
  const { user } = useUser();
  const [groupData, setGroupData] = useState({
    adminModerator: [],
    member: [],
    unMember: [],
  });
  const [posts, setPosts] = useState([]);
  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 6,
    },
  });
  const [setPostScroll] = useInfiniteScroll(posts, setPosts, feedRef);
  const [loading, setLoading] = useState(false);
  const [subscripedPost, setSubscripedPost] = useState(0);
  const subscriptions = {};

  //FORCE RENDER STATE
  const [render, setRender] = useState(0);

  const listGroups = async () => {
    try {
      const grData = {
        adminModerator: [],
        member: [],
        unMember: [],
      };

      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));

      resp = getReturnData(resp).items;

      for (let i = 0; i < resp.length; i++) {
        let item = resp[i];
        if (item.role_on_group === "NOT_MEMBER") {
          grData.unMember.push(item);
        } else if (item.role_on_group === "MEMBER") {
          grData.member.push(item);
        } else {
          grData.adminModerator.push(item);
        }
      }

      setGroupData(grData);
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchPosts = async (data, setData) => {
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
      setLoading(false);
      console.log(ex);
    }
  };

  const subscrip = () => {
    let authMode = "AWS_IAM";

    if (checkUser(user)) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }

    subscriptions.onPostUpdateByStatus = API.graphql({
      query: onPostUpdateByStatus,
      variables: {
        status: "CONFIRMED",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscripedPost({
          post: getReturnData(data, true),
          type: "add",
        });
      },
    });

    subscriptions.onPostUpdateByStatusDeleted = API.graphql({
      query: onPostUpdateByStatus,
      variables: {
        status: "ARCHIVED",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscripedPost({
          post: getReturnData(data, true),
          type: "remove",
        });
      },
    });

    subscriptions.onPostUpdateByStatusDeleted = API.graphql({
      query: onPostUpdateByStatus,
      variables: {
        status: "PENDING",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscripedPost({
          post: getReturnData(data, true),
          type: "remove",
        });
      },
    });
  };

  useEffect(() => {
    if (subscripedPost) {
      const postIndex = posts.findIndex(
        (post) => post.id === subscripedPost.post.id
      );

      if (subscripedPost.type === "add") {
        if (postIndex <= -1) {
          setPosts([subscripedPost.post, ...posts]);
        }
      } else {
        if (postIndex > -1) {
          posts.splice(postIndex, 1);
          setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscripedPost]);

  useEffect(() => {
    // fetchPosts(posts, setPosts);
    setPostScroll(fetchPosts);

    return () => {
      setPostScroll(null);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checkUser(user)) {
      listGroups();
    }

    subscrip();

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };

    // eslint-disable-next-line
  }, [user]);

  return (
    <div id={"feed"}>
      <div className={`px-0 md:px-10 w-full relative`}>
        <div
          className={`h-full flex ${
            user ? "flex-row items-start" : "flex-col items-center"
          } sm:justify-between md:justify-between lg:justify-between 2xl:justify-start 3xl:justify-center`}
        >
          <aside
            className={`py-5 hidden md:flex flex flex-col ${
              user && "sticky leftSideBar py-10"
            }`}
          >
            <div
              className={`flex ${
                user ? "flex-col" : "flex-row w-full"
              } justify-center`}
            >
              {feedType.map(({ icon, type, id }) => {
                return (
                  <Button
                    key={id}
                    onClick={() => setActiveIndex(id)}
                    className={`${
                      checkUser(user) ? "w-56" : "w-full"
                    } min-w-max ${
                      id === activeIndex
                        ? "white shadow-button mb-2"
                        : "transparent mb-2"
                    }`}
                    iconPosition={"left"}
                    icon={
                      <div className={"w-5 mr-px-6 ph:w-4 ph:mr-2"}>
                        <i
                          className={`${icon}${
                            id === activeIndex ? "" : "-o"
                          } text-19px ph:text-15px`}
                        />
                      </div>
                    }
                  >
                    <p className="font-bold text-16px ph:text-15px">{type}</p>
                  </Button>
                );
              })}
            </div>
            <div className={""}>
              <div className={`pr-6`}>
                {groupData.adminModerator.length > 0 ? (
                  <>
                    <div
                      className={"flex flex-row justify-between px-3.5 pt-2"}
                    >
                      <span className={"text-15px text-caak-darkBlue"}>
                        {`Миний группүүд`}
                      </span>
                    </div>
                    <div className={"px-2"}>
                      {groupData.adminModerator.map((data, index) => {
                        return (
                          <Link
                            key={index}
                            to={{
                              pathname: `/group/${data.id}`,
                            }}
                          >
                            <Suggest
                              item={data}
                              className="ph:mb-4 sm:mb-4 btn:mb-4 word-break"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {groupData.member.length > 0 ? (
                  <>
                    <div
                      className={"flex flex-row justify-between px-3.5 pt-2"}
                    >
                      <span className={"text-15px text-caak-darkBlue"}>
                        {`Миний элссэн группүүд`}
                      </span>
                    </div>
                    <div className={"px-2"}>
                      {groupData.member.map((data, index) => {
                        return (
                          <Link
                            key={index}
                            to={{
                              pathname: `/group/${data.id}`,
                            }}
                          >
                            <Suggest
                              item={data}
                              className="ph:mb-4 sm:mb-4 btn:mb-4 word-break"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {groupData.unMember.length > 0 ? (
                  <>
                    <div
                      className={"flex flex-row justify-between px-3.5 pt-2"}
                    >
                      <span className={"text-15px text-caak-darkBlue"}>
                        {`Бүлгүүд`}
                      </span>
                    </div>
                    <div className={"px-2"}>
                      {groupData.unMember.map((data, index) => {
                        return (
                          <Link
                            key={index}
                            to={{
                              pathname: `/group/${data.id}`,
                            }}
                          >
                            <Suggest
                              item={data}
                              className="ph:mb-4 sm:mb-4 btn:mb-4 word-break"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </aside>
          <div
            className={`grid_container_container mx-auto ${
              user ? "mt-2 md:mt-10" : ""
            }  w-full flex flex-col justify-center`}
          >
            <div
              className={`flex flex-wrap justify-center text-center whitespace-nowrap sm:block md:hidden lg:hidden py-2`}
            >
              {feedType.map(({ icon, type, id }) => {
                return (
                  <Button
                    key={id}
                    onClick={() => setActiveIndex(id)}
                    className={`h-8 w-auto mr-2 ${
                      id === activeIndex ? "white shadow-button" : "transparent"
                    }`}
                    iconPosition={"left"}
                    icon={
                      <div className={"w-5 mr-4 ph:w-4 ph:mr-2"}>
                        <i
                          className={`${icon}${
                            id === activeIndex ? "" : ""
                          } text-19px ph:text-15px`}
                        />
                      </div>
                    }
                  >
                    <p className="font-bold text-16px ph:text-15px">{type}</p>
                  </Button>
                );
              })}
            </div>
            <div
              className={
                "grid-container justify-center md:justify-center lg:justify-start"
              }
            >
              {posts.length > 0 &&
                posts.map((data, index) => {
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
                })}
            </div>
            <div ref={feedRef} className={"flex justify-center items-center"}>
              <Loader
                containerClassName={"self-center"}
                className={`bg-caak-primary ${
                  loading ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feed;
