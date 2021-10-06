import React from "react";
import { useState } from "react";
import {generateTimeAgo, getFileUrl} from "../../Utility/Util";
import GroupInformationDrop from "../PendingPost/GroupInformationDrop";
import { useClickOutSide } from "../../Utility/Util";
import PostMore from "./PostMore";

const CardHeader = ({ verifiedUser, user, group, updatedAt }) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};
const menuRef = useClickOutSide(() => {
  setIsMenuOpen(false);
});
const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="h-14 flex items-center justify-between px-4">
      <div className="flex items-center justify-between py-4">
        <div className={"relative"}>
          <img
            className="w-34px m-34px rounded-square"
            src={user.pic && getFileUrl(user?.pic)}
            alt="Alex"
          />
          <img
            className="-bottom-1.5 -right-1.5 absolute w-22px border-2 border-white rounded-full"
            src={group.profile && getFileUrl(group?.profile)}
            alt="John"
          />
        </div>

        <div className="ml-3">
          <div className={"flex flex-row  items-center"}>
            <span className="text-generalblack text-14px mr-1 font-bold cursor-pointer">
              {group.name}
            </span>
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

          <div className={"flex flex-row items-center"}>
            <p className="hover:underline text-generalblack text-12px cursor-pointer">
              @{user.nickname}
            </p>
            <span className={"text-darkblue text-12px mx-1"}>•</span>
            <span className={"text-darkblue text-12px"}>{generateTimeAgo(updatedAt)}</span>
          </div>
        </div>
      </div>
      <div ref={menuRef} onClick={toggleMenu} className={"cursor-pointer relative"}>
        <span className="icon-fi-rs-dots text-4px"/>
        <GroupInformationDrop 
          className="absolute"
          shadow
          content={<PostMore/>}
          open={isMenuOpen}
        />
      </div>
    </div>
  );
};

export default CardHeader;
