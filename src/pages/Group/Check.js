import { useEffect, useState } from "react";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import { useHistory, useLocation, useParams } from "react-router";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getPostView } from "../../graphql-custom/post/queries";
import { closeModal, getFileUrl, getReturnData } from "../../Utility/Util";
import CheckHeader from "./CheckHeader";
import { updatePost } from "../../graphql-custom/post/mutation";
import { getGroupView } from "../../graphql-custom/group/queries";
import { useUser } from "../../context/userContext";
import { updateStatus } from "../../apis/post/updateStatus";

export default function Check() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState([]);
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

  useEffect(() => {
    if (post) getUsers(post.group.id);
    // eslint-disable-next-line
  }, [post]);

  const getUsers = async (id) => {
    const resp = await API.graphql(
      graphqlOperation(getGroupView, {
        id,
      })
    );
    setUserRole(getReturnData(resp).role_on_group);
  };

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

  const postHandler = async (id, status) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
      setLoading(false);
      closeModal(history, state);
    } catch (ex) {
      if (
        ex.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
      ) {
        updateStatus(post, user.sysUser.ID, status);
        setLoading(false);
        closeModal(history, state);
      }
    }
  };

  return post ? (
    <Backdrop>
      <div className="sm:hidden py-px-6 px-c6 relative sticky top-0 z-50 flex justify-between w-full bg-white">
          <span
              onClick={() => closeModal(history, state)}
              className="icon-fi-rs-back flex items-center"
          />
        <p className="text-20px">???????? ????????????</p>
        <span className="icon-fi-rs-dots text-4px flex items-center" />
      </div>
      <div className="flex justify-center">
        <div className={"viewPendingPost py-4"}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-all",
            }}
            className="sm:h-auto md:h-auto lg:h-auto w-full bg-white rounded-lg"
          >
            <p
              style={{ paddingBlockStart: "21px", marginBlockEnd: "17px" }}
              className="text-20px flex justify-center px-6 font-bold"
            >
              {post.title}
            </p>
            <div className="bg-opacity-80 flex items-center h-auto bg-black">
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
                  "icon-fi-rs-back mx-c2 ph:mx-px-6 text-white transform rotate-180 cursor-pointer bg-white rounded-full bg-opacity-10 hover:bg-opacity-30"
                }
              />
            </div>
            <CheckHeader
              user={post.user}
              updatedAt={post.updatedAt}
              itemTitle={post.items.items[activeIndex].title}
            />
          </div>

          {userRole === "ADMIN" || userRole === "MODERATOR" ? (
            <div className="mt-b4 flex justify-end">
              <Button
                loading={loading}
                onClick={() => postHandler(postId, "ARCHIVED")}
                className="text-caak-generalblack text-15px w-c14 bg-white"
              >
                ??????????????????
              </Button>
              <Button
                loading={loading}
                onClick={() => postHandler(postId, "CONFIRMED")}
                className="bg-caak-bleudefrance text-15px ml-px-10 mr-c11 w-c132 text-white"
              >
                ??????????????????
              </Button>
            </div>
          ) : null}
        </div>
        <span
          onClick={() => closeModal(history, state)}
          style={{ marginLeft: "30px", marginTop: "30px" }}
          className="icon-fi-rs-close md:flex text-30px hidden text-white cursor-pointer"
        />
      </div>
    </Backdrop>
  ) : null;
}
