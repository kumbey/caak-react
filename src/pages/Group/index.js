import React, {useState} from 'react'
import Button from '../../components/button'
import Card from '../../components/card'

export default function Group() {
    const [data] = useState(new Array(9).fill(""))
    const [pro] = useState(new Array(10).fill(""))

    return (
        <div>
            <div className="bg-white relative justify-center h-c18">
                <img alt="cover" className="w-full  h-c17 bg-caak-blue"/>

                {/* menu */}
                <div className="absolute  bottom-b3 2xl:left-cf 2xl:right-cf xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">
                    <div className="flex justify-between">
                        <div className="flex  items-end">
                            <img alt="profile" className="w-c19 bg-caak-red h-c19 rounded rounded-lg"/>
                            <div className="ml-c6">
                                <div>
                                    <p className="text-26px font-bold text-caak-generalblack">Монгол өв уламжлал</p>
                                </div>
                                <div className="flex items-center  btn:grid">
                                    <div>
                                        <span className="icon-fi-rs-megaphone text-16px text-caak-darkBlue flex"/>
                                        <p className="text-15px ml-a1 text-caak-darkBlue">Нээлттэй бүлэг</p>
                                    </div>
                                    <p className="mx-a1">·</p> 
                                    <p className="text-15px text-caak-darkBlue">245k гишүүнтэй</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex ph:w-c14 btn:grid btn:justify-center items-end">
                            <Button className="ph:mb-b1 h-c13 text-15px rounded rounded-lg bg-caak-titaniumwhite text-caak-generalblack"> 
                                <span className="icon-fi-rs-check text-12px mr-a1"/>
                                Нэгдсэн
                            </Button>
                            <Button className="h-c13 text-15px rounded rounded-lg bg-caak-generalblack ml-b1"> 
                                <span className="icon-fi-rs-link text-15px mr-a1"/>
                                Найзаа урих
                            </Button>
                            <div className="flex btn:justify-end">
                                <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                                    <span className="icon-fi-rs-notification text-caak-generalblack shadow text-18px rounded rounded-lg px-b4 py-b1 flex"/>
                                </div>
                                <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                                    <span className="icon-fi-rs-settings text-caak-generalblack shadow text-18px rounded rounded-lg px-b4 py-b1 flex"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* body */}
            <div className="2xl:flex sm:flex md:flex lg:flex xl:flex md:flex">

                {/* sideBar */}
                <div className="mt-c24 ml-c3 2xl:w-c22 md:w-c17">

                    {/* admin */}
                    <div className="h-c23">
                        <p className="text-17px font-bold text-caak-generalblack">Админ тохиргоо</p>
                        <div className="flex items-center mt-b5 cursor-pointer">
                            <span className="icon-fi-rs-pending text-16px flex mr-a2 bg-caak-titaniumwhite p-b2 rounded rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-bold mr-c6">Хүлээгдэж буй фостууд</p>
                            <p className="text-13px text-caak-bleudefrance bg-caak-bleudefrance px-b3 rounded-lg bg-opacity-20 font-bold">4</p>
                        </div>
                        <div className="flex items-center mt-b2 cursor-pointer">
                            <span className="icon-fi-rs-archive text-16px flex mr-a2 bg-caak-titaniumwhite p-b2 rounded rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-bold">Архивлагдсан фостууд</p>
                        </div>
                        <div className="flex items-center mt-b2 cursor-pointer">
                            <span className="icon-fi-rs-stats text-16px flex mr-a2 bg-caak-titaniumwhite p-b2 rounded rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-bold">Статистик</p>
                        </div>
                        <div className="flex items-center mt-b2 cursor-pointer">
                            <span className="icon-fi-rs-settings-f text-16px flex mr-a2 bg-caak-titaniumwhite p-b2 rounded rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-bold">Тохиргоо</p>
                        </div>
                    </div>

                    {/* description */}
                    <div className="mt-c13">
                        <p className="text-17px font-bold text-caak-generalblack">Бүлгийн тухай</p>
                        <p className="text-15px text-caak-generalblack mt-b1">Монгол өв соёлыг өвлөн үлдэхийн төлөө энэхүү бүлгийг үүсгэсэн.</p>
                        <p onClick={() =>alert("checking")} className="text-15px text-caak-primary mt-c6 cursor-pointer">Дэлгэрэнгүй танилцах</p>
                    </div>

                    {/* top members */}
                    <div className="mt-c13">
                        <p className="text-17px text-caak-generalblack font-bold">Шилдэг гишүүнүүд</p>
                        <div className="grid grid-cols-5 gap-b1 2xl:w-c26 mt-c6 md:w-c12">
                            {
                                pro.map((data, index) => {
                                    return(
                                        <img key={index} alt="" className="h-c25 w-c25 bg-caak-red rounded rounded-full cursor-pointer" />
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* suggested */}
                    <div className="mt-c27">
                        <p className="text-17px font-bold text-caak-generalblack">Танд санал болгох бүлгүүд</p>
                        <div className="flex mt-c6 items-center">
                            <img alt="" className="h-c13 w-c13 bg-caak-red rounded rounded-lg"/>
                            <div className="ml-a3">
                                <p className="text-15px font-bold text-caak-generalblack cursor-pointer">Mongolian Gamers</p>
                                <p className="text-14px text-caak-darkBlue">25 гишүүн</p>
                            </div>
                        </div>
                        <div className="flex mt-c6 items-center">
                            <img alt="" className="h-c13 w-c13 bg-caak-red rounded rounded-lg"/>
                            <div className="ml-a3">
                                <p className="text-15px font-bold text-caak-generalblack cursor-pointer">Mongolian Gamers</p>
                                <p className="text-14px text-caak-darkBlue">25 гишүүн</p>
                            </div>
                        </div>
                        <div className="flex mt-c6 items-center">
                            <img alt="" className="h-c13 w-c13 bg-caak-red rounded rounded-lg"/>
                            <div className="ml-a3"> 
                                <p className="text-15px font-bold text-caak-generalblack cursor-pointer">Mongolian Gamers</p>
                                <p className="text-14px text-caak-darkBlue">25 гишүүн</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* post */}
                <div className="mt-c11 2xl:absolute 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">

                    {/* header */}
                    <div className="bg-white h-c29 rounded rounded-lg flex items-center justify-between pr-b5">
                        <img alt="" className="h-c28 w-c28 bg-caak-red rounded rounded-full ml-c3"/>
                        <div className="2xl:w-cg xl:w-cc md:w-ci ml-c6">
                            <p onClick={() => alert("yu ch hiigd bgan")} className="text-15px text-caak-darkBlue flex items-center w-full h-c30 bg-caak-liquidnitrogen rounded-lg pl-b1 hover:bg-gray-200 cursor-pointer">Энэ бүлэгт фост нийтлэх...</p>
                        </div>
                        <div className="flex ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-image mr-a2 text-22px text-caak-algalfuel"/>
                            <p className="text-15px text-caak-blue">Зураг/Видео</p>
                        </div>
                        {/*<div className="flex items-center  ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-link pr-a2 text-20px text-caak-bleudefrance"/>
                            <p className="text-15px text-caak-blue">Линк</p>
                        </div>*/}
                    </div>

                    {/* navigator */}
                    <div className="flex justify-between mt-c2 items-center">
                        <div className="flex">
                            <Button className="bg-white text-15px font-bold w-c31 h-c32 text-caak-primary flex justify-center items-center mr-a1 rounded-lg shadow hover:bg-caak-titaniumwhite">Трэнд</Button>
                            <Button className="text-15px font-bold w-c7 h-c32 text-caak-generalblack flex justify-center items-center mr-a1 rounded-lg bg-transparent hover:bg-caak-titaniumwhite">Шинэ</Button>
                            <Button className="text-15px font-bold w-c7 h-c32 text-caak-generalblack flex justify-center items-center rounded-lg bg-transparent hover:bg-caak-titaniumwhite">Шилдэг</Button>
                        </div>
                        <select className="text-15px text-caak-generalblack font-semibold cursor-pointer border-0 bg-transparent">
                            <option>Шинэ фостууд</option>
                            <option>Тйреырбйыр</option>
                            <option>йыөүйзшыбаөүк</option>
                        </select>
                    </div>

                    {/* contents */}
                    <div className="2xl:grid 2xl:grid-cols-3 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 gap-c11 mt-b4">
                        {
                            data.map((data, index) => {
                                return(
                                    <Card key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
