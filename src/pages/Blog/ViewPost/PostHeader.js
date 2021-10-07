import React from "react";
import { extractDate, generateTimeAgo } from "../../../Utility/Util";
import useCountComments from "../../../Utility/useCountComments";

const PostHeader = ({ title, updatedAt, reactions, comments, itemTitle }) => {
  const totalComments = useCountComments(comments);
  const date = extractDate(updatedAt);
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
        {itemTitle}
      </div>
      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px py-2 px-7"
        }
      >
        <div className={"flex flex-row "}>
          <div
            className={
              "flex flex-row items-center mr-4 cursor-pointer hover:text-caak-primary group"
            }
          >
            <div
              className={
                "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-8 w-8"
              }
            >
              <i className={"icon-fr-rs-caak text-22px"} />
            </div>
            <span className={"text-15px"}>{reactions.totals.reactions}</span>
          </div>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fi-rs-comment text-18px mr-1.5"} />
            <span className={"text-15px"}>{totalComments} сэтгэгдэлтэй</span>
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
