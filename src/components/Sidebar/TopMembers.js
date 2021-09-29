import { useState } from "react"
export default function TopMembers() {
    const [pro] = useState(new Array(10).fill(""))
    return (
        <div className="mt-c13">
                        <p className="text-17px text-caak-generalblack font-bold">Шилдэг гишүүнүүд</p>
                        <div className="grid grid-cols-5 gap-b1 2xl:w-c26 mt-c6 md:w-c12">
                            {
                                pro.map((data, index) => {
                                    return(
                                        <img key={index} alt="" className="h-c25 w-c25 bg-caak-red rounded rounded-full cursor-pointer" />
                                    )
                                })
                            }
                        </div>
                    </div>
    )
}
