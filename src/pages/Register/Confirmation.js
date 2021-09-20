import React from "react";
import { useHistory } from "react-router";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";

import {faChevronLeft, faSync} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons'

const Confirmation = ({email}) => {
  const [code, setCode] = React.useState("");
  const history = useHistory();

    function register() {
        history.push("/register");
    }
    
    function home(){
        history.push("/")
    }
    function completed(){
        history.push("/completed")
    }
    function login(){
        history.push("/login")
    }
  return (
      <Backdrop>
        <div className="min-w-max sm:mx-auto sm:py-6 sm:w-full sm:max-w-md flex h-full">
          <div className="loginCard min-w-max sm:w-full relative w-screen px-10 py-8 bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center  cursor-pointer ">
                        <div className="flex items-center">
                    <FontAwesomeIcon
                        size={"lg"}
                        className={"text-caak-extraBlack mr-2"}
                        icon={faChevronLeft}
                    />
                        <p onClick={register} className="text-caak-generalblack text-13px">Бүртгүүлэх сонголт руу буцах</p>
                        </div>
                    <Button
                        onClick={home}
                        className={
                            "bg-gray-300 rounded-full text-black"
                        }
                    >
                        ✖
                    </Button>
                    </div>
            <div className={"flex text-caak-generalblack justify-center text-center align-center mt-5 mb-4 font-bold text-24px"}>
                Баталгаажуулах код <br/> илгээгдлээ
            </div>
            <div className="text-center text-15px text-caak-darkBlue">Таны утасны дугаар болох ** ** ** 47 руу <br/> баталгаажуулах код илгээгдсэн болно.</div>
            <div className={"py-2 flex flex-col"}>

              <div className=" flex justify-center text-14px text-caak-darkBlue">Баталгаажуулах код дахин авах</div>
              <div className=" flex justify-center text-14px text-caak-primary mb-5 font-bold cursor-pointer">
              <FontAwesomeIcon
                        size={"lg"}
                        className={"text-caak-primary mr-2"}
                        icon={faSync}
                    />
                   Дахин илгээх</div>
              <Button onClick={completed} round className={"font-bold bg-caak-primary py-3"}>
                Баталгаажуулах
              </Button>
            </div>

            {/*Footer*/}
            <div
            className={
              "signFooter flex justify-between border-t items-center mt-8"
            }
          >
            <div className="my-2 text-center text-15px">
            <span className={"text-gray-primary"}>
            Бүртгэлтэй хэрэглэгч бол{" "}
            </span>
            <span
                onClick={login}
              className="text-caak-primary hover:text-primary-hover font-bold cursor-pointer"
            >
              {" "}
              Нэвтрэх
            </span>
          </div>
          <FontAwesomeIcon
                    className={"text-caak-darkblue cursor-pointer "}
                    icon={faQuestionCircle}
                />
          </div>
          </div>
        </div>
      </Backdrop>
  );
};

export default Confirmation;
