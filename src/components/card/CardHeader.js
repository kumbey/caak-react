import React, { useState } from "react";
import {
  generateTimeAgo,
  getFileUrl,
  useClickOutSide,
} from "../../Utility/Util";
import GroupInformationDrop from "../PendingPost/GroupInformationDrop";
import PostMore from "./PostMore";
import Dummy from "dummyjs";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "./ProfileHoverCard";
import {Link} from "react-router-dom";

const CardHeader = ({ verifiedUser, postUser, group, updatedAt }) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return ( group ?
    <div className="h-14 relative flex items-center justify-between px-4">
      <div className="flex items-center justify-between py-4">
        <div className={"relative"}>
          <img
            className="w-34px m-34px rounded-square"
            src={
              group.profile ? getFileUrl(group?.profile) : Dummy.img("100x100")
            }
            alt="Alex"
          />
          <img
            className="-bottom-1.5 -right-1.5 absolute w-22px border-2 border-white rounded-full"
            src={
              postUser.pic ? getFileUrl(postUser?.pic) : Dummy.img("100x100")
            }
            alt="John"
          />
        </div>

        <div className="ml-3">
          <div className={"flex flex-row  items-center"}>
            <Link to={`/group/${group.id}`}>
            <span className="text-generalblack text-14px mr-1 font-bold cursor-pointer">
              {group.name}
            </span>
            </Link>
            {verifiedUser ? (
              <i
                className={
                  "icon-fi-rs-verified text-caak-buttonblue text-13px mr-1.5"
                }
              />
            ) : (
              ""
            )}
          </div>

          <div className={"flex flex-row   items-center"}>
            <Tooltip content={<ProfileHoverCard userId={postUser.id} postUser={postUser}/>}>
              <p
                className="hover:underline text-generalblack text-12px cursor-pointer"
              >
                @{postUser.nickname}
              </p>
            </Tooltip>
            <span className={"text-darkblue text-12px mx-1"}>•</span>
            <span className={"text-darkblue text-12px"}>
              {generateTimeAgo(updatedAt)}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={menuRef}
        onClick={toggleMenu}
        className={"cursor-pointer relative"}
      >
        <span className="icon-fi-rs-dots text-4px" />
        <GroupInformationDrop
          className="absolute"
          shadow
          content={<PostMore />}
          open={isMenuOpen}
        />
      </div>
    </div> : null
  );
};

export default CardHeader;
