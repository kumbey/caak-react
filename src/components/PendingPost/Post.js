import Button from "../button";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useLocation } from "react-router";

export default function Post() {
    const history = useHistory();
    const location = useLocation()
    return (
        <div onClick={() => history.push({pathname: "/check", state: {background: location}})}  className={` flex w-full items-center py-c11 cursor-pointer `}>
                <div className="flex w-1/3 items-center ml-c2">
                    <img alt="" className="h-c7 w-c33 bg-caak-red rounded-lg" />
                    <p className=" ml-c6 text-15px text-caak-generalblack">Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!</p>
                </div>
                <div className="flex justify-between w-2/3">
                    <div className="flex items-center">
                        <img alt="" className="w-c24 h-c24 bg-caak-red rounded-full" />
                        <p className="ml-a3 text-15px text-caak-generalblack">Tulgaa</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-15px text-caak-generalblack">30мин өмнө</p>
                    </div>
                    <div className="2xl:flex xl:flex md:grid items-center">
                        <Button className="bg-caak-bleudefrance text-15px text-white w-c132">Зөвшөөрөх</Button>
                        <Button className="bg-white text-caak-generalblack text-15px ml-b1 border w-c14">Татгалзах</Button>
                        <FontAwesomeIcon 
                            icon={faEllipsisH}
                            className="ml-c32 cursor-pointer mr-c2"
                        
                        />
                    </div>
                </div>
        </div>
    )
}
