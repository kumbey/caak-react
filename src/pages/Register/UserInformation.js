import React from "react";
import { useHistory } from "react-router";
import Input from "../../components/input";
import Backdrop from "../../components/Backdrop";
import Select from "../../components/input/Select";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons'
import Button from "../../components/button";

const UserInformation = () => {
  const history = useHistory();

    function register() {
        history.push("/register");
    }
    
    function home(){
        history.push("/")
    }
    function confirm() {
      history.push("/confirm")
    }
    function login() {
      history.push("/login")
    }
  return (
    <Backdrop>
      <div className="min-w-max sm:mx-auto sm:py-20 sm:w-full sm:max-w-md flex h-full">
        <div className="loginCard min-w-max sm:w-full relative w-screen px-10 py-8 bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center  cursor-pointer ">
                        <div className="flex items-center">
                    <FontAwesomeIcon
                        size={"lg"}
                        className={"text-caak-extraBlack mr-2"}
                        icon={faChevronLeft}
                    />
                        <div onClick={register} className="text-caak-generalblack text-13px cursor-pointer">
                          Бүртгүүлэх сонголт руу буцах
                          </div>
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
                        Имайл хаяг/Утасны дугаар <br/> бүртгүүлэх!
                    </div>
          <div>
            <div className="flex justify-center">
              <div className="mr-3">
            <Input
                        placeholder={"Овог"}
                        className={"py-3 border border-caak-titaniumwhite"}
                    />
                    </div>
                    <Input
                        placeholder={"Нэр"}
                        className={"py-3 border border-caak-titaniumwhite"}
                    />
            </div>
            <Input
                        placeholder={"Нийтэд харагдах нэр"}
                        className={"py-3 border border-caak-titaniumwhite mt-4"}
                    />
          </div>

          <div className={"flex flex-col mt-3"}>
            <div className={"flex flex-row"}>
              <Select placeholder={"asdsd"} containerStyle={"flex-1"}>
                <option>1998</option>
                <option>1999</option>
                <option>2000</option>
                <option>2001</option>
              </Select>
              <Select containerStyle={"flex-1 mx-2"}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </Select>
              <Select containerStyle={"flex-1"}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
            </div>
          </div>
          <div>
          <Input
              errorMessage={"Дээрх дугаартай хэрэглэгч бүртгэлтэй байна."}
              placeholder={"Имайл хаяг/Утасны дугаар"}
              type={"text"}
              labelStyle={"block text-sm  text-black mb-2 mt-4"}
              className={"py-3 pr-3 border border-gray-300"}
            />
            <Input
              type={"password"}
              placeholder={"Нууц үг"}
              labelStyle={"block text-sm  text-black mb-2 mt-4"}
              className={"py-3 pr-3 border border-gray-300"}
            />
            <Input
              errorMessage={"Нууц үг таарахгүй байна"}
              type={"password"}
              placeholder={"Нууц үгээ давтан оруулна уу"}
              labelStyle={"block text-sm  text-black mb-2 mt-4"}
              className={"py-3 pr-3 border border-gray-300"}
            />
            <Button onClick={confirm} className="w-full mt-8 text-caak-shit text-17px font-bold bg-caak-titaniumwhite rounded-lg">
              Бүртгүүлэх
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

export default UserInformation;
