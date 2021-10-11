import Button from "../../components/button";
import { generateFileUrl } from "../../Utility/Util";

export default function GroupHeader({group}) {

    const totalMembers = () => {
        return parseInt(group.totals.admin) + parseInt(group.totals.moderator) + parseInt(group.totals.moderator);
    }

    return (
        <div className="relative bg-white h-c18 flex justify-center">
            <img alt="cover" src={generateFileUrl(group.cover)} className="w-full h-c17 ph:h-c31"/>

            {/* menu */}
            <div className="flex justify-between absolute xl:bottom-c6 bottom-a1 w-full 2xl:px-cf xl:px-ch lg:px-c12 md:px-c30">
                <div className="flex ph:grid items-center w-full mx-c6">
                    <img alt="" src={generateFileUrl(group.profile)} className="w-c19 h-c19 border-4 border-white bg-caak-red rounded-lg"/>
                        <div className="ml-c6 ph:ml-0">
                            <p className="text-26px ph:text-22px font-bold">
                                {group.name}
                            </p>
                            <div className="flex items-center ph:grid">
                                <div className="flex items-center">
                                    <span className="icon-fi-rs-world text-16px text-caak-darkBlue flex"/>
                                    <p className="text-15px ml-a1 text-caak-darkBlue">Нээлттэй бүлэг</p>
                                </div>
                                <p className="mx-a1 ph:hidden">·</p> 
                                <p className="text-15px text-caak-darkBlue">
                                    {
                                        totalMembers() 
                                    }
                                    {` гишүүнтэй`}
                                </p>
                            </div>
                        </div>
                        <div className="hidden ph:block w-full">
                            <Button className="w-full flex items-center bg-caak-bleudefrance">
                                <span className="icon-fi-rs-add-group-f text-20px"/>
                                <p className="text-16px font-medium ml-b3">
                                Нэгдэх
                                </p>
                            </Button>
                        </div>
                </div>
                <div className="flex ph:grid items-end">
                    <Button className="ph:mb-b1 h-c13 text-15px rounded rounded-lg bg-caak-titaniumwhite text-caak-generalblack"> 
                        <span className="icon-fi-rs-check text-12px mr-a1"/>
                        {group.followed ? `Нэгдсэн`:`Нэгдэх` }
                    </Button>
                    {/* <Button className="h-c13 text-15px rounded rounded-lg bg-caak-generalblack ml-b1"> 
                        <span className="icon-fi-rs-link text-15px mr-a1"/>
                        Найзаа урих
                    </Button> */}
                    <div className="flex">
                        <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                            <span className="icon-fi-rs-notification text-caak-generalblack shadow text-18px rounded rounded-lg px-b4 py-b1 flex"/>
                        </div>
                        <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                            <span className="icon-fi-rs-settings text-caak-generalblack shadow text-18px rounded rounded-lg px-b4 py-b1 flex"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
