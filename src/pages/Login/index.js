import React from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { closeModal } from "../../Utility/Util";
import { useUser } from "../../context/userContext";
import Backdrop from "../../components/Backdrop";

export default function Login({ type, ...props }) {
  const history = useHistory();
  const { state } = useLocation();
  const { user } = useUser();

  return !user ? (
    <Backdrop className={"flex justify-center items-center "}>
        <div className="ph:w-full bg-white rounded-lg shadow-xl">
          <div
            onClick={() => closeModal(history, state)}
            className="pt-c6 pr-c6 relative"
          >
            <span className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 absolute right-0 flex items-center justify-center rounded-full cursor-pointer" />
          </div>
          <div
            className={
              "text-center text-caak-generalblack mb-c2 font-bold text-24px pt-c5 "
            }
          >
            Шинэ Саак-т {type === "signUp" ? " бүртгүүлэх!" : " нэвтрэх!"}
          </div>
          {/*Social Buttons*/}
          <div className={"flex flex-col items-center px-c13 "}>
            <Button
              onClick={() => {}}
              round
              className={
                "hover:bg-gray-100 border border-gray-200 w-80 h-11  font-bold mb-2.5 rounded-lg text-caak-generalblack text-16px bg-white relative"
              }
            >
              <FontAwesomeIcon
                size={"lg"}
                className={"text-caak-primary absolute left-c1"}
                icon={faGoogle}
              />
              <p className="">Google</p>
            </Button>
            <Button
              onClick={() => {}}
              round
              className={
                "hover:bg-gray-100 border border-gray-200 w-80 h-11   font-bold mb-2.5 rounded-md text-caak-generalblack text-16px bg-white relative"
              }
            >
              <FontAwesomeIcon
                size={"lg"}
                className={"text-caak-facebook absolute left-c1"}
                icon={faFacebook}
              />
              Facebook
            </Button>
            <Button
              onClick={() => {
                type === "signUp"
                  ? history.replace({
                      pathname: "/register/main",
                      state: state,
                    })
                  : history.replace({ pathname: "/login/main", state: state });
              }}
              round
              className={
                "hover:bg-gray-100 border border-gray-200  w-80 h-11 font-bold rounded-md text-caak-generalblack text-16px bg-white relative"
              }
            >
              <FontAwesomeIcon
                size={"lg"}
                className={"text-caak-generalblack absolute left-c1"}
                icon={faEnvelope}
              />
              Имайл хаяг / Утасны дугаар
            </Button>
            {/*<div className="flex justify-between">
                <Button
                onClick={() => null}
                round
                className={
                    "hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2.5 rounded-md text-caak-generalblack text-16px bg-white"
                }
                >
                    <div className="px-16">
                    <FontAwesomeIcon
                    size={"lg"}
                    className={"text-caak-twitter"}
                    icon={faTwitter}
                    />
                    </div>
                </Button>
                <Button
                onClick={() => null}
                round
                className={
                    "hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2.5 rounded-md text-black bg-white"
                }
                >
                    <div className="px-16">
                    <FontAwesomeIcon
                    size={"lg"}
                    icon={faApple}
                    />
                    </div>
                </Button>
                </div>*/}
          </div>

          {/*Footer*/}
          <div
            className={
              "signFooter px-c2 mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20 text-sm "
            }
          >
            {type === "signUp" ? (
              <div className=" text-caak-blue text-15px">
                <span>Бүртгэлтэй хэрэглэгч бол </span>
                <span
                  onClick={() => {}}
                  className="text-caak-primary text-15px font-bold cursor-pointer"
                >
                  {" "}
                  Нэвтрэх
                </span>
              </div>
            ) : (
              <div className=" text-caak-blue text-15px">
                <span>Шинэ хэрэглэгч бол </span>
                <span
                  onClick={() => {}}
                  className="text-caak-primary text-15px font-bold cursor-pointer"
                >
                  {" "}
                  Бүртгүүлэх
                </span>
              </div>
            )}
            <span className="icon-fi-rs-help text-18px" />
          </div>
        </div>
    </Backdrop>
  ) : null;
}
