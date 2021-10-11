import React, { useEffect, useState } from "react";
import { extractDate, generateTimeAgo } from "../../../Utility/Util";
import { useUser } from "../../../context/userContext";
import updateReaction from "./updateReaction";

const PostHeader = ({ title, updatedAt, item }) => {
  const date = extractDate(updatedAt);
  const { user } = useUser();
  const [isReacted, setIsReacted] = useState(false);
  useEffect(() => {
    setIsReacted(item.reacted);
  }, [item]);

    // console.log(item)

  return (
    <div className={"flex flex-col"}>
      <div className={"font-bold text-20px text-caak-generalblack pt-2 px-7"}>
        {title}
      </div>
      <div className={"text-caak-darkBlue text-14px pt-2 px-7"}>
        {generateTimeAgo(updatedAt)} ·{" "}
        {`${date.year}/${date.month}/${date.day}`}
      </div>
      <div className={"text-15px text-caak-generalblack pt-2 px-7"}>
        {item.title}
      </div>
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
              onClick={() =>
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
                })
              }
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
            <span className={"text-15px"}>
              {item.totals?.comments} сэтгэгдэлтэй
            </span>
          </div>
        </div>
        <div className={"flex flex-row items-center cursor-pointer"}>
          <i className={"icon-fi-rs-share text-18px mr-1.5"} />
          <span className={"text-15px"}>Хуваалцах</span>
        </div>
      </div>
    </div>
  );
};
export default PostHeader;
