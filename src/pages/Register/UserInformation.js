import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Input from "../../components/input";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import { checkUser, checkUsernameType, closeModal } from "../../Utility/Util";
import Consts from "../../Utility/Consts";
import Validate from "../../Utility/Validate";
import DateSelect from "../../components/input/DateSelect";
import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";
import { createUser } from "../../graphql-custom/user/mutation";
import { useUser } from "../../context/userContext";
import { isLogged } from "../../Utility/Authenty";
import Select from "../../components/input/Select";

const UserInformation = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { user, setUser } = useUser();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = {
    firstname: {
      value: firstname,
      type: Consts.typeRequired,
      onChange: setFirstname,
      ignoreOn: true,
    },
    lastname: {
      value: lastname,
      type: Consts.typeRequired,
      onChange: setLastname,
      ignoreOn: true,
    },
    nickname: {
      value: nickname,
      type: Consts.typeRequired,
      onChange: setNickname,
      ignoreOn: true,
    },
    gender: {
      value: gender,
      type: Consts.typeRequired,
      onChange: setGender,
    },
    birthdate: {
      value: birthdate,
      type: Consts.typeDate,
      onChange: setBirthdate,
    },
    username: {
      value: username,
      type: Consts.typeUsername,
      onChange: setUsername,
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

  if (state.onlyInfo) {
    delete validate["username"];
    delete validate["password"];
    delete validate["passwordRepeat"];
  }

  const { handleChange, errors, setErrors, handleSubmit, isValid } =
    Validate(validate);

  useEffect(() => {
    if (state.onlyInfo) {
      if (user) {
        setLastname(user.attributes.middle_name);
        setFirstname(user.attributes.name);
        setNickname(user.attributes.middle_name + user.attributes.name);
      }
    }
    // eslint-disable-next-line
  }, []);

  const doSignUp = async () => {
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
      usrData.firstname = firstname;
      usrData.lastname = lastname;
      usrData.nickname = nickname;
      usrData.birthdate = birthdate;
      usrData.gender = gender;
      usrData.status = "ACTIVE";
      usrData.status = true;
      usrData.verified = false;

      //do not sign up when its federated sign in
      if (!state.onlyInfo) {
        let resp = await Auth.signUp(usr);
        usrData.id = resp.userSub;
      } else {
        usrData.id = user.attributes.sub;
      }

      await saveUserData(usrData);
      setLoading(false);

      if (!state.onlyInfo) {
        history.replace({
          pathname: "/register/confirmation/",
          state: { ...state, username: usr.username, password: usr.password },
        });
      } else {
        isLogged(user, setUser);
        history.replace({ pathname: "/register/completed/", state });
      }
    } catch (ex) {
      setLoading(false);
      if (ex.code === "UsernameExistsException") {
        setErrors({ ...errors, username: "???????????? ?????????????????? ???????????????????? ??????????" });
      } else {
        console.log(ex);
      }
    }
  };

  const saveUserData = async (data) => {
    let user = await API.graphql({
      query: createUser,
      variables: { input: data },
      authMode: "AWS_IAM",
    });

    console.log(user);
  };

  return !checkUser(user) ? (
    <Backdrop className="sm:items-center flex items-start justify-center">
      <div className="popup absolute bg-white rounded-lg shadow-xl">
        <div className="px-c6 pt-c6 flex items-center justify-between cursor-pointer">
          <div
            onClick={() =>
              history.replace({ pathname: "/register", state: state })
            }
            className="flex items-center"
          >
            <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1" />
            <p className="text-caak-generalblack text-13px">??????????</p>
          </div>
          <span
            onClick={() => closeModal(history, state)}
            className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer"
          />
        </div>
        <div
          className={
            " text-caak-generalblack text-center mb-4 font-bold text-24px"
          }
        >
          ????????????????????!
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="px-c13 xs:px-2">
            <div className="flex flex-row block w-full">
              <Input
                value={lastname || ""}
                name={"lastname"}
                errorMessage={errors.lastname}
                onChange={handleChange}
                placeholder={"????????"}
                className={
                  "py-3 border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"
                }
                containerStyle={"m-0 mx-0 w-1/2 pr-2"}
              />
              <Input
                value={firstname || ""}
                name={"firstname"}
                errorMessage={errors.firstname}
                onChange={handleChange}
                placeholder={"??????"}
                className={
                  "py-3 border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"
                }
                containerStyle={"m-0 mx-0 w-1/2"}
              />
            </div>

            <Input
              value={nickname || ""}
              name={"nickname"}
              errorMessage={errors.nickname}
              onChange={handleChange}
              placeholder={"???????????? ???????????????? ??????"}
              className={
                "py-3 border border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"
              }
            />

            <Select
              value={gender}
              name={"gender"}
              onChange={(e) => setGender(e.target.value)}
              errorMessage={errors.gender}
              containerStyle={"flex-1 w-full mr-2"}
              className="border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite py-3 mb-1 border"
            >
              <option value="placeholder">{"????????"}</option>
              <option value="MALE">??????????????</option>
              <option value="FEMALE">??????????????</option>
            </Select>

            <DateSelect
              startYear={1900}
              value={birthdate}
              errorMessage={errors.birthdate}
              name={"birthdate"}
              onChange={handleChange}
            />

            {!state.onlyInfo ? (
              <div className="mt-px-12">
                <Input
                  value={username}
                  name={"username"}
                  onChange={handleChange}
                  errorMessage={errors.username}
                  placeholder={"?????????? ????????/???????????? ????????????"}
                  type={"text"}
                  labelStyle={"block text-sm  text-black"}
                  className={
                    "h-c9 border border-gray-300 bg-caak-titaniumwhite"
                  }
                />
                <Input
                  value={password}
                  name={"password"}
                  onChange={handleChange}
                  errorMessage={errors.password}
                  type={"password"}
                  placeholder={"???????? ????"}
                  className={
                    "border w-full border-caak-titaniumwhite w-ce h-c9 bg-caak-liquidnitrogen"
                  }
                />

                <Input
                  value={passwordRepeat}
                  name={"passwordRepeat"}
                  onChange={handleChange}
                  errorMessage={errors.passwordRepeat}
                  type={"password"}
                  placeholder={"???????? ???????? ???????????? ?????????????? ????"}
                  className={
                    "border w-full border-caak-titaniumwhite w-ce h-c9 bg-caak-liquidnitrogen"
                  }
                />
              </div>
            ) : null}
            <Button
              onClick={() => handleSubmit(doSignUp)}
              loading={loading}
              className={`
                                    mt-c3 w-full 
                                    h-c9 
                                    text-17px 
                                    font-bold 
                                    ${
                                      isValid
                                        ? "bg-caak-primary text-white"
                                        : "bg-caak-titaniumwhite text-caak-shit"
                                    }
                                    rounded-lg
                                `}
            >
              ????????????????????
            </Button>
            <p className="text-12px pt-px-10 text-caak-aleutian">
              ???????? ???????? ??????, ???????????? ???? ?????? ?????????? ???????? ???? ???????????? ??????????????????????
              ??????????!
            </p>
          </div>
        </form>

        {/*Footer*/}
        <div
          className={
            "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
          }
        >
          <div className="text-caak-blue text-15px">
            <span>???????????????????? ?????????????????? ?????? </span>
            <span
              onClick={() =>
                history.replace({
                  pathname: "/login/",
                  state,
                })
              }
              className="text-caak-primary text-15px font-bold cursor-pointer"
            >
              {" "}
              ??????????????
            </span>
          </div>
          <span className="icon-fi-rs-help text-18px text-caak-darkBlue" />
        </div>
      </div>
    </Backdrop>
  ) : null;
};

export default UserInformation;
