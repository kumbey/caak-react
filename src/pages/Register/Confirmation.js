import React from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import OtpInput from "../../components/input/OtpInput";
import Backdrop from "../../components/Backdrop";
import { closeModal, mailNumber } from "../../Utility/Util";
import { useState } from "react";
import Validate from "../../Utility/Validate";
import Consts from "../../Utility/Consts";
import Auth from "@aws-amplify/auth";

export default function Confirmation() {
    
  const history = useHistory();
  const { state } = useLocation()
  
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const validate = {
    code: {
        value: code,
        type: Consts.typeConfirmationCode,
        onChange: setCode,
        ignoreOn: true
    }
  }

  const {handleChange, errors, setErrors, handleSubmit, isValid} = Validate(validate)
  
  const doConfirm = async () => {
      try{
        setLoading(true)
        await Auth.confirmSignUp(state.username, code);
        await Auth.signIn(state.username, state.password)
        setLoading(false)
        history.replace({pathname: "/register/completed/", state})
      }catch(ex){
        setLoading(false)
        if(ex.code === "CodeMismatchException"){
          setErrors({...errors, code: "Баталгаажуулах код буруу байна"})
        }else if(ex.code === "NotAuthorizedException"){
          history.replace({pathname: "/login/main/", state: {...state, errors: {password: "Нууц үг буруу байна"}}})
        }else{
          console.log(ex)
        }
      }
  }

  return ( 
    <Backdrop className="flex justify-center items-center">
      <div className="ph:w-full bg-white rounded-lg shadow-xl">
                <div className="flex px-c6 justify-between pt-c6 items-center  cursor-pointer ">
                        <div className="flex items-center">
                            {/* <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1"/>
                            <p  className="text-caak-generalblack text-13px">Бүртгүүлэх хэсэг рүү буцах</p> */}
                        </div>
                        <span onClick={() => closeModal(history, state)} className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded rounded-full cursor-pointer"/>
                    </div>
          
          {/* body */}
          <div className={"text-caak-generalblack text-center font-bold text-24px mt-c3"}>
            Баталгаажуулах код <br/> илгээгдлээ
          </div>
          <div className="text-center text-15px text-caak-darkBlue mt-c3">
            {mailNumber(state.username.replace("+976",""))} руу <br/> баталгаажуулах код илгээгдсэн болно.
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-c11">
                <OtpInput errorMessage={errors.code} name={"code"} onChange={handleChange}/>
            </div>
            <div className={" flex flex-col "}>
              
              <div className=" flex justify-center text-14px text-caak-darkBlue mt-c20">
                Баталгаажуулах код дахин авах
              </div>
                <div className=" flex justify-center items-center text-14px text-caak-primary font-bold cursor-pointer">
                  <span className={"icon-fi-rs-resend text-13px mr-1"}/>
                  Дахин илгээх
                </div>
                  <Button
                    loading={loading} 
                    onClick={() => handleSubmit(doConfirm)}
                    round 
                    className={`font-bold 
                      ${isValid ? "bg-caak-primary text-white" : "bg-caak-titaniumwhite text-caak-shit"}
                      mt-c6 mx-c13 
                      h-c9 
                      text-17px`}
                  >
                    Баталгаажуулах
                  </Button>
            </div>
          </form>

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
    </Backdrop>
  );
};


