export default function Suggest({title, className}) {
    return (
        <div className="mt-c27">
                        <p className={`${className ? className : "text-17px font-bold text-caak-generalblack" }`}>{title}</p>
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
    )
}
