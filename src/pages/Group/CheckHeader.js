import { generateTimeAgo, extractDate } from "../../Utility/Util"
import { getFileUrl } from "../../Utility/Util";
import Dummy from "dummyjs"
export default function CheckHeader({itemTitle, updatedAt, user }) {
    const date = extractDate(updatedAt);
    console.log(user)
    return (
        <div style={{paddingInline: "30px", paddingBottom: "14px"}} className="mt-c6 justify-between w-full">
            <p style={{maxWidth: '600px'}} className="text-18px text-caak-generalblack">{itemTitle}</p>
            <div className="flex items-center justify-between my-c6">
                <div className="flex items-center">
                    <img alt="" src={user.pic_id ? getFileUrl(user?.pic_id) : Dummy.img("100x100")}className="h-c13 w-c13 rounded-full"/>
                    <p>{user.firstname}</p>
                </div>
                <div className={"text-caak-darkBlue text-14px pt-2"}>
                    {generateTimeAgo(updatedAt)} ·{" "}
                    {`${date.year}/${date.month}/${date.day}`}
                </div>
            </div>
        </div>
    )
}
