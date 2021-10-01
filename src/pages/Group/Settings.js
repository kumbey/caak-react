import MyDropDown from "../../components/PendingPost/MyDropDown"
import { useState } from "react";
import EditGroup from "./EditGroup";

export default function Settings() {
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="w-full">
            <p style={{marginTop: "30px", marginInline: "30px"}} className="text-24px font-medium text-caak-generalblack">Группын мэдээлэл</p>
            <div style={{marginInline: "30px"}}>
                <div style={{height: "48px", marginTop: "10px"}} className="flex relative justify-between items-center border-b">
                    <p className="text-16px font-medium text-generalblack">Нэр болон тайлбар</p>
                    <span onClick={toggleMenu} className="icon-fi-rs-pencil text-caak-darkBlue cursor-pointer"/>
                    
                </div>
                <MyDropDown
                    className="relative"
                    shadow
                    content={<EditGroup/>}
                    open={isMenuOpen}
                /> 
                <div style={{height: "48px"}} className="flex justify-between items-center border-b">
                    <p className="text-16px font-medium text-generalblack">Группын ID</p>
                    <span className="icon-fi-rs-pencil text-caak-darkBlue cursor-pointer"/>
                </div>
                <div style={{height: "48px", marginBottom: "61px"}} className="flex justify-between items-center border-b">
                    <p className="text-16px font-medium text-generalblack">Төрөл</p>
                    <span className="icon-fi-rs-pencil text-caak-darkBlue cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}
