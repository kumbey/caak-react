import { useHistory, useLocation } from "react-router";
import { useState } from "react";
<<<<<<< Updated upstream
import Shitt from "./Shitt";
=======
import Shitt from "./shitt";
>>>>>>> Stashed changes

export default function Post() {
    const history = useHistory();
    const location = useLocation()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className={`relative flex w-full items-center py-c11 cursor-pointer `}>
                <div onClick={() => history.push({pathname: "/check", state: {background: location}})} className="flex w-1/2 items-center ml-c2">
                    <img alt="" className="h-c7 w-c33 bg-caak-red rounded-lg" />
                    <p className=" ml-c6 text-15px text-caak-generalblack">Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!</p>
                </div>
                <div className="flex w-1/2 ml-c4">
                    <div className="flex w-1/2 items-center"> 
                        <img alt="" className="w-c24 h-c24 bg-caak-red rounded-full" />
                        <p className="ml-a3 text-15px text-caak-generalblack">Tulgaa</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-15px text-caak-generalblack">30мин өмнө</p>
                    </div>
                </div>
                <div className="sm:hidden  lg:hidden block">
                    {/* Mobile menu button */}
                    <span
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-caak-generalblack border-0 flex p-b2 justify-center rounded-md"
                    >
                        {isMobileMenuOpen ? (
                            <span className="cursor-pointer icon-fi-rs-dots text-4px"/>
                        ) : (
                            <span className="cursor-pointer icon-fi-rs-dots text-4px"/>
                        )}
                    </span>
                </div>
                <div  
                    className={`${
                        isMobileMenuOpen ? "block" : "hidden"
                    }`}
                    id="mobile-menu"
                >
                    <div className=" flex items-center justify-center">
                        <div className={`relative `}>
                            <Shitt/>
                        </div>
                    </div>
                </div>
        </div>  
    )
}
