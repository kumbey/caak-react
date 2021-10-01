import Button from "../button";
import { useHistory, useLocation } from "react-router";

export default function TestPost() {
    const history = useHistory();
    const location = useLocation()
    return (
        
            <table onClick={() => history.push({pathname: "/check", state: {background: location}})} className="flex items-center table-fixed w-full bg-caak-red py-c11 cursor-pointer">
  <tbody className="w-full bg-caak-blue">
        <td className="w-1/2">
    <div className="flex items-center ml-c2">
                    <img alt="" className="h-c7 w-c33 bg-caak-red rounded-lg" />
                    <p className=" ml-c6 text-15px text-caak-generalblack">Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!</p>
                </div>
                </td>
                <td>
                <div className="flex items-center"> 
                        <img alt="" className="w-c24 h-c24 bg-caak-red rounded-full" />
                        <p className="ml-a3 text-15px text-caak-generalblack">Tulgaa</p>
                    </div>
                    </td>
                    <td>
                    <div className="flex items-center">
                        <p className="text-15px text-caak-generalblack">30мин өмнө</p>
                    </div>
                    </td>
                    <td>
                    <div className="2xl:flex xl:flex md:grid items-center">
                        <Button className="bg-caak-bleudefrance text-15px text-white w-c132">Зөвшөөрөх</Button>
                        <Button className="bg-white text-caak-generalblack text-15px ml-b1 border w-c14">Татгалзах</Button>
                        <span className="ml-c32 cursor-pointer mr-c2 icon-fi-rs-dots text-4px"/>
                    </div>
                    </td>
    
    
  </tbody>
</table>
    )
}
