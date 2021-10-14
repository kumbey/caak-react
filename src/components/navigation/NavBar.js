import React, { useState } from "react";
import Button from "../button";
import logo from "../../assets/images/logo.png";
import SearchInput from "../input/SearchInput";
import { menu_data } from "../menu_data";
import DropDown from "./DropDown";
import { getFileUrl } from "../../Utility/Util";
import Dummy from "dummyjs";
import { useUser } from "../../context/userContext";
import { checkUser, useClickOutSide } from "../../Utility/Util";
import { useHistory, useLocation } from "react-router";
import NotificationDropDown from "./NotificationDropDown";
import MobileMenu from "./MobileMenu";
import { useWrapper } from "../../context/wrapperContext";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useWrapper();

  const { user } = useUser();
  const history = useHistory();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isNotificationMenu, setIsNotificationMenu } = useWrapper();

  const notificationRef = useClickOutSide(() => {
    setIsNotificationMenu(false);
  });

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  return (
    <nav className="bg-white">
      <div className="px-2 px-7 py-1 mx-auto sm:px-6 lg:px-8">
        <div className="flex relative justify-between items-center h-16">
          <div className="flex flex-row items-center">
            <img onClick={() => history.push({pathname: "/"})} className="mr-1 w-auto h-10 cursor-pointer" src={logo} alt="Caak Logo" />
          </div>

          <div className="hidden flex-1 px-1 py-4 mx-4 min-w-0 max-w-xl sm:block md:px-2 lg:px-4 xl:col-span-6">
            <SearchInput hideLabel placeholder={"Хайлт хийх"} />
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex justify-center items-center p-2 rounded-md text-caak-generalblack"
            >
              <span className="sr-only">Open main menu</span>
              <span className={"icon-fi-sp-hamburger-menu"} />
            </button>
          </div>
          <div
            className={
              "flex flex-row items-center hidden md:inline-flex lg:inline-flex"
            }
          >
            {checkUser(user) ? (
              <div className={"flex flex-row items-center justify-center"}>
                <div className={"mr-6"}>
                  <Button
                    roundedSquare
                    skin={"primary"}
                    className={"w-36px h-36px px-0 py-0"}
                    icon={<span className={"icon-fi-rs-add text-15px"} />}
                    onClick={() =>
                      history.push({
                        pathname: "/post/add/new",
                        state: { background: location },
                      })
                    }
                  />
                </div>
                <div
                  ref={notificationRef}
                  onClick={() => {
                    setIsNotificationMenu((oldState) => !oldState);
                  }}
                  className={"relative flex items-center mr-6 cursor-pointer"}
                >
                  <span
                    className={`${
                      isNotificationMenu && "bg-caak-titaniumwhite"
                    } icon-fi-rs-notification text-22px text-caak-generalblack p-2 rounded-square hover:bg-caak-titaniumwhite`}
                  />
                  <span
                    className={
                      "absolute text-center top-1 -right-0.5 w-18px h-18px border-1 rounded-full border-white font-medium border border-white bg-caak-bleudefrance text-white text-12px"
                    }
                  >
                    3
                  </span>
                  <NotificationDropDown
                    isOpen={isNotificationMenu}
                    setIsOpen={setIsNotificationMenu}
                  />
                </div>
                <div
                  ref={menuRef}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={"relative flex flex-row mr-6"}
                >
                  <DropDown
                    open={isMenuOpen}
                    onToggle={toggleMenu}
                    items={menu_data}
                    className={"top-10 right-10"}
                  />
                  <div className={"w-45px h-45px mr-2 cursor-pointer"}>
                    <img
                      alt={user.sysUser.nickname}
                      data-dummy="200x200"
                      src={user.sysUser.pic ? getFileUrl(user.sysUser.pic) : Dummy.img("200x200")}
                      className={"w-full block object-cover rounded-full"}
                    />
                  </div>
                  <div className={"flex flex-col items-center justify-center"}>
                    <span className={"text-generalblack text-14px font-bold"}>
                      {user.sysUser.nickname}
                    </span>
                    <div className={"flex flex-row items-center self-start"}>
                      <span className={"icon-fi-rs-auro auroGradient mr-1"} />
                      <span
                        className={"text-14px text-caak-darkBlue font-medium"}
                      >
                        {user.sysUser.aura}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={"flex flex-row"}>
                <Button
                  round
                  skin={"secondary"}
                  className={"mr-2"}
                  onClick={() =>
                    history.push({
                      pathname: "/login",
                      state: { background: location },
                    })
                  }
                  // onClick={() => history.push({pathname: "/register/confirmation/", state: {background: location, username: "nanoshdee@gmail.com"}})}
                >
                  Нэвтрэх
                </Button>
                <Button
                  round
                  skin={"primary"}
                  className={"mr-2"}
                  onClick={() =>
                    history.push({
                      pathname: "/register",
                      state: { background: location },
                    })
                  }
                >
                  Бүртгэл үүсгэх
                </Button>
              </div>
            )}
            {!checkUser(user) && (
              <div ref={menuRef} className={"relative"}>
                <Button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  skin="secondary"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  }
                  circular
                  className={"p-1"}
                />
                <DropDown
                  open={isMenuOpen}
                  onToggle={toggleMenu}
                  items={menu_data}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileMenu />
    </nav>
  );
}
