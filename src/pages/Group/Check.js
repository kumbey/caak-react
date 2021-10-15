import { useEffect, useState } from "react";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import { useHistory, useLocation, useParams } from "react-router";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getPostView } from "../../graphql-custom/post/queries";
import { closeModal, getFileUrl } from "../../Utility/Util";
import CheckHeader from "./CheckHeader";
import { updatePost } from "../../graphql-custom/post/mutation";
import { useUser } from "../../context/userContext";

export default function Check({ hasApproveButtons }) {
  const { user } = useUser();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

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

  const acceptHandler = async (id) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status: "CONFIRMED" },
        })
      );
      setLoading(false);
      closeModal(history, state);
    } catch (ex) {
      console.log(ex);
    }
  };

  const declineHandler = async (id) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status: "ARCHIVED" },
        })
      );
      setLoading(false);
      closeModal(history, state);
    } catch (ex) {
      console.log(ex);
    }
  };
  return post ? (
    <Backdrop className="flex justify-center">
      <div className="absolute top-1/2 left-1/2 px-0 mt-10 w-full transform -translate-x-1/2 -translate-y-1/2 sm:px-2 md:px-10 lg:w-3/5">
        <div className="flex relative sticky top-0 justify-between w-full bg-white sm:hidden py-a1 px-c6">
          <span
            onClick={() => closeModal(history, state)}
            className="flex items-center icon-fi-rs-back"
          />
          <p className="text-20px">Фост шалгах</p>
          <span className="flex items-center icon-fi-rs-dots text-4px" />
        </div>
        <div className={"w-full"}>
          <div className="w-full h-screen bg-white rounded-lg sm:h-auto md:h-auto lg:h-auto">
            <p
              style={{ paddingBlockStart: "21px", marginBlockEnd: "17px" }}
              className="flex justify-center font-bold text-20px text-caak-generalblack"
            >
              {post.title}
            </p>
            <div className="flex items-center h-auto bg-black bg-opacity-80">
              <span
                style={{ paddingInline: "19px", paddingBlock: "15px" }}
                onClick={() => prevItem()}
                className={
                  "icon-fi-rs-back mx-c2 text-white cursor-pointer bg-white rounded-full bg-opacity-10 hover:bg-opacity-30"
                }
              />
              <div
                className={
                  "relative flex justify-center items-center bg-black bg-opacity-60 w-full"
                }
              >
                {post.items.items.map((item, index) => {
                  if (activeIndex === index)
                    if (item.file.type.startsWith("video")) {
                      return (
                        <video
                          key={index}
                          controls
                          disablePictureInPicture
                          controlsList="nodownload noremoteplayback noplaybackrate"
                          style={{ maxWidth: "550px", maxHeight: "600px" }}
                        >
                          <source
                            src={getFileUrl(item.file)}
                            type="video/mp4"
                          />
                        </video>
                      );
                    } else {
                      return (
                        <img
                          className={`block relative max-h-half`}
                          key={index}
                          src={getFileUrl(item.file)}
                          alt={""}
                        />
                      );
                    }
                  return null;
                })}
                <div className={"flex flex-row absolute bottom-6"}>
                  {post.items.items.map((_, index) => {
                    return (
                      <div
                        key={index}
                        className={`rounded-full mr-1.5 w-2 h-2 bg-white 
                                    ${
                                      activeIndex === index
                                        ? "bg-opacity-100"
                                        : "bg-opacity-40"
                                    } 
                                  `}
                      />
                    );
                  })}
                </div>
              </div>
              <span
                style={{ paddingInline: "19px", paddingBlock: "15px" }}
                onClick={() => nextItem()}
                className={
                  "icon-fi-rs-back mx-c2 ph:mx-a1 text-white transform rotate-180 cursor-pointer bg-white rounded-full bg-opacity-10 hover:bg-opacity-30"
                }
              />
            </div>
            <CheckHeader
              user={post.user}
              updatedAt={post.updatedAt}
              itemTitle={post.items.items[activeIndex].title}
            />
          </div>
          {!user.sysUser ? (
            <div className="flex justify-end mt-b4">
              <Button
                loading={loading}
                onClick={() => declineHandler(postId)}
                className="bg-white text-caak-generalblack text-15px w-c14"
              >
                Татгалзах
              </Button>
              <Button
                loading={loading}
                onClick={() => acceptHandler(postId)}
                className="text-white bg-caak-bleudefrance text-15px ml-b1 mr-c11 w-c132"
              >
                Зөвшөөрөх
              </Button>
            </div>
          ) : null}
        </div>
        <span
          onClick={() => closeModal(history, state)}
          className="text-white cursor-pointer icon-fi-rs-close text-30px mt-c3 ml-c3 ph:flex ph:justify-center ph:hidden"
        />
      </div>
    </Backdrop>
  ) : null;
}
