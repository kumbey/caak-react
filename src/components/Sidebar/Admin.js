import { useHistory } from "react-router"

export default function Admin() {
    const history = useHistory();
    return (
        <div className="h-c23">
                        <p className="text-17px font-bold text-caak-generalblack">Админ тохиргоо</p>
                        <div onClick={() => history.push({pathname: "/purwee"})} className="flex items-center mt-b5 cursor-pointer">
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
                        <div onClick={() => history.push({pathname: "/group/information"})} className="flex items-center mt-b2 cursor-pointer">
                            <span className="icon-fi-rs-settings-f text-16px flex mr-a2 bg-caak-titaniumwhite p-b2 rounded rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-bold">Тохиргоо</p>
                        </div>
                    </div>
    )
}
