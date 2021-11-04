import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import OtpInput from "../../components/input/OtpInput";
import Backdrop from "../../components/Backdrop";
import { closeModal, mailNumber } from "../../Utility/Util";
import { useState } from "react";
import Validate from "../../Utility/Validate";
import Consts from "../../Utility/Consts";
import Auth from "@aws-amplify/auth";
import Input from "../../components/input";

export default function PassConfirmation() {
  const history = useHistory();
  const { state } = useLocation();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [counter, setCounter] = useState();
  const [reset, setReset] = useState(false);

  const validate = {
    code: {
      value: code,
      type: Consts.typeConfirmationCode,
      onChange: setCode,
      ignoreOn: true,
    },
    password: {
      value: password,
      type: Consts.typePassword,
      onChange: setPassword,
      // ignoreOn: true,
    },
    passwordRepeat: {
      value: passwordRepeat,
      type: Consts.typePasswordRepeat,
      onChange: setPasswordRepeat,
      // ignoreOn: true,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit, isValid } =
    Validate(validate);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const doGetCode = async () => {
    setCounter(60);
    setReset(!reset);

    try {
      setLoading(true);
      await Auth.forgotPassword(state.username);

      setLoading(false);
    } catch (ex) {
      if (ex.code === "LimitExceededException") {
        setError("Дахин код авах лимит хэтэрсэн");
      } else {
        console.log(ex);
      }
    }
  };

  const doConfirm = async () => {
    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(state.username, code, password);
      setLoading(false);
      history.replace({ pathname: "/login/main/", state });
    } catch (ex) {
      setLoading(false);
      if (ex.code === "CodeMismatchException") {
        setErrors({ ...errors, code: "Баталгаажуулах код буруу байна" });
      } else if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "InvalidParameterException") {
        setError("Имэйл хаяг буруу байна");
      } else {
        console.log(ex);
      }
    }
  };

  return (
    <Backdrop className="flex justify-center items-center">
      <div className="ph:w-full bg-white rounded-lg shadow-xl">
        <div className="flex px-c6 justify-end pt-c6 items-center  cursor-pointer ">
          <span
            onClick={() => closeModal(history, state)}
            className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded rounded-full cursor-pointer"
          />
        </div>

        {/* body */}
        <div
          className={
            "text-caak-generalblack text-center font-bold text-24px mt-c3"
          }
        >
          Нууц үг сэргээх
        </div>
        <div className="text-center text-15px text-caak-darkBlue mt-c3">
          Таны {mailNumber(state.username.replace("+976", ""))} руу <br />{" "}
          баталгаажуулах код илгээгдсэн болно.
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mt-c11 ">
            <OtpInput
              errorMessage={errors.code}
              name={"code"}
              onChange={handleChange}
              reset={reset}
            />
          </div>
          <div className={" flex flex-col "}>
            <div className="px-c8 ">
              <div className=" flex justify-center text-14px text-caak-darkBlue mt-8"></div>
              {counter > 0 ? (
                <>
                  <p className="text-green-600 text-center">
                    Сэргээх код амжилттай илгээгдлээ
                  </p>
                  <div
                    className="                 
                   mb-8 w-full flex justify-center items-center  text-14px   bg-transparent shadow-none  "
                  >
                    <p className="flex justify-center">{counter}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-center">Баталгаажуулах код ирсэнгүй</p>
                  <div
                    onClick={() => doGetCode()}
                    className="cursor-pointer mb-8 w-full flex justify-center items-center  text-14px text-caak-primary bg-transparent shadow-none font-bold "
                  >
                    <span className={"icon-fi-rs-resend text-13px mr-1"} />
                    Дахин илгээх
                  </div>
                </>
              )}
            </div>

            <div className="px-c8">
              <p className="error">{error}</p>
              <Input
                value={password}
                name={"password"}
                type={"password"}
                errorMessage={errors.password}
                onChange={handleChange}
                placeholder={"Шинэ нууц үг"}
                className={
                  "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                }
              />
              <Input
                value={passwordRepeat}
                name={"passwordRepeat"}
                type={"password"}
                errorMessage={errors.passwordRepeat}
                onChange={handleChange}
                placeholder={"Нууц үг давтах"}
                className={
                  "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                }
              />
              <Button
                disabled={isValid ? false : true}
                loading={loading}
                onClick={() => handleSubmit(doConfirm)}
                round
                className={`font-bold 
                      ${
                        isValid
                          ? "bg-caak-primary text-white"
                          : "bg-caak-titaniumwhite text-caak-shit"
                      }
                      mt-c6 w-full
                      h-c9 
                      text-17px`}
              >
                Өөрчлөх
              </Button>
            </div>
          </div>
        </form>

        {/*Footer*/}
        <div
          className={
            "signFooter flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm mb-c1"
          }
        >
          <span className="icon-fi-rs-help text-18px text-caak-darkBlue " />
        </div>
      </div>
    </Backdrop>
  );
}
