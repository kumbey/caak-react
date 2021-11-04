import React, { useEffect, useState } from "react";
import {
  checkUser,
  closeModal,
  extractDate,
  generateTimeAgo,
  getReturnData,
} from "../../../Utility/Util";
import { useUser } from "../../../context/userContext";
import updateReaction from "./updateReaction";
import Button from "../../../components/button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../../graphql-custom/post/mutation";
import { useHistory, useLocation } from "react-router-dom";
import { getGroupView } from "../../../graphql-custom/group/queries";

const PostHeader = ({ addCommentRef, post, activeIndex }) => {
  const item = post.items.items[activeIndex];
  const date = extractDate(post.updatedAt);
  const { user } = useUser();
  const [isReacted, setIsReacted] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { state } = useLocation();

  const getUsers = async (id) => {
    if (checkUser(user)) {
      const resp = await API.graphql(
        graphqlOperation(getGroupView, {
          id,
        })
      );

      setUserRole(getReturnData(resp).role_on_group);
    }
  };

  useEffect(() => {
    setIsReacted(item.reacted);
  }, [item]);

  useEffect(() => {
    if (item) getUsers(post.group.id);
    // eslint-disable-next-line
  }, [item]);

  const handler = async (id, status) => {
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
      console.log(ex);
    }
  };

  const reactionHandler = () => {
    if (checkUser(user)) {
      updateReaction({
        item,
        isReacted,
        setIsReacted,
        deleteReactionInput: {
          id: item.id,
          user_id: user.sysUser.id,
        },
        createReactionInput: {
          id: item.id,
          on_to: "POST_ITEM",
          type: "CAAK",
          user_id: user.sysUser.id,
        },
      });
    } else {
      history.push({
        pathname: "/login",
        state: state,
      });
    }
  };

  return (
    <div className={"flex flex-col"}>
      <div
        className={
          "break-words font-bold text-20px text-caak-generalblack pt-2 px-7 "
        }
      >
        {post.title}
      </div>
      <div className={"text-caak-darkBlue text-14px pt-2 px-7"}>
        {generateTimeAgo(post.updatedAt)} ·{" "}
        {`${date.year}/${date.month}/${date.day}`}
        {post.status === "PENDING" && " (Хүлээгдэж байгаа пост)"}
        {post.status === "ARCHIVED" && " (Архивлагдсан пост)"}
      </div>
      <div className={"break-words text-15px text-caak-generalblack pt-2 px-7 whitespace-pre-wrap"}>
        {item.title}
      </div>
      {post.status === "CONFIRMED" ? (
        <div
          className={
            "flex flex row justify-between text-blue-primary text-14px py-2 px-7"
          }
        >
          <div className={"flex flex-row "}>
            <div
              className={"flex flex-row items-center mr-4 cursor-pointer group"}
            >
              <div
                onClick={() => post.status === "CONFIRMED" && reactionHandler()}
                className={
                  "flex justify-center items-center group-hover:bg-caak-peachbreeze group-hover:text-caak-primary rounded-full p-2 h-8 w-8"
                }
              >
                <i
                  className={`${
                    isReacted
                      ? "text-caak-primary icon-fr-rs-caak-active"
                      : "icon-fr-rs-caak"
                  } group-hover:text-caak-primary  text-22px`}
                />
              </div>
              <span className={"text-15px group-hover:text-caak-primary"}>
                {item.totals?.reactions}
              </span>
            </div>
            <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
              <i className={"icon-fi-rs-comment text-18px mr-1.5"} />
              <span
                onClick={() =>
                  post.status === "CONFIRMED" && addCommentRef.current.focus()
                }
                className={"text-15px"}
              >
                {item.totals?.comments} сэтгэгдэлтэй
              </span>
            </div>
          </div>
          <div className={"flex flex-row items-center cursor-pointer"}>
            <i className={"icon-fi-rs-share text-18px mr-1.5"} />
            <span className={"text-15px"}>Хуваалцах</span>
          </div>
        </div>
      ) : post.status === "PENDING" &&
        (userRole === "ADMIN" || userRole === "MODERATOR") ? (
        <div className="px-7 mt-b4 flex items-center pb-3">
          <Button
            loading={loading}
            onClick={() => handler(post.id, "CONFIRMED")}
            className="bg-caak-bleudefrance text-15px mr-c11 w-c132 text-white"
          >
            Зөвшөөрөх
          </Button>
          <Button
            loading={loading}
            onClick={() => handler(post.id, "ARCHIVED")}
            className="text-caak-generalblack text-15px w-c14 bg-white"
          >
            Татгалзах
          </Button>
        </div>
      ) : null}
    </div>
  );
};
export default PostHeader;
