import Button from "../button";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

export default function Post() {
    const history = useHistory();
    return (
        <div className={`flex items-center py-c11 cursor-pointer `}>
            <div className="flex w-full">
                <div className="flex items-center ml-c2">
                    <img alt="" className="h-c7 w-c33 bg-caak-red rounded-lg" />
                    <p className="w-ch ml-c6 text-15px text-caak-generalblack">Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!</p>
                </div>
               <div className="flex items-center ml-c3">
                    <img alt="" className="w-c24 h-c24 bg-caak-red rounded-full" />
                    <p className="ml-a3 text-15px text-caak-generalblack">Tulgaa</p>
                </div>
                <div className="flex items-center ml-c35">
                    <p className="text-15px text-caak-generalblack">30мин өмнө</p>
                </div>
                <div className="flex items-center" style={{marginLeft: "121px"}}>
                    <Button className="bg-caak-bleudefrance text-15px text-white">Зөвшөөрөх</Button>
                    <Button className="bg-white text-caak-generalblack text-15px ml-b1 border">Татгалзах</Button>
                    <FontAwesomeIcon 
                        icon={faEllipsisH}
                        className="ml-c32 cursor-pointer"
                        onClick={() => history.push({pathname: "/check"})} 
                    />
                </div>
            </div>
        </div>
    )
}
