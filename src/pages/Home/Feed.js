import { useEffect, useState } from "react";
import Card from "../../components/card";
import Button from "../../components/button";
import BottomTabs from "./BottomTabs";
import { useUser } from "../../context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listGroupsForAddPost } from "../../graphql-custom/group/queries";
import { checkUser, generateFileUrl } from "../../Utility/Util";
import { getPostByStatus } from "../../graphql-custom/post/queries";

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
  const [activeIndex, setActiveIndex] = useState();

  const { user } = useUser();
  const [data] = useState(new Array(9).fill(""));
  const [groupData, setGroupData] = useState([]);
  const [posts, setPosts] = useState([]);

  const getGroups = async () => {
    try {
      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));
      setGroupData(resp.data.listGroups.items);
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchPosts = async () => {
    try {

      let resp = []
      if(checkUser(user)){
        resp = await API.graphql(graphqlOperation(getPostByStatus));
      }else{
        resp = await API.graphql({ 
          query: getPostByStatus,
          authMode: 'AWS_IAM'
        });
      }

      setPosts(resp.data.getPostByStatus.items);
      console.log(posts);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if(checkUser(user)){
      getGroups();
    }
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <main>
        <div className={`pt-4 px-10 w-full`}>
          {/*<Card verifiedUser video/> */}
          <div
            className={`h-full flex ${
              user ? "flex-row items-start" : "flex-col items-center"
            } `}
          >
            <div className={"flex flex-col w-1/5"}>
              <div
                className={`flex ${
                  user ? "flex-col" : "flex-row w-full"
                } justify-center mt-b4 pb-4 pr-6`}
              >
                {feedType.map(({ icon, active, type, id }) => {
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
              <div className={`${!user && "hidden"}`}>
                <div className={"flex flex-row justify-between px-3.5 pt-2"}>
                  <span className={"text-15px text-caak-darkBlue"}>
                    Миний үүсгэсэн бүлгүүд
                  </span>
                </div>
                <div className={"px-2 pb-5"}>
                  {groupData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        // onClick={() => onSelect(item)}
                        className={"flex flex-col cursor-pointer w-max"}
                      >
                        <div
                          className={
                            "flex flex-row items-center p-1.5 my-px rounded-square hover:bg-caak-liquidnitrogen"
                          }
                        >
                          <img
                            src={generateFileUrl(item.profile)}
                            className={"w-8 h-8 rounded-md object-cover mr-2"}
                            alt={""}
                          />
                          <span
                            className={
                              "text-caak-generalblack font-medium text-15px"
                            }
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className={
                    "flex flex-row justify-between border-t border-caak-liquidnitrogen px-3.5"
                  }
                >
                  <span className={"text-15px text-caak-darkBlue pt-2"}>
                    Миний дагасан бүлгүүд
                  </span>
                </div>
                <div className={"px-2"}>
                  {groupData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        // onClick={() => onSelect(item)}
                        className={"flex flex-col cursor-pointer w-max"}
                      >
                        <div
                          className={
                            "flex flex-row items-center p-1.5 my-px rounded-square hover:bg-caak-liquidnitrogen"
                          }
                        >
                          <img
                            src={generateFileUrl(item.profile)}
                            className={"w-8 h-8 rounded-md object-cover mr-2"}
                            alt={""}
                          />
                          <span
                            className={
                              "text-caak-generalblack font-medium text-15px"
                            }
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="2xl:grid-cols-3 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 gap-c11 mt-b4 ph:mt-0 mb-b4">
              {posts.map((data, index) => {
                return (
                  <Card
                    video={data.items.items[0].file.type.startsWith('video')}
                    post={data}
                    key={index}
                    className="ph:mb-4 sm:mb-4 btn:mb-4"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <footer className={`hidden ph:block sticky bottom-0`}>
        <BottomTabs />
      </footer>
    </div>
  );
};
export default Feed;
