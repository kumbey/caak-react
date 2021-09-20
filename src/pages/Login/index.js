import React from "react";
import { useHistory } from "react-router";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faTwitter, faApple } from "@fortawesome/free-brands-svg-icons";
import {faQuestionCircle, faEnvelope} from '@fortawesome/free-regular-svg-icons'

export default function Login() {
    const history = useHistory();

    function register() {
        history.push("/register");
    }

    function home(){
        history.push("/")
    }

    function ephone(){
        history.push("/ephone")
    }

    return (
        <Backdrop>
            <div className=" sm:mx-auto pt-40 pb-96 sm:max-w-md sm:max-h-md sm-my-auto h-full ">
                <div className="loginCard min-w-max sm:w-full relative w-screen px-10 py-8 bg-white rounded-lg shadow-xl">
                    <div className="flex justify-end">
                    <Button
                        onClick={home}
                        className={
                            "bg-gray-300 rounded-full text-black"
                        }
                    >
                        ✖
                    </Button>
                    </div>
                    <div className={"flex text-caak-generalblack justify-center align-center mb-4 font-bold text-24px"}>
                        Шинэ Саак-т нэвтрэх!
                    </div>
                    {/*Social Buttons*/}
                    <div className={"flex flex-col justify-center "}>
                        <Button
                            onClick={() => null}
                            round
                            className={
                            "hover:bg-gray-100 border border-gray-200  justify-center  font-bold mb-2 rounded-lg text-caak-generalblack text-16px bg-white"
                            }
                        >
                            <FontAwesomeIcon
                                size={"lg"}
                                className={"text-caak-primary mr-2"}
                                icon={faGoogle}
                            />
                            Google
                        </Button>
                        <Button
                            onClick={() => null}
                            round
                            className={
                                "hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2 rounded-md text-caak-generalblack text-16px bg-white"
                            }
                        >
                            <FontAwesomeIcon
                                size={"lg"}
                                className={"text-caak-facebook mr-2"}
                                icon={faFacebook}
                            />
                            Facebook
                        </Button>
                        <Button
                        onClick={ephone}
                            round
                            className={
                                "hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2 rounded-md text-caak-generalblack text-16px bg-white"
                            }
                        >
                            <FontAwesomeIcon
                                size={"lg"}
                                className={"text-caak-generalblack mr-2"}
                                icon={faEnvelope}
                            />
                            Имайл хаяг / Утасны дугаар
                        </Button>
            <div className="flex justify-between">
            <Button
              onClick={() => null}
              round
              className={
                "hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2 rounded-md text-caak-generalblack text-16px bg-white"
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
                "hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2 rounded-md text-black bg-white"
              }
            >
                <div className="px-16">
                <FontAwesomeIcon
                  size={"lg"}
                  icon={faApple}
                />
                </div>
            </Button>
            </div>
          </div>
          
          {/*Footer*/}
          <div
            className={
              "signFooter flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4 divide-opacity-20 text-sm "
            }
          >
                <div className=" text-caak-blue text-15px">
                    <span>
                        Шинэ хэрэглэгч бол{" "}
                    </span>
                    <span 
                        onClick={register}
                        className="text-caak-primary text-15px font-bold cursor-pointer"
                    >
                    {" "}
                        Бүртгүүлэх
                    </span>
                </div>
                <FontAwesomeIcon
                    className={"text-caak-darkBlue cursor-pointer "}
                    icon={faQuestionCircle}
                />
        </div>
        </div>
      </div>
    </Backdrop>
    )
}
