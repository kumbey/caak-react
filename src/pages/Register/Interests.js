import {useState, useEffect} from "react";
import Button from "../../components/button";
import Backdrop from "../../components/Backdrop";
import { closeModal } from "../../Utility/Util";
import { useHistory, useLocation } from "react-router";


const items = [
    {
        id: 1,
        icon: "icon-fi-rs-world",
        title: "Спорт"
    },
    {
        id: 2,
        icon: "icon-fi-rs-world",
        title: "Технологи"
    },
    {
        id: 3,
        icon: "icon-fi-rs-world",
        title: "Хөгжилтэй"
    },
    {
        id: 4,
        icon: "icon-fi-rs-world",
        title: "Хоол"
    },
    {
        id: 5,
        icon: "icon-fi-rs-world",
        title: "Аялал"
    },
    {
        id: 6,
        icon: "icon-fi-rs-world",
        title: "Түүх"
    },
    {
        id: 7,
        icon: "icon-fi-rs-world",
        title: "Шинжлэх ухаан"
    },
    {
        id: 8,
        icon: "icon-fi-rs-world",
        title: "Гоо сайхан"
    },
    {
        id: 9,
        icon: "icon-fi-rs-world",
        title: "Урлаг"
    },
    {
        id: 10,
        icon: "icon-fi-rs-add",
        title: "Дуу хөгжим"
    },
    {
        id: 11,
        icon: "icon-fi-rs-back",
        title: "Авто машин"
    }
]

export default function Interests() {
    const history = useHistory();
    const { state } = useLocation();
    const [selected, setSelected] = useState([])
    useEffect(() => {
        console.log(selected)
    }, [selected])

    const selectHandler = (index, title)=> {
        setSelected([...selected, title])
        selected.map((item) => {
            if(item === title){
                const filtered =  selected.filter(item=>item !== title)
                setSelected(filtered)
            }
            else {
                setSelected([...selected, title])
            }
        })
    }
    return (
        <Backdrop className="flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-screen sm:w-cc">
                <div className="px-2 sm:px-10 bg-white rounded-lg shadow-xl pb-c1">
                    <div onClick={() => closeModal(history, state)} className="relative pt-c6">
                        <span className="icon-fi-rs-close absolute right-0 text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center items-center rounded-full cursor-pointer"/>
                    </div>
                    <div className={"flex justify-center mb-c2 font-bold text-24px pt-c5 "}>
                        Миний сонирхол
                    </div>
                    <div style={{maxWidth: '360px'}} className={"flex text-caak-darkBlue mb-c2 text-15px text-center"}>
                        Та өөрийн дуртай сонирхлуудыг сонгосноор өөрийн хүрээллийг хурдан олох боломжтой.
                    </div>
                    <div className="flex flex-row flex-wrap items-center justify-center">
                        {
                            items.map((data, index) => {
                                return (
                                    <div key={index} onClick={(e) => selectHandler(index, data.title)} className={`mt-3 ml-2 flex border py-a2 rounded-full justify-center cursor-pointer px-b5 ${selected.find((item)=> item===data.title) ? "bg-caak-primary text-white" : ""}`}>
                                    <span className={`mr-1.5 text-20px ${data.icon}`}/>
                                    <p className="text-15px font-medium">{data.title}</p>
                                </div>
                                )
                            }
                            
                            )
                        }
                    </div>
                    <p className="text-center mt-5 text-caak-primary text-15px">Хамгийн багадаа 3-ыг сонгоно уу!</p>
                    <div
                        className={
                            "signFooter flex self-end justify-center border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20"
                        }
                    >
                        <Button className="w-full">Үргэлжлүүлэх</Button>
                    </div>
                </div>
            </div>
        </Backdrop>
    )
}
