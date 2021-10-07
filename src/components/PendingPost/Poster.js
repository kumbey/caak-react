import Dummy from "dummyjs";
import { generateTimeAgo } from "../../Utility/Util";
import { getFileUrl } from "../../Utility/Util";
export default function Poster({user, updatedAt}) {
    return (
        <div className="flex items-center">
            <img
                style={{height: "32px", width: "32px"}}
                className="rounded-full"
                src={user.pic ? getFileUrl(user?.pic) : Dummy.img("100x100")}
                alt=""
            />
            <p style={{marginLeft: "7px"}}>{user.firstname}</p>
            <span style={{marginLeft: "97px"}} className={"text-darkblue text-12px"}>
                {generateTimeAgo(updatedAt)}
            </span>
        </div>
    )
}
