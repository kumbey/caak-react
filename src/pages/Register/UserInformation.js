import React from "react";
import {useHistory, useLocation} from "react-router";
import Input from "../../components/input";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import {closeModal} from "../../Utility/Util";
import {useState} from "react/cjs/react.development";
import Consts from "../../Utility/Consts";
import Validate from "../../Utility/Validate";
import DateSelect from "../../components/input/DateSelect";

const UserInformation = () => {

    const history = useHistory()
    const {state} = useLocation()

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [nickname, setNickname] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const validate = {
        firstname: {
            value: firstname,
            type: Consts.typeRequired,
            onChange: setFirstname
        },
        lastname: {
            value: lastname,
            type: Consts.typeRequired,
            onChange: setLastname
        },
        nickname: {
            value: nickname,
            type: Consts.typeRequired,
            onChange: setNickname
        },
        birthdate: {
            value: birthdate,
            type: Consts.typeDate,
            onChange: setBirthdate
        },
        username: {
            value: username,
            type: Consts.typeUsername,
            onChange: setUsername
        },
        password: {
            value: password,
            type: Consts.typePassword,
            onChange: setPassword
        },
        passwordRepeat: {
            value: passwordRepeat,
            type: Consts.typePasswordRepeat,
            onChange: setPasswordRepeat,
        }
    }

    const {handleChange, errors, handleSubmit, isValid} = Validate(validate)


    return (
        <Backdrop className="flex justify-center items-center">
                <div className="ph:w-full w-cc bg-white rounded-lg shadow-xl ph:h-full">
                    <div className="flex px-c6 justify-between pt-c6 items-center  cursor-pointer ">
                        <div
                            onClick={() => history.replace({pathname: "/register", state: state})}
                            className="flex items-center"
                        >
                            <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1"/>
                            <p className="text-caak-generalblack text-13px">Бүртгүүлэх сонголт руу буцах</p>
                        </div>
                        <span
                            onClick={() => closeModal(history, state)}
                            className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded-full cursor-pointer"
                        />
                    </div>
                    <div
                        className={" text-caak-generalblack text-center mb-4 font-bold text-24px"}>
                        Имайл хаяг/Утасны дугаар <br/> бүртгүүлэх!
                    </div>
                    <div className=" px-c13 ">
                        <div className="flex ph:grid">
                            <Input
                                value={lastname}
                                name={"lastname"}
                                errorMessage={errors.lastname}
                                onChange={handleChange}
                                placeholder={"Овог"}
                                className={"py-3 border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"}
                            />
                            <div className="mr-a2"/>
                            <Input
                                value={firstname}
                                name={"firstname"}
                                errorMessage={errors.firstname}
                                onChange={handleChange}
                                placeholder={"Нэр"}
                                className={"py-3 border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"}
                            />
                        </div>
                        
                        <Input
                            value={nickname}
                            name={"nickname"}
                            errorMessage={errors.nickname}
                            onChange={handleChange}
                            placeholder={"Нийтэд харагдах нэр"}
                            className={"py-3 border border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"}
                        />

                        <DateSelect
                            value={birthdate}
                            errorMessage={errors.birthdate}
                            name={"birthdate"}
                            onChange={handleChange}
                        />

                        <div className="mt-b2">
                            <Input
                                value={username}
                                name={"username"}
                                onChange={handleChange}
                                errorMessage={errors.username}
                                placeholder={"Имайл хаяг/Утасны дугаар"}
                                type={"text"}
                                labelStyle={"block text-sm  text-black"}
                                className={"h-c9 border border-gray-300 bg-caak-titaniumwhite"}
                            />
                            <Input
                                value={password}
                                name={"password"}
                                onChange={handleChange}
                                errorMessage={errors.password}
                                type={"password"}
                                placeholder={"Нууц үг"}
                                className={"border w-full border-caak-titaniumwhite w-ce h-c9 bg-caak-liquidnitrogen"}
                            />

                            <Input
                                value={passwordRepeat}
                                name={"passwordRepeat"}
                                onChange={handleChange}
                                errorMessage={errors.passwordRepeat}
                                type={"password"}
                                placeholder={"Нууц үгээ давтан оруулна уу"}
                                className={"border w-full border-caak-titaniumwhite w-ce h-c9 bg-caak-liquidnitrogen"}
                            />
                        </div>
                        <Button
                            onClick={() => handleSubmit()}
                            className={`
                                mt-c3 w-full 
                                h-c9 
                                text-17px 
                                font-bold 
                                ${isValid ? "bg-caak-primary text-white" : "bg-caak-titaniumwhite text-caak-shit"}
                                rounded-lg
                            `}
                        >
                            Бүртгүүлэх
                        </Button>
                        <p className="text-12px pt-b1 text-caak-aleutian">
                            Таны овог нэр, Төрсөн он сар болон Нууц үг нийтэд харагдахгүй болно!
                        </p>
                    </div>

                    {/*Footer*/}
                    <div
                        className={
                            "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
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

export default UserInformation;
