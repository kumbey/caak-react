import React from "react";
import { useHistory, useLocation } from "react-router";
import Input from "../../components/input";
import Backdrop from "../../components/Backdrop";
import Select from "../../components/input/Select";
import Button from "../../components/button";
import { closeModal } from "../../Utility/Util";

const UserInformation = () => {

  const history = useHistory()
  const { state } = useLocation()

  return (
    <Backdrop>
      <div className=" sm:mx-auto pt-40 w-cc sm:max-h-md">
                <div className=" sm:w-full pb-c1 bg-white rounded-lg shadow-xl">
                <div className="flex  px-c6 justify-between pt-c6 items-center  cursor-pointer ">
                        <div 
                          onClick={() => history.replace({pathname: "/register", state: state})}
                          className="flex items-center"
                        >
                            <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1"/>
                            <p  className="text-caak-generalblack text-13px">Бүртгүүлэх сонголт руу буцах</p>
                        </div>
                        <span 
                          onClick={() => closeModal(history, state)}
                          className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded-lg"
                        />
                    </div>
                    <div className={"flex text-caak-generalblack justify-center text-center align-center mt-5 mb-4 font-bold text-24px"}>
                        Имайл хаяг/Утасны дугаар <br/> бүртгүүлэх!
                    </div>
                <div className=" px-c13">
                    <div className="flex justify-between">
                <Input
                        placeholder={"Овог"}
                        className={"py-3 border border-caak-titaniumwhite w-c12 h-c9 bg-caak-titaniumwhite"}
                    />
                    <Input
                        placeholder={"Нэр"}
                        className={"py-3 border border-caak-titaniumwhite w-c12 h-c9 bg-caak-titaniumwhite"}
                    />
              </div>
              <Input
                        placeholder={"Нийтэд харагдах нэр"}
                        className={"py-3 border border-caak-titaniumwhite bg-caak-titaniumwhite"}
                    />
                    

            <div className={"flex"}>
              <Select placeholder={"asdsad"} containerStyle={"flex-1"} className=" h-c9 w-c14 bg-caak-titaniumwhite">
                <option>1998</option>
                <option>1999</option>
                <option>2000</option>
                <option>2001</option>
              </Select>
              <Select containerStyle={"flex-1"}  className=" h-c9 w-c14 bg-caak-titaniumwhite">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </Select>
              <Select containerStyle={"flex-1"}  className=" h-c9 w-c14 bg-caak-titaniumwhite">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
            </div>
          <div className="mt-b2">
            <Input
              //errorMessage={"Дээрх дугаартай хэрэглэгч бүртгэлтэй байна."}
              placeholder={"Имайл хаяг/Утасны дугаар"}
              type={"text"}
              labelStyle={"block text-sm  text-black"}
              className={"h-c9 border border-gray-300 bg-caak-titaniumwhite"}
            />
            <div className="flex items-center relative">
                <Input
                  placeholder={"Нууц үг"}
                  className={"border border-caak-titaniumwhite w-ce h-c9 bg-caak-liquidnitrogen"}
                />
                <span className="icon-fi-rs-view absolute top-c6  right-c6 text-caak-darkBlue text-13px" />
            </div>
          
            <div className="flex items-center relative ">
              <Input
                //errorMessage={"Нууц үг таарахгүй байна"}
                placeholder={"Нууц үгээ давтан оруулна уу"}
                className={"border border-caak-titaniumwhite w-ce h-c9 bg-caak-liquidnitrogen"}
              />
                <span className="icon-fi-rs-view absolute top-c6 right-c6 text-caak-darkBlue text-13px" />
            </div>

            <Button onClick={() => {}} className="mt-c3 w-full h-c9 text-caak-shit text-17px font-bold bg-caak-titaniumwhite rounded-lg">
              Бүртгүүлэх
            </Button>
            <p className="text-12px pt-b1 text-caak-aleutian">Таны овог нэр, Төрсөн он сар болон Нууц үг нийтэд харагдахгүй болно!</p>
            </div>
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

export default UserInformation;
