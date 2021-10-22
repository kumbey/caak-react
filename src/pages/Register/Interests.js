import {useState, useEffect} from "react";
import Button from "../../components/button";
import Backdrop from "../../components/Backdrop";
import { closeModal } from "../../Utility/Util";
import { useHistory, useLocation } from "react-router";


const items = [
    {
        icon: "icon-fi-rs-ig",
        title: "Спорт"
    },
    {
        icon: "icon-fi-rs-fb",
        title: "Технологи"
    },
    {
        icon: "icon-fi-rs-tiktok",
        title: "Хөгжилтэй"
    },
    {
        icon: "icon-fi-rs-social",
        title: "Хоол"
    },
    {
        icon: "icon-fi-rs-lock-f",
        title: "Аялал"
    },
    {
        icon: "icon-fi-rs-star",
        title: "Түүх"
    },
    {
        icon: "icon-fi-rs-auro",
        title: "Шинжлэх ухаан"
    },
    {
        icon: "icon-fi-rs-image",
        title: "Гоо сайхан"
    },
    {
        icon: "icon-fi-rs-world",
        title: "Урлаг"
    },
    {
        icon: "icon-fi-rs-add",
        title: "Дуу хөгжим"
    },
    {
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

    const selectHandler = (index, title) => {

        if(selected.length === 0) setSelected([...selected, title])

        if(selected.includes(title)){
            setSelected(selected.filter(item => item !== title))
        }
        else {
            setSelected([...selected, title])
        }
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
                    <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                        {
                            items.map((data, index) => {
                                return (
                                    <div 
                                        key={index} 
                                        onClick={(e) => selectHandler(index, data.title)} 
                                        className={`
                                            flex items-center border py-px-6 rounded-full justify-center cursor-pointer px-c6 
                                            ${selected.find((item)=> item===data.title) ? "bg-caak-primary text-white" : ""}
                                        `}
                                    >
                                        {selected.find((item)=> item===data.title)
                                            ? 
                                            <span className="icon-fi-rs-check text-12px mr-1.5" /> 
                                            : 
                                            <span className={`mr-1.5 text-18px ${data.icon}`}/>
                                        }
                                        <p className="text-15px font-medium">{data.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                
                         <p className={`${selected.length < 3 ? "opacity-100" : "opacity-0"} text-center mt-5 text-caak-primary text-15px`}>Хамгийн багадаа 3-ыг сонгоно уу!</p>
                
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
