import React, { useEffect, useState } from "react";
import Button from "../button";
import logo from "../../assets/images/logo.png";
import SearchInput from "../input/SearchInput";
import { menu_data } from "../menu_data";
import DropDown from "./DropDown";
import {
  checkUser,
  getFileUrl,
  getReturnData,
  useClickOutSide,
} from "../../Utility/Util";
import Dummy from "dummyjs";
import { useUser } from "../../context/userContext";
import { useHistory, useLocation } from "react-router";
import NotificationDropDown from "./NotificationDropDown";
import MobileMenu from "./MobileMenu";
import { useWrapper } from "../../context/wrapperContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";
import { getUserTotal } from "../../graphql-custom/totals/queries";
import { getUserAura } from "../../graphql-custom/user/queries";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();
  const history = useHistory();
  const location = useLocation();

  const [subscripTotal, setSubscripTotal] = useState();
  const subscriptions = {};
  const [userTotal, setUserTotal] = useState({});
  const [render, setRender] = useState(0);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useWrapper();

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

  console.log(isMobileMenuOpen);

  const fetchUserTotal = async () => {
    try {
      let resp = await API.graphql(
        graphqlOperation(getUserTotal, { user_id: user.sysUser.id })
      );
      resp = getReturnData(resp);
      if (resp) {
        setUserTotal(getReturnData(resp));
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchUserAura = async () => {
    try {
      let resp = await API.graphql(
        graphqlOperation(getUserAura, { id: user.sysUser.id })
      );
      resp = getReturnData(resp);
      user.sysUser.aura = resp.aura;
      setRender(render + 1);
    } catch (ex) {
      console.log(ex);
    }
  };

  const subscrip = () => {
    subscriptions.onChangedTotalsBy = API.graphql({
      query: onChangedTotalsBy,
      variables: {
        type: "UserTotal",
        id: user.sysUser.id,
      },
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscripTotal(JSON.parse(onData.totals));
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (checkUser(user)) {
      fetchUserTotal();
      subscrip();
    }

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (subscripTotal) {
      setUserTotal(subscripTotal);
      fetchUserAura();
    }
    // eslint-disable-next-line
  }, [subscripTotal]);

  return (
    <nav className="bg-white">
      <div className="px-7 sm:px-6 lg:px-8 px-2 py-1 mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex flex-row items-center">
            <img
              onClick={() => history.push({ pathname: "/" })}
              className="w-auto h-10 mr-1 cursor-pointer"
              src={logo}
              alt="Caak Logo"
            />
          </div>

          <div className="sm:block md:px-2 lg:px-4 xl:col-span-6 flex-1 hidden max-w-xl min-w-0 px-1 py-4 mx-4">
            <SearchInput hideLabel placeholder={"Хайлт хийх"} />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden lg:hidden flex">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-caak-generalblack inline-flex items-center justify-center p-2 rounded-md"
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
                  {parseInt(userTotal.unseen) > 0 ? (
                    <span
                      className={
                        "absolute text-center top-1 -right-0.5 w-18px h-18px border-1 rounded-full border-white font-medium border border-white bg-caak-bleudefrance text-white text-12px"
                      }
                    >
                      {userTotal.unseen}
                    </span>
                  ) : null}
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
                      src={
                        user.sysUser.pic
                          ? getFileUrl(user.sysUser.pic)
                          : Dummy.img("200x200")
                      }
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
      <div
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`w-full flex z-50 bg-transparent justify-end fixed right-0 top-0 transition ease-linear duration-300 ${
          isMobileMenuOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        }`}
        id="mobile-menu"
      >
        <MobileMenu setOpen={setIsMobileMenuOpen} />
      </div>
    </nav>
  );
}
