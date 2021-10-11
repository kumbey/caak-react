import { useEffect, useState } from "react";
import ImageCarousel from "../../../components/carousel/ImageCarousel";
import Button from "../../../components/button";
import CommentCard from "../../../components/card/CommentCard";
import SubCommentCard from "../../../components/card/SubCommentCard";
import PostHeader from "./PostHeader";
import { useHistory, useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getPostView } from "../../../graphql-custom/post/queries";
import { checkUser, getFileUrl } from "../../../Utility/Util";
import Dummy from "dummyjs";
import useScrollBlock from "../../../Utility/useScrollBlock";
import { createPostViews } from "../../../graphql-custom/postViews/mutation";
import { useUser } from "../../../context/userContext";

const ViewPost = () => {
  const [post, setPost] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const { postId } = useParams();
  const history = useHistory();
  const { user } = useUser();

  useEffect(() => {
    try {
      const getPostById = async (id) => {
        const resp = await API.graphql(graphqlOperation(getPostView, { id }));
        setPost(resp.data.getPost);
      };
      getPostById(postId);
    } catch (ex) {
      console.log(ex);
    }
  }, [postId]);

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 39) {
        nextItem();
      } else if (e.keyCode === 37) {
        prevItem();
      } else if (e.keyCode === 27) {
        history.goBack();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  });
  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    blockScroll();
    return () => {
      allowScroll();
    };
  }, [allowScroll, blockScroll]);

  const createPostView = async () => {
    try {
      await API.graphql(
        graphqlOperation(createPostViews, {
          input: { post_id: post.id, user_id: user.sysUser.id },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checkUser(user)) {
      post && createPostView();
    }
    // eslint-disable-next-line
  }, [post]);

  const nextItem = () => {
    if (activeIndex < post.items.items.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(post.items.items.length - 1);
    }
  };
  return post ? (
    <div
      className={
        "z-10 fullscreen_header_size fixed top-0 w-full h-full flex flex-col justify-between sm:flex-col md:flex-col lg:flex-row"
      }
    >
      <div
        className={
          "relative backBlur max-w-full w-full flex justify-center items-center h-full sm:h-1/2 md:h-1/2 lg:h-full"
        }
      >
        {/*<div className={"nonBlur"}>*/}
        {activeIndex > 0 && (
          <span
            onClick={() => prevItem()}
            className={
              "cursor-pointer z-2 absolute text-2xl left-2 text-white  top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
        )}

        {activeIndex !== post.items.items.length - 1 && (
          <span
            onClick={() => nextItem()}
            className={
              "cursor-pointer z-2 absolute text-2xl right-2 text-white top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        )}

        <ImageCarousel>
          {post.items.items.map((item, index) => {
            if (activeIndex === index)
              if (item.file.type.startsWith("video")) {
                return (
                  <video
                    key={index}
                    controls
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    className={"h-full backdrop-blur"}
                  >
                    <source src={getFileUrl(item.file)} type="video/mp4" />
                  </video>
                  //     <VideoJS
                  //         videoClassName={"w-full max-h-half lg:max-h-full md:h-full sm:max-h-half object-contain z-0"}
                  //         options={{
                  //           autoplay: false,
                  //           controls: true,
                  //           responsive: false,
                  //           fluid: false,
                  //           sources: [
                  //             {
                  //               src: getFileUrl(item.file),
                  //               type: "video/mp4",
                  //             },
                  //           ],
                  //         }}
                  //     />
                );
              } else {
                return (
                  <img
                    className={`w-full max-h-half lg:max-h-full md:h-full sm:max-h-half object-contain z-0`}
                    key={index}
                    src={getFileUrl(item.file)}
                    alt={""}
                  />
                );
              }
            return null;
          })}
        </ImageCarousel>
        <div className={"flex flex-row absolute bottom-6"}>
          {post.items.items.length > 1 &&
            post.items.items.map((_, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-full mr-1.5 w-2 h-2 bg-white ${
                    activeIndex === index ? "bg-opacity-100" : "bg-opacity-40"
                  } `}
                />
              );
            })}
        </div>
      </div>
      {/*</div>*/}
      <div
        className={
          "relative flex flex-col w-full  lg:max-w-xl md:w-full lg:w-3/4 lg:max-w-3/4 bg-white h-full pt-7 overflow-y-scroll"
        }
      >
        <div className={"cursor-pointer absolute right-4 top-0 z-50"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
        <div className={"relative flex flex-row px-7"}>
          <div className={"relative"}>
            <img
              className="w-c60 m-34px rounded-square"
              src={
                post.group.profile
                  ? getFileUrl(post.group.profile)
                  : Dummy.image("100x100")
              }
              alt={post.group?.profile?.name}
            />
            <img
              className="-bottom-2 -right-3 w-9 absolute border-2 border-white rounded-full"
              src={
                post.user.pic
                  ? getFileUrl(post.user.pic)
                  : Dummy.image("100x100")
              }
              alt={post.user.name}
            />
          </div>
          <div className={"flex flex-col justify-center ml-5 self-center"}>
            <span className={"text-caak-generalblack font-bold text-18px"}>
              {post.group.name}
            </span>
            <span className={"text-caak-generalblack text-15px"}>
              {post.user.nickname}
            </span>
          </div>
        </div>
        <PostHeader
          item={post.items.items[activeIndex]}
          updatedAt={post.updatedAt}
          title={post.title}
        />

        <div
          className={
            "relative flex flex-col justify-between bg-caak-whitesmoke pt-4"
          }
        >
          <div className={"flex flex-row border-b-2 px-7"}>
            <img
              className="m-34px w-10 h-10 rounded-full"
              src={Dummy.image("100x100")}
              alt="Alex"
            />
            <CommentCard item={post.items.items[activeIndex]}>
              <SubCommentCard name={"Bataa"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Nomio"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Tsetsegee"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Saraa"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Boloroo"} comment={"Харин тиймээ"} />
            </CommentCard>
          </div>
          <div
            className={
              "bg-white sticky bottom-0 right-0 left-0 flex flex-row justify-between items-center py-3"
            }
          >
            <div className={"flex flex-row justify-center items-center"}>
              <img
                className="border-caak-primary w-10 h-10 ml-5 border-2 rounded-full"
                src="https://i.pravatar.cc/100"
                alt="Alex"
              />
            </div>
            <div className={"relative flex w-3/5 justify-center items-center"}>
              <textarea
                rows={1}
                className={
                  "px-2.5 border-0 bg-caak-liquidnitrogen w-full text-caak-darkBlue rounded-square text-16px  focus:ring-1 ring-caak-primary"
                }
                placeholder={"Сэтгэгдэл үлдээх"}
              />
              <div
                className={
                  "flex flex-row absolute right-2 text-18px text-caak-generalblack"
                }
              >
                <span className={"icon-fi-rs-mention mr-2"} />
                <span className={"icon-fi-rs-emoji"} />
              </div>
            </div>

            <Button
              className={
                "bg-white text-caak-primary py-2 text-15px font-medium h-full mx-2 border-0 shadow-none"
              }
            >
              Илгээх
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ViewPost;
