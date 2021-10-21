import { useUser } from "../../context/userContext";
import { checkUser, getFileUrl } from "../../Utility/Util";
import Dummy from "dummyjs";
import { useHistory, useLocation } from "react-router-dom";
import { useWrapper } from "../../context/wrapperContext";
import React from "react";
import { createPortal } from "react-dom";

export default function BottomTabs() {
  const { user } = useUser();
  const history = useHistory();
  const location = useLocation();
  const { isNotificationMenu, setIsNotificationMenu } = useWrapper();

  return createPortal(
    <div
      style={{ height: "50px" }}
      className="z-2 justify-evenly md:hidden border-caak-liquidnitrogen relative sticky bottom-0 flex items-center block w-full bg-white border-t"
    >
      <span className="icon-fi-sp-home-f text-caak-generalblack text-24px px-b5 py-px-8 rounded-lg" />
      <span className="icon-fi-fi-sp-hamburger-menu text-caak-blue text-24px px-b5 py-px-8 rounded-lg" />
      <span
        onClick={() =>
          history.push({
            pathname: "/post/add/new",
            state: { background: location },
          })
        }
        className="icon-fi-rs-thick-add text-14px bg-caak-primary px-b5 py-px-8 text-white rounded-lg cursor-pointer"
      />
      <span
        onClick={() => setIsNotificationMenu(!isNotificationMenu)}
        className={`${
          isNotificationMenu
            ? "icon-fi-rs-bookmark-f"
            : "icon-fi-rs-notification"
        } text-22px text-caak-blue px-b5 py-px-8 rounded-lg`}
      />
      {checkUser(user) ? (
        <img
          className={"rounded-full w-c3 h-c3"}
          alt={user.sysUser.name}
          src={
            user.sysUser.pic
              ? getFileUrl(user.sysUser.pic)
              : Dummy.image("50x50")
          }
        />
      ) : (
        <span className="icon-fi-rs-profile text-24px text-caak-blue px-b5 py-px-8 rounded-lg" />
      )}
    </div>,
    document.body
  );
}
