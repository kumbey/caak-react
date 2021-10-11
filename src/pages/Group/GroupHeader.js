import { useState } from "react";
import Button from "../../components/button";
import { generateFileUrl } from "../../Utility/Util";

export default function GroupHeader({group}) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const totalMembers = () => {
        return parseInt(group.totals.admin) + parseInt(group.totals.moderator) + parseInt(group.totals.moderator);
    }

    return (
        <div>
            <img alt="cover" src={generateFileUrl(group.cover)}  className="w-full  h-c17 bg-caak-blue"/>

            {/* menu */}
            <div className="absolute  bottom-b3 2xl:left-cf 2xl:right-cf xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">
                <div className="flex justify-between">
                    <div className="flex  items-end">
                    <img alt="" src={generateFileUrl(group.profile)} className="w-c19 h-c19 border-4 border-white bg-caak-red rounded-lg"/>
                        <div className="ml-c6">
                        <div>
                    <p className="text-26px font-bold text-caak-generalblack">{group.name}</p>
                </div>
                <div className="flex items-center btn:grid">
                    <div className="flex items-center">
                        <span className="icon-fi-rs-world text-16px text-caak-darkBlue flex"/>
                        <p className="text-15px ml-a1 text-caak-darkBlue">Нээлттэй бүлэг</p>
                    </div>
                    <p className="mx-a1">·</p> 
                    <p className="text-15px text-caak-darkBlue">
                        {
                            totalMembers() 
                        }
                        {` гишүүнтэй`}
                    </p>
                </div>
            </div>
        </div>
        <div className="md:hidden lg:hidden flex">
            
{/* Mobile menu button */}
<button
onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
className="text-caak-generalblack hover:text-white hover:bg-caak-darkBlue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white inline-flex items-center justify-center p-2 rounded-md"
>
<span className="sr-only">Open main menu</span>
{isMobileMenuOpen ? (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>
) : (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M4 6h16M4 12h16M4 18h16"
  />
</svg>
)}
</button>
</div>
        <div className="flex btn:grid items-end">
            <Button className="ph:mb-b1 h-c13 text-15px rounded rounded-lg bg-caak-titaniumwhite text-caak-generalblack"> 
                <span className="icon-fi-rs-check text-12px mr-a1"/>
                {group.followed ? `Нэгдсэн`:`Нэгдэх` }
            </Button>
            {/* <Button className="h-c13 text-15px rounded rounded-lg bg-caak-generalblack ml-b1"> 
                <span className="icon-fi-rs-link text-15px mr-a1"/>
                Найзаа урих
            </Button> */}
            <div className="flex btn:justify-end">
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
        </div>
    )
}
