import Auth from "@aws-amplify/auth";
import {useState} from "react";
import { useHistory, useLocation } from "react-router";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import Input from "../../components/input";
import { useUser } from "../../context/userContext";
import Consts from "../../Utility/Consts";
import { checkUser, checkUsernameType, closeModal } from "../../Utility/Util";
import Validate from "../../Utility/Validate";

export default function Login() {

    const history = useHistory()
    const {state} =  useLocation()
    const { user } = useUser()

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

    async function doSignIn(){
        try{
            setLoading(true)
            let user_name = username

            if(checkUsernameType(user_name) === Consts.typePhoneNumber){
                user_name = "+976"+ user_name
            }

            await Auth.signIn(user_name, password)
            closeModal(history, state)
        }catch(ex){
            if(ex.code === "UserNotConfirmedException"){
                console.log("NEED TO CONFIRM")
            }else if(ex.code === "NotAuthorizedException"){
                setError("Нэврэх нэр эсвэл нууц үг буруу байна")
            }
        }finally{
            setLoading(false)
        }
    }
    
    return ( !checkUser(user) ?
            <Backdrop>
                <div className=" sm:mx-auto pt-40 w-ca sm:max-h-md">
                    <div className=" sm:w-full pb-c1 bg-white rounded-lg shadow-xl">
                        <div className="flex  px-c6 justify-between pt-c6 items-center  cursor-pointer ">
                            <div 
                                onClick={() => history.replace({pathname: "/login", state: state})}
                                className="flex items-center"
                            >
                                <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1"/>
                                <p  className="text-caak-generalblack text-13px">Нэвтрэх сонголт руу буцах</p>
                            </div>
                            <span
                                onClick={() => closeModal(history, state)}
                                className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded-lg"
                            />
                        </div>
                        <div className={"flex text-caak-generalblack justify-center text-center align-center pt-c2 pb-c2 font-bold text-24px"}>
                            Имайл хаяг/Утасны дугаар <br/> нэвтрэх!
                        </div>
                        <div className="px-c8">
                            <p className="error">
                                {error}
                            </p>
                            <Input
                                name={"username"}
                                type={"text"}
                                errorMessage={errors.username}
                                onChange={handleChange}
                                placeholder={"Имайл хаяг эсвэл Утасны дугаар"}
                                className={"border border-caak-titaniumwhite h-c9 bg-caak-liquidnitrogen"}
                            />
                            <div className="flex items-center">
                                <Input
                                    name={"password"}
                                    type={"password"}
                                    errorMessage={errors.password}
                                    onChange={handleChange}
                                    placeholder={"Нууц үг"}
                                    className={"border border-caak-titaniumwhite w-ci h-c9 bg-caak-liquidnitrogen"}
                                />
                            </div>
                        </div>
                        <div className="flex px-c8 justify-between items-center text-caak-generalblack text-14px mt-5">
                                <Button
                                    loading={loading}
                                    onClick={() => handleSubmit(doSignIn)}
                                    className={
                                        "rounded-md w-c10 h-c9 text-17px font-bold bg-caak-secondprimary"
                                    }
                                >   
                                    Нэвтрэх
                                </Button>
                                <p className="cursor-pointer ml-">Нууц үгээ мартсан уу?</p>
                            </div>
                {/*Footer*/}
                <div
                    className={
                        "signFooter flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
                    }
                >
                    <div className="text-caak-blue text-15px">
                        <span>
                            Шинэ хэрэглэгч бол{" "}
                        </span>
                        <a
                            href="/register"
                            className="text-caak-primary text-15px font-bold cursor-pointer"
                        >
                        {" "}
                            Бүртгүүлэх
                        </a>
                        
                    </div>
                    <span className="icon-fi-rs-help text-18px text-caak-darkBlue "/>
            </div>
            </div>
        </div>
        </Backdrop> : null
    )
}
