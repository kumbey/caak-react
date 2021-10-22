import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import Input from "../../components/input";
import Consts from "../../Utility/Consts";
import { checkUsername, closeModal } from "../../Utility/Util";
import Validate from "../../Utility/Validate";
import Backdrop from "../../components/Backdrop";
import Auth from "@aws-amplify/auth";

export default function ForgotPassword() {
  const history = useHistory();
  const { state } = useLocation();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = {
    username: {
      value: username,
      type: Consts.typeUsername,
      onChange: setUsername,
    },
  };

  const { handleChange, errors, handleSubmit } = Validate(validate);

  async function doSubmit() {
    try {
      setLoading(true);
      await Auth.forgotPassword(username);
      setLoading(false);
      history.replace({
        pathname: "/forgotpassword/confirmation/",
        state: {
          ...state,
          username: checkUsername(username),
        },
      });
    } catch (ex) {
      setLoading(false);
      if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "InvalidParameterException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "LimitExceededException") {
        setError("Дахин код авах лимит хэтэрсэн");
      } else {
        console.log(ex);
      }
    }
  }

  return (
    <Backdrop className={"flex items-center justify-center"}>
      <div className="popup absolute bg-white rounded-lg shadow-xl">
        <div className=" px-c6 pt-c6 flex items-center justify-between cursor-pointer">
          <div
            onClick={() =>
              history.replace({ pathname: "/login", state: state })
            }
            className="flex items-center"
          >
            <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1" />
            <p className="text-caak-generalblack text-13px">Буцах</p>
          </div>
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
          Нууц үг мартсан
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="px-c8 ">
            <p className="error">{error}</p>
            <Input
              name="username"
              type="text"
              errorMessage={errors.username}
              onChange={handleChange}
              placeholder={"Имэйл хаяг эсвэл Утасны дугаар"}
              className={
                "border border-caak-titaniumwhite h-c9 bg-caak-liquidnitrogen"
              }
            />
          </div>
          <div className="px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
            <Button
              loading={loading}
              onClick={() => handleSubmit(doSubmit)}
              className={
                "rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
              }
            >
              Сэргээх код авах
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
                  pathname: "/register/",
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
