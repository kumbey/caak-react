import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Button from "../../components/button";
import Switch from "./Switch";
import Informations from "./Informations";
import Dummy from "dummyjs";
import { getUserById } from "../../Utility/ApiHelper";
import { checkUser } from "../../Utility/Util";
import { useUser } from "../../context/userContext";
import { getFileUrl } from "../../Utility/Util";
import Input from "../../components/input";
import Consts from "../../Utility/Consts";
import Validate from "../../Utility/Validate";
import Auth from "@aws-amplify/auth";

const data = [
  {
    id: 1,
    icon: <span className="icon-fi-rs-profile text-24px" />,
    title: "Хувийн мэдээлэл",
  },
  {
    id: 2,
    icon: <span className="icon-fi-rs-social text-22px" />,
    title: "Сошиал холболтууд",
  },
  {
    id: 3,
    icon: <span className="icon-fi-rs-settings text-22px" />,
    title: "Сайтын тохиргоо",
  },
  {
    id: 4,
    icon: (
      <span
        style={{ paddingRight: "3px" }}
        className="icon-fi-rs-lock text-24px"
      />
    ),
    title: "Нууцлал",
  },
];

export default function Settings() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const { user: signedUser } = useUser();
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validate = {
    oldPassword: {
      value: oldPassword,
      type: Consts.typePassword,
      onChange: setOldPassword,
      ignoreOn: true,
    },
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

  const { handleChange, errors, setErrors, handleSubmit } = Validate(validate);

  const handleClick = () => {
    setShowInput(true);
  };

  const doConfirm = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();

      setLoading(true);
      await Auth.changePassword(authUser, oldPassword, password);
      setMessage("Нууц үг амжилттай солигдлоо!");
      setLoading(false);
      setShowInput(false);
    } catch (ex) {
      setLoading(false);
      if (ex.code === "CodeMismatchException") {
        setErrors({ ...errors, code: "Баталгаажуулах код буруу байна" });
      } else if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "InvalidParameterException") {
        setError("Имэйл хаяг буруу байна");
      } else if (ex.code === "NotAuthorizedException") {
        setError("Хуучин нууц үг буруу байна");
      } else {
        console.log(ex);
      }
    }
  };

  useEffect(() => {
    try {
      if (checkUser(signedUser))
        getUserById({
          id: userId,
          setUser,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
      else {
        history.goBack();
      }
    } catch (ex) {
      console.log(ex);
    }
    // eslint-disable-next-line
  }, [user, userId]);

  return user ? (
    <div style={{ marginTop: "36px" }} className="grid justify-center">
      <div className=" flex items-center">
        <span
          onClick={() => history.goBack()}
          className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer"
          style={{ height: "48px", width: "48px" }}
        />
        <img
          className="md:w-c28 w-9 h-9 md:h-c28 rounded-full"
          alt=""
          style={{
            marginLeft: "20px",
            marginRight: "8px",
          }}
          data-dummy="200x200"
          src={user.pic ? getFileUrl(user.pic) : Dummy.img("200x200")}
        />
        <div className="sm:flex-row flex flex-col items-center">
          <p
            style={{ marginRight: "8px" }}
            className=" md:text-24px text-18px font-medium"
          >
            {user.firstname}
          </p>
          <p className="text-15px md:text-18px">@{user.nickname}</p>
        </div>
      </div>
      <div className="md:flex-row sm:justify-between md:justify-between lg:justify-between 2xl:justify-start 3xl:justify-center px-auto flex flex-col mx-auto">
        <div
          style={{ marginTop: "34px" }}
          className=" pl-c3 pr-c60 bg-white rounded-lg"
        >
          {data.map(({ icon, title, id }) => (
            <div
              key={id}
              onClick={() => setActiveIndex(id)}
              style={{ marginTop: "24px", marginBottom: "24px" }}
              className={`flex items-center cursor-pointer 
                                    ${
                                      id === activeIndex
                                        ? "text-caak-primary"
                                        : "text-caak-generalblack"
                                    }`}
            >
              {icon}
              <p className="text-17px ml-px-10 font-medium">{title}</p>
            </div>
          ))}
        </div>
        <div
          style={{ marginTop: "34px" }}
          className="settingsPanel md:ml-c11 bg-white rounded-lg"
        >
          <div
            style={{ paddingBottom: "65px" }}
            className={`${activeIndex === 1 ? "block" : "hidden"}`}
          >
            <Informations currentUser={user} />
          </div>
          <div
            style={{ paddingBottom: "65px" }}
            className={` ${activeIndex === 2 ? "block" : "hidden"}`}
          >
            <p
              className="font-medium"
              style={{
                marginLeft: "30px",
                marginTop: "30px",
                fontSize: "24px",
              }}
            >
              Сошиал холболтууд
            </p>
            <div style={{ marginTop: "21px" }} className="mx-c3 pb-c60">
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Instagram
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Facebook
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Tiktok
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Twitter
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{ paddingBottom: "52px" }}
            className={`${activeIndex === 3 ? "block" : "hidden"}`}
          >
            <p
              className="font-medium"
              style={{
                marginLeft: "30px",
                marginTop: "30px",
                fontSize: "24px",
              }}
            >
              Сайтын тохиргоо
            </p>
            <div style={{ marginTop: "21px" }} className=" border-b">
              <div
                style={{ paddingBlock: "14px" }}
                className="px-c3 flex items-center justify-between w-full border-b"
              >
                <p className="text-16px font-medium">
                  Видео бичлэгийг автоматаар тоглуулах
                </p>
                <Switch />
              </div>
            </div>
          </div>
          <div className={`${activeIndex === 4 ? "block" : "hidden"}`}>
            <p
              className="font-medium"
              style={{
                marginLeft: "30px",
                marginTop: "30px",
                fontSize: "24px",
              }}
            >
              Нууцлал
            </p>
            <div style={{ marginTop: "21px" }} className="">
              <div
                style={{ paddingBlock: "14px" }}
                className="px-c3 flex items-center justify-between w-full border-b"
              >
                <p className="text-16px font-medium">
                  Элссэн группуудыг ил харуулах
                </p>
                <Switch />
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="px-c3 flex items-center justify-between w-full border-b"
              >
                <p className="text-16px font-medium">
                  Миний үүсгэсэн группуудыг ил харуулах
                </p>
                <Switch />
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <p className="text-16px pl-c3 font-medium">
                  Нууц үгээ шинэчлэх
                </p>
                {showInput ? (
                  <div className="flex w-full">
                    <div className="flex flex-col w-full">
                      <p className="error">{error}</p>
                      <Input
                        value={oldPassword}
                        name={"oldPassword"}
                        type={"password"}
                        // errorMessage={errors.oldPassword}
                        onChange={handleChange}
                        placeholder={"Хуучин нууц үгээ оруулах"}
                        className={
                          "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                        }
                      />
                      <Input
                        value={password}
                        name={"password"}
                        type={"password"}
                        errorMessage={errors.password}
                        onChange={handleChange}
                        placeholder={"Шинэ нууц үг"}
                        className={
                          "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                        }
                      />
                      <Input
                        value={passwordRepeat}
                        name={"passwordRepeat"}
                        type={"password"}
                        errorMessage={errors.passwordRepeat}
                        onChange={handleChange}
                        placeholder={"Шинэ нууц үг давтах"}
                        className={
                          "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                        }
                      />
                    </div>

                    <button
                      loading={loading}
                      onClick={() => handleSubmit(doConfirm)}
                      className="px-c3 icon-fi-rs-thick-check text-caak-algalfuel ml-4"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-green-500">{message}</p>
                    <span
                      onClick={() => handleClick()}
                      className="px-c3 icon-fi-rs-pencil text-caak-darkBlue cursor-pointer"
                    />
                  </>
                )}
              </div>
              <div
                style={{ marginTop: "60px", paddingBottom: "22px" }}
                className="text-caak-red px-c3 flex items-center justify-end cursor-pointer"
              >
                <span className="icon-fi-rs-delete text-15px" />
                <p className="text-15px ml-px-6 font-medium">
                  Бүртгэлээ устгах
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
