import React from 'react';
import Backdrop from "../../components/Backdrop";

const Confirmation = ({email}) => {
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
                        <span className={"font-bold text-2xl"}>Баталгаажуулах</span>
                    </div>

                    <div className={"py-2"}><span className={"text-sm"}>{email}</span></div>
                    <div className={"py-2"}>
                        <span>Баталгаажуулах код</span>
                        <div id="divOuter">
                            <div id="divInner">
                                <input id="partitioned" type="text" maxLength="6"
                                       onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}
                                       onKeyPress={(e) => {
                                           if (e.target.value.length === 6) return false
                                       }}/>
                            </div>
                        </div>

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

export default Confirmation;