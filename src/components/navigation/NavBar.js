import React, { useState } from "react";
import Button from "../button";
import logo from "../../assets/images/logo.png";
import SearchInput from "../input/SearchInput";
import { menu_data } from "../menu_data";
import DropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import Dummy from "dummyjs";
import { useUser } from "../../context/userContext";
import { checkUser } from "../../Utility/Util";
import { useHistory, useLocation } from "react-router";

export default function NavBar( ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {user} = useUser()
  const history = useHistory()
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  //TODO Change Icon
  return (
    <nav className="bg-white">
      <div className="px-7 sm:px-6 lg:px-8 px-2 py-1 mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="md:hidden lg:hidden flex">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-caak-generalblack hover:text-white hover:bg-caak-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white inline-flex items-center justify-center p-2 rounded-md"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-row items-center">
            <img className="w-auto h-10 mr-1" src={logo} alt="Caak Logo" />
          </div>

          <div className="md:px-2 lg:px-4 xl:col-span-6 flex-1 max-w-xl min-w-0 px-1 py-4 mx-4">
            <SearchInput hideLabel placeholder={"Хайлт хийх"} />
          </div>
          <div
            className={
              "flex flex-row items-center hidden md:inline-flex lg:inline-flex"
            }
          >
            {checkUser(user) ? (
              <div className={"flex flex-row items-center"}>
                <div className={"mr-6"}>
                  <Button
                    roundedSquare
                    skin={"primary"}
                    className={"w-36px h-36px px-0 py-0"}
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    }
                  />
                </div>
                <div className={"relative inline-block mr-6"}>
                  <FontAwesomeIcon
                    size={"lg"}
                    className={"text-generalblack"}
                    icon={faBell}
                  />
                  <span
                    className={
                      "absolute text-center -top-2 w-18px h-18px border-1 rounded-full border-white font-medium -right-2 bg-caak-bleudefrance text-white text-12px"
                    }
                  >
                    3
                  </span>
                </div>
                <div className={"flex flex-row mr-6"}>
                  <div className={"w-45px h-45px mr-2"}>
                    <img
                      alt={user.sysUser.nickname}
                      data-dummy="200x200"
                      src={Dummy.img("200x200")}
                      className={"w-full block object-cover rounded-full"}
                    />
                  </div>
                  <div className={"flex flex-col items-center justify-center"}>
                    <span className={"text-generalblack text-14px font-bold"}>
                      {user.sysUser.nickname}
                    </span>
                    <div className={"flex flex-row items-center"}>
                      <FontAwesomeIcon
                        size={"sm"}
                        className={"text-generalblack mr-1"}
                        icon={faFire}
                      />
                      <span
                        className={"text-14px text-caak-darkBlue font-medium"}
                      >
                        {user.sysUser.aura.point}
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
                  onClick={() => history.push({pathname: "/login", state: {background: location}})}
                >
                  Нэвтрэх
                </Button>
                <Button
                  round
                  skin={"primary"}
                  className={"mr-2"}
                  onClick={() => history.push({pathname: "/register", state: {background: location}})}
                >
                  Бүртгэл үүсгэх
                </Button>
              </div>
            )}
            <div className={"relative"}>
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
          </div>
        </div>
      </div>
      <div
        className={`bg-gray-100 h-screen w-4/5 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <div className="w-max flex flex-col px-2 pt-2 pb-3 space-y-1">
          <div className={"flex flex-row"}>
            <Button
              round
              className={"ml-2"}
              skin={"secondary"}
              onClick={() => history.push({pathname: "/login", state: {background: location}})}
            >
              Нэвтрэх
            </Button>
            <Button
              round
              className={"ml-2"}
              skin={"primary"}
              onClick={() => history.push({pathname: "/register", state: {background: location}})}
            >
              Бүртгэл үүсгэх
            </Button>
          </div>

          <div className={`relative`}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col self-start w-full py-2 align-baseline"
            >
              {menu_data.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:bg-gray-50 flex flex-row items-center px-4 py-2 pr-5 text-left transition duration-150 ease-in-out rounded-md"
                >
                  {item.image}

                  <p className="text-base font-medium text-gray-900">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
