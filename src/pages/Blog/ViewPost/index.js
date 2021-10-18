import { useEffect, useRef, useState } from "react";
import ImageCarousel from "../../../components/carousel/ImageCarousel";
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
import AddComment from "./AddComment";
import PostBody from "./PostBody";
import GroupInformationDrop from "../../../components/PendingPost/GroupInformationDrop";
import PostMore from "../../../components/card/PostMore";
import { useClickOutSide } from "../../../Utility/Util";

const ViewPost = () => {
  const [post, setPost] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { postId } = useParams();
  const history = useHistory();
  const { user } = useUser();
  const addCommentRef = useRef();
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    try {
      const getPostById = async (id) => {
        let resp;
        if (checkUser(user)) {
          resp = await API.graphql(graphqlOperation(getPostView, { id }));
        } else {
          resp = await API.graphql({
            query: getPostView,
            variables: { id },
            authMode: "AWS_IAM",
          });
        }
        setPost(resp.data.getPost);
      };
      getPostById(postId);
    } catch (ex) {
      console.log(ex);
    }
    // eslint-disable-next-line
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
    } catch (ex) {
      console.log(ex);
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

  //Swipe left, right on mobile screen
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextItem();
    }

    if (diff < -5) {
      prevItem();
    }

    setTouchPosition(null);
  };

  return post ? (
    <div
      className={
        "z-50 fullscreen_header_size fixed top-0 w-full h-full flex flex-col justify-between sm:flex-col md:flex-col lg:flex-row"
      }
    >
      <div
        className={
          "relative backBlur max-w-full w-full flex justify-center items-center h-full sm:h-1/2 md:h-1/2 lg:h-full"
        }
      >
        <span
          onClick={() => history.goBack()}
          className={
            "absolute cursor-pointer icon-fi-rs-close text-16px text-white top-4 right-4 z-2"
          }
        />
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
            if (item.file.type.startsWith("video")) {
              return (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  key={index}
                  className={
                    "w-full flex justify-center flex-shrink-0 transition duration-300"
                  }
                  style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                  }}
                >
                  <video
                    key={index}
                    controls
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    className={"h-half backdrop-blur"}
                  >
                    <source src={getFileUrl(item.file)} type="video/mp4" />
                  </video>
                </div>
              );
            } else {
              return (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  // onTouchMove={(e) => swiperHandler(e)}
                  key={index}
                  className={"w-full flex-shrink-0 transition duration-300"}
                  style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                  }}
                >
                  <img
                    className={`w-full max-h-half lg:max-h-full md:h-full sm:max-h-half object-contain z-0`}
                    key={index}
                    src={getFileUrl(item.file)}
                    alt={""}
                  />
                </div>
              );
            }
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
          "relative flex flex-col w-full justify-between lg:max-w-xl md:w-full lg:w-3/4 lg:max-w-3/4 bg-white h-full pt-7 overflow-y-scroll"
        }
      >
        <div>
          <div
            ref={menuRef}
            className={
              "flex justify-center items-center absolute right-4 top-6 z-10"
            }
          >
            <span onClick={toggleMenu} className={"cursor-pointer icon-fi-rs-dots text-4px mr-2"} />
          </div>
          <GroupInformationDrop
            className="absolute right-5"
            open={isMenuOpen}
            onToggle={toggleMenu}
            content={
              <PostMore postId={postId} postUser={user}/>
            }
          />
          <div className={"relative flex flex-row px-7"}>
            <div className={"relative"}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
            addCommentRef={addCommentRef}
            item={post.items.items[activeIndex]}
            updatedAt={post.updatedAt}
            title={post.title}
          />
          <PostBody
            posts={post}
            activeIndex={activeIndex}
            post={post.items.items[activeIndex]}
          />
        </div>
        <AddComment
          addCommentRef={addCommentRef}
          posts={post}
          activeIndex={activeIndex}
          item={post.items.items[activeIndex]}
        />
      </div>
    </div>
  ) : null;
};

export default ViewPost;
