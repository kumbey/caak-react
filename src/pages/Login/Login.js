import React from "react";
import { useHistory } from "react-router";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import Input from "../../components/input";

export default function Login() {
    const history = useHistory();
    function login(){
        history.push("/login")
    }
    return (
        <Backdrop>
            <div className="min-w-max sm:mx-auto py-40 sm:w-full sm:max-w-md flex h-full">
                <div className="loginCard min-w-max sm:w-full relative w-screen px-10 py-8 bg-white rounded-lg shadow-xl">
                    <div className="flex justify-between items-center  cursor-pointer ">
                        <div onClick={login} className="flex items-center">
                    <FontAwesomeIcon
                        size={"lg"}
                        className={"text-caak-extraBlack mr-2"}
                        icon={faChevronLeft}
                    />
                        <p  className="text-caak-generalblack text-13px">Нэвтрэх сонголт руу буцах</p>
                        </div>
                    <Button
                        onClick={() => null}
                        className={
                            "bg-gray-300 rounded-full text-black"
                        }
                    >
                        ✖
                    </Button>
                    </div>
                    <div className={"flex text-caak-generalblack justify-center text-center align-center mb-4 font-bold text-24px"}>
                        Имайл хаяг/Утасны дугаар <br/> нэвтрэх!
                    </div>
                    <Input
                        placeholder={"Имайл хаяг эсвэл Утасны дугаар"}
                        className={"py-3 border border-caak-titaniumwhite"}
                    />
                    <Input
                        placeholder={"Нууц үг"}
                        className={"py-3 border border-caak-titaniumwhite mt-3"}
                    />
                    <div className="flex justify-between items-center text-caak-generalblack text-14px mt-5">
                        <Button
                            className={
                            " rounded-md justify-center px-14 py-3 text-17px font-bold bg-caak-secondprimary"
                            }
                        >   
                            Нэвтрэх
                        </Button>
                        <p className="cursor-pointer">Нууц үгээ мартсан уу?</p>
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
                    <a
                        href="/register"
                        className="text-caak-primary text-15px font-bold cursor-pointer"
                    >
                    {" "}
                        Бүртгүүлэх
                    </a>
                </div>
                <FontAwesomeIcon
                    className={"text-caak-primary cursor-pointer "}
                    icon={faQuestionCircle}
                />
        </div>
        </div>
      </div>
    </Backdrop>
    )
}
