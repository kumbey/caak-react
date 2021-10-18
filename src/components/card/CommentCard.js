import { generateTimeAgo } from "../../Utility/Util";
import ProfileHoverCard from "./ProfileHoverCard";
import Tooltip from "../tooltip/Tooltip";
import React from "react";
import { Link } from "react-router-dom";

const CommentCard = ({ comment, children }) => {
  // useEffect(() => {
  //     setIsReacted(item.reacted);
  // }, [item]);
  // const replyHandler = () => {
  //   setCommentInputValue((prev) => `${comment.user.nickname}: ${prev}`);
  // };
  return (
    <div className={"relative flex flex-col ml-2 justify-between z-1"}>
      <div className={"cursor-pointer absolute -right-10 z-10 text-caak-blue"}>
        <span className={"icon-fi-rs-dots text-4px"} />
      </div>
      <div className={"relative flex flex-row items-center"}>
        <Tooltip content={<ProfileHoverCard userId={comment.user.id} />}>
          <Link to={`/user/${comment.user.id}/profile`}>
            <span className={"text-16px font-bold text-caak-generalblack"}>
              {comment.user.nickname}
            </span>
          </Link>
        </Tooltip>

        <span className={"text-14px text-caak-darkBlue mx-1"}>·</span>
        <span className={"text-14px text-caak-darkBlue"}>
          {generateTimeAgo(comment.createdAt)}
        </span>
      </div>
      <span
        className={
          "text-15px text-caak-generalblack leading-4  tracking-normal pt-2"
        }
      >
        {comment.comment}
      </span>
      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px py-3"
        }
      >
        <div className={"flex flex-row items-start justify-center"}>
          {/*<div*/}
          {/*    className={*/}
          {/*        "flex flex-row items-center mr-4 cursor-pointer hover:text-caak-primary group"*/}
          {/*    }*/}
          {/*>*/}
          {/*    <div*/}
          {/*        className={*/}
          {/*            "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-7 w-7"*/}
          {/*        }*/}
          {/*    >*/}
          {/*        <i className={"icon-fr-rs-caak text-18px"}/>*/}
          {/*    </div>*/}
          {/*    <span className={"text-14px"}>{comment.totals.reactions}</span>*/}
          {/*</div>*/}
          {/*  TODO Reply Comment*/}
          {/*<div*/}
          {/*  onClick={() => replyHandler()}*/}
          {/*  className={"flex flex-row items-center mr-4 cursor-pointer"}*/}
          {/*>*/}
          {/*  <div*/}
          {/*    className={*/}
          {/*      "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-7 w-7"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <i className={"icon-fi-rs-comment text-16px mr-1.5"} />*/}
          {/*  </div>*/}
          {/*  <span className={"text-14px"}>Хариулах</span>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className={"flex flex-col"}>{children}</div>
    </div>
  );
};

export default CommentCard;
