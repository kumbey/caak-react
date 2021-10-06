import React, {useState} from 'react'
import Admin from '../../components/Sidebar/Admin'
import Button from '../../components/button'
import PostPending from './PostPending';
import { useHistory } from 'react-router';
import { generateFileUrl } from '../../Utility/Util';

export default function PendingPostAdmin() {
    const history = useHistory();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div>
            <div className="bg-white relative justify-center h-c18">
                <img alt="" className="w-full  h-c17 bg-caak-blue"/>

                {/* menu */}
                <div className="absolute  bottom-b3 2xl:left-cf 2xl:right-cf xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">
                    <div className="flex justify-between">
                        <div className="flex  items-end">
                            <img alt="" className="w-c19 h-c19 border-4 border-white bg-caak-red rounded-lg"/>
                            <div className="ml-c6">
                                <div>
                                    <p className="text-26px font-bold text-caak-generalblack">Монгол өв уламжлал</p>
                                </div>
                                <div className="flex items-center  btn:grid">
                                    <div className="flex items-center">
                                        <span className="icon-fi-rs-world text-16px text-caak-darkBlue flex"/>
                                        <p className="text-15px ml-a1 text-caak-darkBlue">Нээлттэй бүлэг</p>
                                    </div>
                                    <p className="mx-a1">·</p> 
                                    <p className="text-15px text-caak-darkBlue">245k гишүүнтэй</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden lg:hidden flex">
                            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-caak-generalblack hover:text-white hover:bg-caak-darkBlue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white inline-flex items-center justify-center p-2 rounded-md"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
                        <div className="flex btn:grid items-end">
                            <Button className="ph:mb-b1 h-c13 text-15px rounded rounded-lg bg-caak-titaniumwhite text-caak-generalblack"> 
                                <span className="icon-fi-rs-check text-12px mr-a1"/>
                                Нэгдсэн
                            </Button>
                            <Button className="h-c13 text-15px rounded rounded-lg bg-caak-generalblack ml-b1"> 
                                <span className="icon-fi-rs-add text-15px mr-a1"/>
                                Найзаа урих
                            </Button>
                            <div className="flex btn:justify-end">
                                <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                                    <span className="icon-fi-rs-notification text-caak-generalblack shadow text-18px rounded rounded-lg px-b4 py-b1 flex"/>
                                </div>
                                <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                                    <span className="icon-fi-rs-dots text-caak-generalblack shadow h-full items-center text-4px rounded rounded-lg px-b4 py-b1 flex"/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* body */}
            <div className="2xl:flex sm:grid md:flex lg:flex xl:flex">

                {/* sideBar */}
                <div className="mt-c24 ml-c3 2xl:w-c22 md:w-c17 grid justify-center">
                    <div style={{marginBlockEnd: "23px"}}>
                        <p className="text-17px font-bold text-caak-generalblack">Бүлэг руу буцах</p>
                        <div onClick={() => history.push({pathname: "/group"})} className="flex items-center mt-b5 cursor-pointer">
                            <img alt="" src={generateFileUrl()} className="bg-caak-red h-c37 w-c37 rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-medium ml-a2">Монгол өв уламжлал</p>
                        </div>
                    </div>

                    {/* admin */}
                    <Admin/>

                </div>

                {/* post */}
                <div className=" rounded-lg bg-white mt-c11 2xl:absolute 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">

                    {/* navigator */}
                    <div className="flex justify-between  items-center p-c11">
                        <div className="flex items-center">
                            <p className="text-18px text-caak-generalblack font-medium">Хүлээгдэж буй фостууд</p>
                            <p style={{marginLeft: '6px'}} className=" text-13px px-b3 bg-caak-bleudefrance rounded-full text-caak-bleudefrance bg-opacity-20">4</p>
                        </div>
                        <select className="shadow rounded-lg text-15px text-caak-generalblack font-medium cursor-pointer border-0 ">
                            <option>Шинэ фостууд</option>
                            <option>Тйреырбйыр</option>
                            <option>йыөүйзшыбаөүк</option>
                        </select>
                    </div>

                    {/* contents */}
                    <div>
                        <PostPending/>
                    </div>
                </div>
            </div>
        </div>
    )
}
