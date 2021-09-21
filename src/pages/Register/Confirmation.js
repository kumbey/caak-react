import React from "react";
import { useHistory } from "react-router";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import OtpInput from "../../components/input/OtpInput";

export default function Confirmation() {
  const history = useHistory();
    
    function home(){
        history.push("/")
    }
  return (
    <Backdrop>
      <div className=" sm:mx-auto pt-40 w-cb sm:max-h-md">
                <div className=" sm:w-full pb-c1 bg-white rounded-lg shadow-xl">
                <div className="flex px-c6 justify-between pt-c6 items-center  cursor-pointer ">
                        <div className="flex items-center">
                            <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1"/>
                            <p  className="text-caak-generalblack text-13px">Бүртгүүлэх хэсэг рүү буцах</p>
                        </div>
                        <span onClick={home} className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded rounded-lg"/>
                    </div>
          
          {/* body */}
          <div className={"text-caak-generalblack text-center font-bold text-24px mt-c3"}>
            Баталгаажуулах код <br/> илгээгдлээ
          </div>
          <div className="text-center text-15px text-caak-darkBlue mt-c3">
            Таны утасны дугаар болох ** ** ** 47 руу <br/> баталгаажуулах код илгээгдсэн болно.
          </div>
          <OtpInput/>
          <div className={" flex flex-col "}>
            
            <div className=" flex justify-center text-14px text-caak-darkBlue mt-c1">
              Баталгаажуулах код дахин авах
            </div>
              <div className=" flex justify-center items-center text-14px text-caak-primary font-bold cursor-pointer">
                <span className={"icon-fi-rs-resend text-13px mr-1"}/>
                Дахин илгээх
              </div>
                <Button onClick={() => {}} round className={" font-bold bg-caak-primary mt-c6 mx-c13 h-c9 text-17px"}>
                  Баталгаажуулах
                </Button>
          </div>

              {/*Footer*/}
              <div
                className={
                    "signFooter flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
                }
            >
                <div className="text-caak-blue text-15px">
                    <span>
                        Бүртгэлтэй хэрэглэгч бол{" "}
                    </span>
                    <a
                        href="/register"
                        className="text-caak-primary text-15px font-bold cursor-pointer"
                    >
                    {" "}
                        Нэвтрэх
                    </a>
                    
                </div>
                <span className="icon-fi-rs-help text-18px text-caak-darkBlue "/>
        </div>
        </div>
      </div>
    </Backdrop>
  );
};


