import React from "react";
import { useHistory } from "react-router";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import Backdrop from "../../components/Backdrop";

export default function Login() {
    const history = useHistory();

    function home(){
        history.push("/")
    }

    return (
        <Backdrop className="flex justify-center items-center">
            <div className=" ph:w-full bg-white rounded-lg shadow-xl">
                <div className=" px-10 bg-white rounded-lg shadow-xl">
                    <div onClick={home} className="relative pt-c6">
                        <span className="icon-fi-rs-close absolute right-0 text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded-full"/>
                    </div>
                    <div className={"flex text-caak-generalblack justify-center mb-c2 font-bold text-24px pt-c5 "}>
                        Шинэ Саак-т бүртгүүлэх!
                    </div>
                    {/*Social Buttons*/}
                    <div className={"flex flex-col items-center"}>
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
                            onClick={() => {}}
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
                            Имэйл хаяг / Утасны дугаар
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
              "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20 text-sm "
            }
          >
                <div className=" text-caak-blue text-15px">
                    <span>
                        Шинэ хэрэглэгч бол{" "}
                    </span>
                    <span 
                        onClick={() => {}}
                        className="text-caak-primary text-15px font-bold cursor-pointer"
                    >
                    {" "}
                        Бүртгүүлэх
                    </span>
                </div>
                <span className="icon-fi-rs-help text-18px"/>
        </div>
        </div>
      </div>
      </Backdrop>
    )
}
