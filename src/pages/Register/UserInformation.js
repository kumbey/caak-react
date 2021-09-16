import React from 'react';
import Input from "../../components/input";
import Backdrop from "../../components/Backdrop";
import Select from "../../components/input/Select";

const UserInformation = () => {
    return (
        <Backdrop>
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex sm:py-6 min-w-max h-full ">
                <div
                    className="sm:w-full w-screen relative bg-white py-8 px-10  shadow-xl rounded-lg  loginCard min-w-max">
                    <div className={"cursor-pointer relative"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-0" fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                    <div className={"flex justify-center align-center py-8"}>
                        <span className={"font-bold text-2xl"}>Хэрэглэгчийн мэдээлэл</span>
                    </div>
                    <div>
                        <Input label={"Таныг хэн гэж дуудах вэ?"}
                               labelStyle={"block text-sm  text-black mb-2"}
                               placeholder={"Хэрэглэгчийн нэр"}
                               className={"py-3 pr-3"}
                               type={"text"}
                        />
                    </div>

                    <div className={"flex flex-col"}>
                        <label className={"block text-sm  text-black mb-2"}>
                            Таны төрсөн он сар өдөр
                        </label>
                        <div className={"flex flex-row"}>
                            <Select defaultValue={"1998"} containerStyle={"flex-1"}>
                                <option>1998</option>
                                <option>1999</option>
                                <option>2000</option>
                                <option>2001</option>
                            </Select>
                            <Select defaultValue={"1998"} containerStyle={"flex-1 mx-2"}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Select>
                            <Select containerStyle={"flex-1"}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Select label={"Таны хүйс"} labelStyle={"block text-sm  text-black mb-2 mt-2"} defaultValue={"1998"}
                                containerStyle={"flex-1"}>
                            <option>Эр</option>
                            <option>Эм</option>
                            <option>?</option>
                        </Select>
                    </div>
                    <div>
                        <Input label={"Нууц үг"} type={"password"} labelStyle={"block text-sm  text-black mb-2 mt-2"} className={"py-3 pr-3 border border-gray-300"}/>
                        <Input error errorMessage={"Нууц үг таарахгүй байна"} label={"Нууц үг давтах"} type={"password"} labelStyle={"block text-sm  text-black mb-2 mt-2"} className={"py-3 pr-3 border border-gray-300"}/>
                    </div>
                    <div className="text-base text-center my-2">
                        <span className={"text-gray-primary"}>Хэрэв та бүртгэлтэй бол </span>
                        <a href="/"
                           className="font-bold text-primary  hover:text-primary-hover"> "Нэвтрэх"</a>

                    </div>
                    {/*Footer*/}
                    <div
                        className={"signFooter flex self-end justify-center border-t items-center divide-x divide-gray-primary divide-opacity-20 text-sm py-2 sm:py-3"}>
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

export default UserInformation;