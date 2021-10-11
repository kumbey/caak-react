import React, { useEffect } from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/animations/shift-away-extreme.css";
import { checkUser } from "../../Utility/Util";
import { useUser } from "../../context/userContext";

import API from "@aws-amplify/api";
import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";

import { useState } from "react";
import { generateTimeAgo, getFileUrl } from "../../Utility/Util";
import GroupInformationDrop from "../PendingPost/GroupInformationDrop";
import { useClickOutSide } from "../../Utility/Util";
import PostMore from "./PostMore";
import Dummy from "dummyjs";
import Button from "../button";

const CardHeader = ({ verifiedUser, postUser, group, updatedAt }) => {
  const { user } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [doRender, setDoRender] = useState(0);

  useEffect(() => {
    console.log("FOLLOW: ", postUser.followed, doRender);
  }, [postUser.followed, doRender]);

  const createFollowUser = async () => {
    await API.graphql({
      query: createFollowedUsers,
      variables: {
        input: { followed_user_id: user.sysUser.id, user_id: postUser.id },
      },
    });
    postUser.totals.followers += 1;
    postUser.followed = true;
    setDoRender(doRender + 1);
  };

  const deleteFollowUser = async () => {
    await API.graphql({
      query: deleteFollowedUsers,
      variables: {
        input: {
          followed_user_id: user.sysUser.id,
          user_id: postUser.id,
        },
      },
    });
    postUser.totals.followers -= 1;
    postUser.followed = false;
    setDoRender(doRender + 1);
  };

  const handleClick = () => {
    if (checkUser(user)) {
      if (!postUser.followed) {
        createFollowUser();
      } else if (postUser.followed) {
        deleteFollowUser();
      }
    }

    console.log("clikced");
  };

  return (
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

          <div className="flex flex-row items-center">
            <Tippy
              theme={"light-border"}
              zIndex={25}
              arrow={true}
              interactive={true}
              allowHTML={true}
              placement={"bottom"}
              animation={"shift-away-extreme"}
              content={
                <div className="custom-dropdown left-1 pl-7 pb-3 pr-6 bg-white">
                  <div className="mt-c6 flex flex-row items-center justify-between w-full">
                    <img
                      className=" w-12 h-12 border-2 border-white rounded-full"
                      alt=""
                      src={`https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg`}
                    />
                    {checkUser(user) && user.sysUser.id !== postUser.id ? (
                      <Button
                        className="text-15px w-c19 h-c24 font-bold"
                        onClick={handleClick}
                      >
                        {postUser.followed ? "Дагасан" : "Дагах"}
                      </Button>
                    ) : null}
                  </div>
                  <div className="mb-b1">
                    <div className=" flex items-center">
                      <p className="text-17px font-bold">{postUser.nickname}</p>
                      <span className="icon-fi-rs-verified text-13px text-caak-buttonblue " />
                    </div>
                    <p className="text-15px font-light">{postUser.about}</p>
                  </div>
                  <div className=" pr-14 flex flex-row items-center justify-between">
                    <div
                      className="flex items-center"
                      style={{ marginRight: "22px" }}
                    >
                      <p className="text-18px mr-1 font-medium">
                        {postUser.aura}
                      </p>
                      <p className="text-15px text-caak-darkBlue font-roboto font-light">
                        Аура
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-18px mr-1 font-medium">
                        {postUser.totals.followers}
                      </p>
                      <p className="text-15px text-caak-darkBlue font-light">
                        дагагчид
                      </p>
                    </div>
                  </div>
                </div>
              }
            >
              <button
                className="flex items-center text-gray-700"
                data-toggle=" custom-dropdown"
                data-tippy-arrow="true"
                data-tippy-placement="bottom-end"
              >
                <p className="hover:underline text-generalblack text-12px cursor-pointer">
                  @{postUser.nickname}
                </p>
              </button>
            </Tippy>

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
    </div>
  );
};

export default CardHeader;
