import React from 'react';
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import Divider from "../../components/divider";
import Input from "../../components/input";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';


const Login = () => {
    library.add(faFacebook, faGoogle);
    return (
        <Backdrop>
            <div className=" sm:mx-auto sm:w-full sm:max-w-md flex  items-center justify-center py-6 min-w-max">
                <div
                    className="sm:h-full h-screen sm:w-full  w-screen relative bg-white py-8 px-10 shadow-xl rounded-lg h-full loginCard min-w-max">
                    <div className={"cursor-pointer relative"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-0" fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                    <div className={"flex justify-center align-center py-8"}>
                        <span className={"font-black text-4xl"}>Нэвтрэх</span>
                    </div>
                    {/*Social Buttons*/}
                    <div className={"flex flex-col justify-center"}>
                        <Button
                            onClick={() => null}
                            icon={<FontAwesomeIcon size={"lg"} className={"text-white mr-2"} icon={faFacebook}/>}
                            rounded
                            background={"bg-facebook"}
                            text={"text-white"}
                            className={"p-1 hover:bg-facebook-hover border border-transparent justify-center text-base font-bold mb-2 rounded-md"}
                            iconPosition={"left"}
                        >Facebook-ээр нэвтрэх
                        </Button>
                        <Button
                            onClick={() => null}
                            icon={<FontAwesomeIcon size={"lg"} className={"text-primary mr-2"} icon={faGoogle}/>}
                            rounded
                            background={"bg-white"}
                            text={"text-black"}
                            className={"p-1 hover:bg-gray-100 border border-gray-200  justify-center text-base font-bold mb-2 rounded-md"}
                            iconPosition={"left"}
                        >Gmail-ээр нэвтрэх</Button>
                    </div>
                    <Divider textSize={"text-base font-light"} textColor={"text-gray-500"} color={"bg-gray-100"}
                             text={"эсвэл"}
                             className={"my-4 font-light"}
                    />
                    {/*Login Form*/}
                    <form className="space-y-6" action="/" method="POST">
                        <Input errorMessage={"Имэйл бүртгэлтэй байна"} label={<div><span className={"font-bold"}>Имэйл хаяг</span> эсвэл <span
                            className={"font-bold"}>Утасны дугаар</span></div>}
                               labelStyle={"block text-base font-medium text-black mb-3"}
                               placeholder={"example@mail.com"}
                               className={"py-3 pr-3 border border-gray-300"}
                        />
                        <Input label={<div className={"flex flex-row justify-between items-center"}><b
                        >Нууц үг</b><a href={"/"}><span
                            className={"underline  font-medium text-primary hover:text-primary-hover"}>Нууц үгээ мартсан уу?</span></a>
                        </div>}
                               labelStyle={"block text-base font-medium text-black mb-3"}
                               placeholder={"Таны нууц үг"}
                               className={"py-3 pr-3 border border-gray-300"}
                        />

                        <div>
                            <Button type={"submit"} rounded primary
                                    background={"bg-primary text-white w-full py-4 font-bold justify-center rounded-lg hover:bg-primary-hover"}>Нэвтрэх</Button>
                        </div>
                        <div className="text-base text-center">
                            <span className={"text-gray-primary"}>Хэрэв та элсээгүй бол </span>
                            <a href="/"
                               className="font-bold text-primary  hover:text-primary-hover"> "Бүртгүүлэх"</a>

                        </div>
                    </form>
                    {/*Footer*/}
                    <div
                        className={"flex justify-center items-center divide-x divide-gray-primary divide-opacity-20 text-sm pt-10"}>
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
    )
};

export default Login;