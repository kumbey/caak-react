import React, { useState } from "react";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import Divider from "../../components/divider";
import Input from "../../components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Consts from "../../Utility/Consts";
import Validate from "../../Utility/Validate"
import { checkUsernameType, useQuery } from "../../Utility/Util";
import Auth from "@aws-amplify/auth";

const Login = () => {
  library.add(faFacebook, faGoogle);


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const validate = {
    username: {
        value: username, 
        type: Consts.typeUsername, 
        onChange: setUsername
    },
    password: {
        value: password,
        type: Consts.typePassword,
        onChange: setPassword
    }
  }

  const { handleChange, errors, handleSubmit } = Validate(validate)
  const {removeQuery, addQuery, addQuerys} = useQuery()

  async function doSignIn(){
      try{
          setLoading(true)
          let user_name = username

          if(checkUsernameType(user_name) === Consts.typePhoneNumber){
              user_name = "+976"+ user_name
          }

          await Auth.signIn(user_name, password)
          removeQuery("signInUp")
      }catch(ex){
          if(ex.code === "UserNotConfirmedException"){
              addQuerys({signInUp: "signUp", type: "confirm"})
          }else if(ex.code === "NotAuthorizedException"){
              setError("Нэврэх нэр эсвэл нууц үг буруу байна")
          }
      }finally{
          setLoading(false)
      }
  }


  return (
    <Backdrop>
      <div className="min-w-max sm:mx-auto sm:py-6 sm:w-full sm:max-w-md flex h-full">
        <div className="loginCard min-w-max sm:w-full relative w-screen px-10 py-8 bg-white rounded-lg shadow-xl">
          <div className={"cursor-pointer relative"} onClick={() => removeQuery("signInUp")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className={"flex justify-center align-center py-8"}>
            <span className={"font-black text-4xl"}>Нэвтрэх</span>
          </div>
          {/*Social Buttons*/}
          <div className={"flex flex-col justify-center"}>
            <Button
              onClick={() => null}
              icon={
                <FontAwesomeIcon
                  size={"lg"}
                  className={"text-white mr-2"}
                  icon={faFacebook}
                />
              }
              round
              className={
                "hover:bg-facebook-hover border border-transparent justify-center text-base font-bold mb-2 rounded-md text-white bg-facebook"
              }
              iconPosition={"left"}
            >
              Facebook-ээр нэвтрэх
            </Button>
            <Button
              onClick={() => null}
              icon={
                <FontAwesomeIcon
                  size={"lg"}
                  className={"text-primary mr-2"}
                  icon={faGoogle}
                />
              }
              round
              className={
                "hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2 rounded-md text-black bg-white"
              }
              iconPosition={"left"}
            >
              Gmail-ээр нэвтрэх
            </Button>
          </div>
          <Divider
            textSize={"text-base font-light"}
            textColor={"text-gray-500"}
            color={"bg-gray-100"}
            text={"эсвэл"}
            className={"my-4 font-light"}
          />
          {/*Login Form*/}
          <div className="space-y-6">
            <p className="error" id="email-error">
                {error}
            </p>
            <Input
              name="username"
              value={username}
              errorMessage={errors.username}
              label={
                <div>
                  <span className={"font-bold"}>Имэйл хаяг</span> эсвэл{" "}
                  <span className={"font-bold"}>Утасны дугаар</span>
                </div>
              }
              labelStyle={"block text-base font-medium text-black mb-3"}
              placeholder={"example@mail.com/99887766"}
              className={"py-3 border border-gray-300"}
              onChange={handleChange}
            />
            <Input
              name="password"
              value={password}
              errorMessage={errors.password}
              label={
                <div className={"flex flex-row justify-between items-center"}>
                  <b>Нууц үг</b>
                  <a href={"/"}>
                    <span
                      className={
                        "underline font-medium text-primary hover:text-primary-hover"
                      }
                    >
                      Нууц үгээ мартсан уу?
                    </span>
                  </a>
                </div>
              }
              labelStyle={"block text-base font-medium text-black mb-3"}
              placeholder={"Таны нууц үг"}
              className={"py-3 pr-3 border border-gray-300"}
              onChange={handleChange}
            />

            <div>
              <Button
                loading={loading}
                type={"submit"}
                round
                skin={"primary"}
                className={
                  "w-full font-bold text-base justify-center border border-transparent"
                }
                onClick={() => handleSubmit(doSignIn)}
              >
                Нэвтрэх
              </Button>
            </div>
            <div className="text-base text-center">
              <span className={"text-gray-primary"}>
                Хэрэв та элсээгүй бол{" "}
              </span>
              <span
                onClick={() => addQuery("signInUp","signUp")}
                className="text-primary hover:text-primary-hover font-bold cursor-pointer"
              >
                {" "}
                "Бүртгүүлэх"
              </span>
            </div>
          </div>
          {/*Footer*/}
          <div
            className={
              "signFooter flex self-end justify-center border-t items-center divide-x divide-gray-primary mt-8 divide-opacity-20 text-sm "
            }
          >
            <a href={"/"} className={"flex-1 text-center py-2 "}>
              <span>Үйлчилгээний нөхцөл</span>
            </a>
            <a href={"/"} className={"flex-1 text-center py-2 align-middle"}>
              <span>Нууцлал</span>
            </a>
            <a href={"/"} className={"flex-1 text-center py-2 "}>
              <span>Холбоо барих</span>
            </a>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
export default Login;
