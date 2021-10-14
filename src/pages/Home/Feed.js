import { useEffect, useState } from "react";
import Card from "../../components/card";
import Button from "../../components/button";
import BottomTabs from "./BottomTabs";
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
    /*{
                                                                                                                              id: 3,
                                                                                                                              type: "Бүлгүүд",
                                                                                                                              icon: "icon-fi-rs-group",
                                                                                                                            },
                                                                                                                            {
                                                                                                                              id: 4,
                                                                                                                              type: "Дагасан найзууд",
                                                                                                                              icon: "icon-fi-rs-following",
                                                                                                                            },*/
  ];
  const [activeIndex, setActiveIndex] = useState(0);

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
  const [setPostScroll] = useInfiniteScroll(posts, setPosts);
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);
  // const subscriptions = {}

  const listGroups = async () => {
    try {
      let adminResp = await API.graphql(graphqlOperation(listGroupsForAddPost, {
        filter: {or: [{role_on_group: {eq: "ADMIN"}}, {role_on_group: {eq: "MODERATOR"}}]}
      }));

      let memberResp = await API.graphql(graphqlOperation(listGroupsForAddPost, {
        filter: {role_on_group: {eq: "MEMBER"}}
      }));

      let unMemberResp = await API.graphql(graphqlOperation(listGroupsForAddPost, {
        filter: {and: [
          {role_on_group: {ne: "ADMIN"}}, 
          {role_on_group: {ne: "MODERATOR"}},
          {role_on_group: {ne: "MEMBER"}},
        ]}
      }));

      setGroupData({
        adminModerator: getReturnData(adminResp).items,
        member: getReturnData(memberResp).items,
        unMember: getReturnData(unMemberResp).items
      });
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
      console.log(ex);
    }
  };

  // const subscrip = () => {
  //   subscriptions.onChangedTotalsBy = API.graphql({
  //     query: onChangedTotalsBy,
  //     variables: {
  //       type: "PostTotal",
  //       id: "b34b6636-621c-4933-ae43-6f3ee58abda1"
  //     }
  //   }).subscribe({
  //     next: (data) => {
  //       console.log("data: ", data);
  //     },
  //   });
  // }


  useEffect(() => {
    
    fetchPosts(posts, setPosts);
    setPostScroll(fetchPosts);

    return () => {
      setPostScroll(null);
    }

    // subscrip()

    // return () => {
    //   Object.keys(subscriptions).map((key) => {
    //     subscriptions[key].unsubscribe();
    //     return true
    //   })
    // }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checkUser(user)) {
      listGroups();
    } 
    // eslint-disable-next-line
  }, [user]);


  return (
    <div id={"feed"}>
      <div className={`pt-3 px-0 md:px-10 w-full`}>
        <div
          className={`h-full flex ${
            user ? "flex-row items-start" : "flex-col items-center"
          } sm:justify-between md:justify-between lg:justify-between 2xl:justify-start 3xl:justify-center`}
        >
          <aside
            className={`hidden mr-4 md:flex flex flex-col w-2/6 lg:w-72 ${
              user && "sticky top-0"
            }`}
          >
            <div
              className={`flex ${
                user ? "flex-col" : "flex-row w-full"
              } justify-center mt-b4 pb-4 pr-6`}
            >
              {feedType.map(({ icon, type, id }) => {
                return (
                  <Button
                    key={id}
                    onClick={() => setActiveIndex(id)}
                    className={`h-12 ph:h-c24 ph:w-c38 w-56 min-w-max ${
                      id === activeIndex
                        ? "white shadow-button mb-2"
                        : "transparent mb-2"
                    }`}
                    iconPosition={"left"}
                    icon={
                      <div className={"w-5 mr-4 ph:w-4 ph:mr-2"}>
                        <i
                          className={`${icon}${
                            id === activeIndex ? "" : "-o"
                          } text-19px ph:text-15px`}
                        />
                      </div>
                    }
                  >
                    <p className="text-16px ph:text-15px font-bold">{type}</p>
                  </Button>
                );
              })}
            </div>
            <div className={`pr-6 `}>
            {
                (groupData.adminModerator.length > 0 ) ? 
                <>
                  <div className={"flex flex-row justify-between px-3.5 pt-2"}>
                    <span className={"text-15px text-caak-darkBlue"}>
                      {`Миний дагасан бүлгүүд`}
                    </span>
                  </div>
                  <div className={"px-2 pb-5"}>
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
                </> : null
              }
              {
                (groupData.member.length > 0 ) ? 
                <>
                  <div className={"flex flex-row justify-between px-3.5 pt-2"}>
                    <span className={"text-15px text-caak-darkBlue"}>
                      {`Миний дагасан бүлгүүд`}
                    </span>
                  </div>
                  <div className={"px-2 pb-5"}>
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
                </> : null
              }

              {
                (groupData.unMember.length > 0 ) ? 
                  <>
                    <div className={"flex flex-row justify-between px-3.5 pt-2"}>
                      <span className={"text-15px text-caak-darkBlue"}>
                        {`Бүлгүүд`}
                      </span>
                    </div>
                    <div className={"px-2 pb-5"}>
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
                  </> : null
              }
            </div>
          </aside>
          <div
            className={
              "grid_container_container w-full flex flex-col justify-center"
            }
          >
            <div
              className={`flex justify-center text-center whitespace-nowrap block sm:block md:hidden lg:hidden`}
            >
              {feedType.map(({ icon, type, id }) => {
                return (
                  <Button
                    key={id}
                    onClick={() => setActiveIndex(id)}
                    className={`h-8 w-auto mr-2 ${
                      id === activeIndex
                        ? "white shadow-button mb-2"
                        : "transparent mb-2"
                    }`}
                    iconPosition={"left"}
                    icon={
                      <div className={"w-5 mr-4 ph:w-4 ph:mr-2"}>
                        <i
                          className={`${icon}${
                            id === activeIndex ? "" : "-o"
                          } text-19px ph:text-15px`}
                        />
                      </div>
                    }
                  >
                    <p className="text-16px ph:text-15px font-bold">{type}</p>
                  </Button>
                );
              })}
            </div>
            <div
              className={
                "grid-container justify-center md:justify-center lg:justify-start"
              }
            >
              {posts.map((data, index) => {
                return (
                  <Card
                    key={index}
                    video={data.items.items[0].file.type.startsWith("video")}
                    post={data}
                    className="ph:mb-4 sm:mb-4"
                  />
                );
              })}
            </div>
            <Loader
              containerClassName={"self-center"}
              className={`bg-caak-primary ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
      <footer className={`block md:hidden sticky bottom-0 z-10`}>
        <BottomTabs />
      </footer>
    </div>
  );
};
export default Feed;
