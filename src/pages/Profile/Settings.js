import { useState } from "react"
import { useHistory } from "react-router"
import Button from "../../components/button"
import Switch from "./Switch";
import Informations from "./Informations";

const data = [
    {
        id: 1,
        icon : <span className="icon-fi-rs-profile text-24px"/>,
        title: "Хувийн мэдээлэл"
    },
    {
        id: 2,
        icon : <span className="icon-fi-rs-social text-22px"/>,
        title: "Сошиал холболтууд"
    },
    {
        id: 3,
        icon : <span className="icon-fi-rs-settings text-22px"/>,
        title: "Сайтын тохиргоо"
    },
    {
        id: 4,
        icon : <span style={{paddingRight: "3px"}} className="icon-fi-rs-lock text-24px"/>,
        title: "Нууцлал"
    },
]


export default function Settings() {

    const history = useHistory();

    const image = "https://64.media.tumblr.com/811c45f404aca73d87250678b55f1028/tumblr_pjbxaqvVYh1uhzhfj_400.jpg"
    
    const [activeIndex, setActiveIndex] = useState(1);

    return (
    <div style={{marginTop: "36px"}} className="grid justify-center">
        <div className='flex items-center'>
            <span onClick={() => history.goBack()} className="icon-fi-rs-back bg-caak-titaniumwhite rounded-full flex items-center justify-center cursor-pointer" style={{height: "48px", width: "48px"}}/>
            <img className="rounded-full" alt="" style={{height: "52px", width: "52px", marginLeft: "20px", marginRight: "8px"}} src={image}/>
            <p style={{marginRight: "8px"}} className='text-24px font-medium'>Оюунэрдэнэ Батдорж</p>
            <p className='text-18px'>@oyunerdene</p>
        </div>
        <div className="flex">
            <div style={{marginTop: "34px", height: '217px'}} className="bg-white rounded-lg pl-c3 pr-c60">
                    {
                        data.map(( {icon, title, id}) => (
                            <div
                                key={id} 
                                onClick={() => setActiveIndex(id)} 
                                style={{marginTop: "24px"}}  
                                className={`flex items-center cursor-pointer
                                    ${ id === activeIndex
                                        ? "text-caak-primary"
                                        : "text-caak-generalblack"
                                    }`
                                }
                            >
                                {icon}
                                <p className="text-17px font-medium ml-b1">{title}</p>
                            </div>
                            
                        ))
                    }
            </div>
            <div style={{width: "609px", marginLeft: "19px", marginTop: "34px"}} className='bg-white rounded-lg'>
                <div style={{ paddingBottom: "65px"}} className={`${activeIndex === 1 ? "block" : "hidden"}`}>
                    <Informations/>
                    
                </div>
                <div style={{ paddingBottom: "65px"}} className={`${activeIndex === 2 ? "block" : "hidden"}`}>
                    <p className='font-medium' style={{marginLeft: "30px", marginTop: "30px", fontSize: "24px"}}>Сошиал холболтууд</p>
                    <div style={{marginTop: "21px"}} className="mx-c3 pb-c60">
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <div className='flex items-center'>
                            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px"/>
                            <p style={{marginLeft: "22px"}} className="text-16px font-medium">Instagram</p>
                        </div>
                        <Button style={{width: "75px"}} className='rounded-full bg-caak-bleudefrance text-12px h-c2'>Холбох</Button>
                    </div>
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <div className='flex items-center'>
                            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px"/>
                            <p style={{marginLeft: "22px"}} className="text-16px font-medium">Facebook</p>
                        </div>
                        <Button style={{width: "75px"}} className='rounded-full bg-caak-bleudefrance text-12px h-c2'>Холбох</Button>
                    </div>
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <div className='flex items-center'>
                            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px"/>
                            <p style={{marginLeft: "22px"}} className="text-16px font-medium">Tiktok</p>
                        </div>
                        <Button style={{width: "75px"}} className='rounded-full bg-caak-bleudefrance text-12px h-c2'>Холбох</Button>
                    </div>
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <div className='flex items-center'>
                            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px"/>
                            <p style={{marginLeft: "22px"}} className="text-16px font-medium">Twitter</p>
                        </div>
                        <Button style={{width: "75px"}} className='rounded-full bg-caak-bleudefrance text-12px h-c2'>Холбох</Button>
                    </div>
                    </div>
                </div>
                <div style={{ paddingBottom: "52px"}} className={`${activeIndex === 3 ? "block" : "hidden"}`}>
                    <p className='font-medium' style={{marginLeft: "30px", marginTop: "30px", fontSize: "24px"}}>Сайтын тохиргоо</p>
                    <div style={{marginTop: "21px"}} className="mx-c3 border-b">
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <p className='font-medium text-16px'>Видео бичлэгийг автоматаар тоглуулах</p>
                        <Switch/>
                    </div>
                    </div>
                </div>
                <div className={`${activeIndex === 4 ? "block" : "hidden"}`}>
                    <p className='font-medium' style={{marginLeft: "30px", marginTop: "30px", fontSize: "24px"}}>Нууцлал</p>
                    <div style={{marginTop: "21px"}} className="mx-c3">
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <p className='font-medium text-16px'>Элссэн группуудыг ил харуулах</p>
                        <Switch/>
                    </div>
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <p className='font-medium text-16px'>Миний үүсгэсэн группуудыг ил харуулах</p>
                        <Switch/>
                    </div>
                    <div style={{paddingBlock: "14px"}} className='w-full flex items-center justify-between border-b'>
                        <p className='font-medium text-16px'>Нууц үгээ шинэчлэх</p>
                        <span className="icon-fi-rs-pencil text-caak-darkBlue cursor-pointer"/>
                    </div>
                    <div style={{marginTop: "60px", paddingBottom: "22px"}} className='flex justify-end items-center text-caak-red cursor-pointer'>
                        <span className="icon-fi-rs-delete text-15px"/>
                        <p className="text-15px ml-a1 font-medium">Бүртгэлээ устгах</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
