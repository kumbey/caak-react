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
      className="bottomTabs z-2 justify-evenly md:hidden border-caak-liquidnitrogen relative sticky bottom-0 flex items-center block w-full bg-white border-t"
    >
      <span className="icon-fi-sp-home-f text-caak-generalblack text-24px px-b5 py-px-8 rounded-lg" />
      <span className="icon-fi-fi-sp-hamburger-menu text-caak-blue text-24px px-b5 py-px-8 rounded-lg" />
      <span
        onClick={() =>
          checkUser(user)
            ? history.push({
                pathname: "/post/add/new",
                state: { background: location },
              })
            : history.push({
                pathname: "/login",
                state: { background: location },
              })
        }
        className="icon-fi-rs-thick-add text-14px bg-caak-primary px-b5 py-px-8 text-white rounded-lg cursor-pointer"
      />

      <div
        // ref={notificationRef}
        onClick={() => {
          checkUser(user)
            ? setIsNotificationMenu((oldState) => !oldState)
            : history.push({
                pathname: "/login",
                state: { background: location },
              });
        }}
        className={"relative flex items-center cursor-pointer"}
      >
        <span
          className={`${
            isNotificationMenu
              ? "icon-fi-rs-bookmark-f"
              : "icon-fi-rs-notification"
          } text-22px text-caak-blue px-b5 py-px-8 rounded-lg`}
        />
        {/*{parseInt(userTotal.unseen) > 0 ? (*/}
        {/*  <span*/}
        {/*    className={*/}
        {/*      "absolute text-center top-1 -right-0.5 w-18px h-18px border-1 rounded-full border-white font-medium border border-white bg-caak-bleudefrance text-white text-12px"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {userTotal.unseen > 9 ? "9+" : userTotal.unseen}*/}
        {/*  </span>*/}
        {/*) : null}*/}
      </div>

      {checkUser(user) ? (
        <img
          onClick={() =>
            history.push({
              pathname: `/user/${user.sysUser.id}/profile`,
              state: { background: location },
            })
          }
          className={"rounded-full w-c3 h-c3 cursor-pointer"}
          alt={user.sysUser.name}
          src={
            user.sysUser.pic
              ? getFileUrl(user.sysUser.pic)
              : Dummy.image("50x50")
          }
        />
      ) : (
        <span
          onClick={() => {
            history.push({
              pathname: "/login",
              state: { background: location },
            });
          }}
          className="icon-fi-rs-profile text-24px text-caak-blue px-b5 py-px-8 rounded-lg"
        />
      )}
    </div>,
    document.body
  );
}
