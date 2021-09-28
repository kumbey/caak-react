import Auth from "@aws-amplify/auth";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import Input from "../../components/input";
import Consts from "../../Utility/Consts";
import { checkUsername, closeModal } from "../../Utility/Util";
import Validate from "../../Utility/Validate";
import Backdrop from "../../components/Backdrop";
import { useEffect } from "react/cjs/react.development";

export default function Login() {
  const history = useHistory();
  const { state } = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (state.errors) {
      setErrors(state.errors);
    }
    // eslint-disable-next-line
  }, []);

  async function doSignIn() {
    try {
      setLoading(true);

      await Auth.signIn(checkUsername(username), password);
      setLoading(false);
      closeModal(history, state);
    } catch (ex) {
      setLoading(false);
      if (ex.code === "UserNotConfirmedException") {
        history.replace({
          pathname: "/register/confirmation/",
          state: {
            ...state,
            username: checkUsername(username),
            password: password,
          },
        });
      } else if (ex.code === "NotAuthorizedException") {
        setError("Нэврэх нэр эсвэл нууц үг буруу байна");
      }
    }
  }

  return (
    <Backdrop className={"flex items-center"}>
      <div className="w-96 min-w-max mx-auto my-auto bg-white rounded-lg shadow-xl">
        <div className="px-c6 pt-c6 flex items-center justify-between cursor-pointer">
          <div
            onClick={() =>
              history.replace({ pathname: "/login", state: state })
            }
            className="flex items-center"
          >
            <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1" />
            <p className="text-caak-generalblack text-13px">
              Нэвтрэх сонголт руу буцах
            </p>
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
          Имайл хаяг/Утасны дугаар <br /> нэвтрэх!
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="px-c8 ">
            <p className="error">{error}</p>
            <Input
              name={"username"}
              type={"text"}
              errorMessage={errors.username}
              onChange={handleChange}
              placeholder={"Имайл хаяг эсвэл Утасны дугаар"}
              className={
                "border border-caak-titaniumwhite h-c9 bg-caak-liquidnitrogen"
              }
            />
            <Input
              name={"password"}
              type={"password"}
              errorMessage={errors.password}
              onChange={handleChange}
              placeholder={"Нууц үг"}
              className={
                "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
              }
            />
          </div>
          <div className="px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
            <Button
              loading={loading}
              onClick={() => handleSubmit(doSignIn)}
              className={
                "rounded-md w-c10 h-c9 text-17px font-bold bg-caak-secondprimary"
              }
            >
              Нэвтрэх
            </Button>
            <p className="ml- cursor-pointer">Нууц үгээ мартсан уу?</p>
          </div>
        </form>
        {/*Footer*/}
        <div
          className={
            "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
          }
        >
          <div className="text-caak-blue text-15px">
            <span>Шинэ хэрэглэгч бол </span>
            <span
              onClick={() =>
                history.replace({
                  pathname: "/register/",
                  state,
                })
              }
              className="text-caak-primary text-15px font-bold cursor-pointer"
            >
              {" "}
              Бүртгүүлэх
            </span>
          </div>
          <span className="icon-fi-rs-help text-18px text-caak-darkBlue" />
        </div>
      </div>
    </Backdrop>
  );
}
