import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import Input from "../../components/input";
import Consts from "../../Utility/Consts";
import { checkUsernameType, closeModal } from "../../Utility/Util";
import { isLogged } from "../../Utility/Authenty";
import { useUser } from "../../context/userContext";
import Validate from "../../Utility/Validate";
import Backdrop from "../../components/Backdrop";
import { useEffect } from "react";

export default function ForgotPassword() {
  const history = useHistory();
  const { state } = useLocation();
  const { user, setUser } = useUser();

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = {
    password: {
      value: password,
      type: Consts.typePassword,
      onChange: setPassword,
      ignoreOn: true,
    },
    passwordRepeat: {
      value: passwordRepeat,
      type: Consts.typePasswordRepeat,
      onChange: setPasswordRepeat,
      ignoreOn: true,
    },
  };

  //   if (state.onlyInfo) {
  //     delete validate["username"];
  //     delete validate["password"];
  //     delete validate["passwordRepeat"];
  //   }

  const { handleChange, errors, setErrors, handleSubmit } = Validate(validate);

  useEffect(() => {
    if (state.onlyInfo) {
      if (user) {
        if (password === passwordRepeat) setPassword(user.attributes.password);
      }
    }
    // eslint-disable-next-line
  }, []);

  const doChangePassword = async () => {
    try {
      setLoading(true);
      let usr = {};

      if (checkUsernameType(username) === Consts.typeEmail) {
        usr.username = username;
      } else {
        usr.username = "+976" + username;
      }
      usr.password = password;

      let usrData = {};

      //   await saveUserData(usrData);
      setLoading(false);

      if (!state.onlyInfo) {
        history.replace({
          pathname: "/register/confirmation/",
          state: { ...state, password: usr.password },
        });
      } else {
        isLogged(user, setUser);
        history.replace({ pathname: "/register/completed/", state });
      }
    } catch (ex) {
      setLoading(false);
      if (ex.code === "UsernameExistsException") {
        setErrors({ ...errors, username: "Дээрхи хэрэглэгч бүртгэлтэй байна" });
      } else {
        console.log(ex);
      }
    }
  };
  //   const saveUserData = async (data) => {
  //     let user = await API.graphql({
  //       query: createUser,
  //       variables: { input: data },
  //       authMode: "AWS_IAM",
  //     });

  //     console.log(user);
  //   };

  function doSubmit() {
    history.replace({ pathname: "/forgotpassword/confirmation/" });
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
            <p className="text-caak-generalblack text-13px">Нэвтрэх</p>
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
              name={"username"}
              type={"text"}
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
              onClick={() => doSubmit()}
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
              Нэврэх
            </span>
          </div>
          <span className="icon-fi-rs-help text-18px text-caak-darkBlue" />
        </div>
      </div>
    </Backdrop>
  );
}
