import Auth from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import Input from "../../components/input";
import Consts from "../../Utility/Consts";
import { checkUsername, closeModal } from "../../Utility/Util";
import Validate from "../../Utility/Validate";
import Backdrop from "../../components/Backdrop";
import Checkbox from "../../components/checkbox/Checkbox";

export default function PassCompleted() {
  const history = useHistory();
  const { state } = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const validate = {
    username: {
      value: username,
      type: Consts.typeUsername,
      onChange: setUsername,
    },
    password: {
      value: password,
      type: Consts.typePassword,
      onChange: setPassword,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit } = Validate(validate);

  // useEffect(() => {
  //   if (state.errors) {
  //     setErrors(state.errors);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  // async function doSignIn() {
  //   try {
  //     setLoading(true);

  //     await Auth.signIn(checkUsername(username), password);
  //     setLoading(false);
  //     closeModal(history, state);
  //   } catch (ex) {
  //     setLoading(false);
  //     if (ex.code === "UserNotConfirmedException") {
  //       history.replace({
  //         pathname: "/forgotpassword/confirmation/",
  //         state: {
  //           ...state,
  //           username: checkUsername(username),
  //           password: password,
  //         },
  //       });
  //     } else if (ex.code === "NotAuthorizedException") {
  //       setError("Нэврэх нэр эсвэл нууц үг буруу байна");
  //     }
  //   }
  // }

  function changePassword() {
    history.replace({
      pathname: "/login/main/",
    });
  }

  function handleCheck() {
    console.log("checked");
    setIsCheck(!isCheck);
  }

  return (
    <Backdrop className={"flex justify-center items-center"}>
      <div className="popup absolute bg-white rounded-lg shadow-xl">
        <div className="px-c6 pt-c6 flex items-center justify-end cursor-pointer">
          <span
            onClick={() => closeModal(history, state)}
            className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer"
          />
        </div>
        <div
          className={
            "flex text-caak-generalblack justify-center text-center align-center pt-c2 pb-c2 font-bold text-24px"
          }
        >
          Нууц үгээ сэргээх
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="px-c8">
            <p className="error">{error}</p>

            <Input
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
              name={"password"}
              type={"password"}
              errorMessage={errors.password}
              onChange={handleChange}
              placeholder={"Шинэ нууц үг давтах"}
              className={
                "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
              }
            />
          </div>
          <div className="px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
            <div className="text-caak-generalblack text-14px  ">
              <Checkbox
                id="selectAll"
                handleClick={handleCheck}
                isChecked={isCheck.length}
                className="rounded border-2 cursor-pointer w-b4 h-b4 ${
                 bg-caak-primary
                "
              />
              <span className=" ml-1  ">Намайг сана</span>
            </div>
            <Button
              loading={loading}
              onClick={() => changePassword()}
              className={
                "rounded-md w-c10 h-c9 text-17px font-bold bg-caak-secondprimary"
              }
            >
              Баталгаажуулах
            </Button>
          </div>
        </form>
        {/*Footer*/}
        <div
          className={
            "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
          }
        >
          <div className="text-caak-blue text-15px">
            <span>Бүртгэлтэй хэрэглэгч бол </span>
            <span
              onClick={() =>
                history.replace({
                  pathname: "/login/",
                  state,
                })
              }
              className="text-caak-primary text-15px font-bold cursor-pointer"
            >
              Нэвтрэх
            </span>
          </div>
          <span className="icon-fi-rs-help text-18px text-caak-darkBlue" />
        </div>
      </div>
    </Backdrop>
  );
}
