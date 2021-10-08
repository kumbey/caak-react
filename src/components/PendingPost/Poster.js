import Dummy from "dummyjs";
import { generateTimeAgo } from "../../Utility/Util";
import { getFileUrl } from "../../Utility/Util";
export default function Poster({user, updatedAt}) {
    return (
        <div className="flex items-center">
            <div className="flex items-center w-1/2">
                <img
                    style={{height: "32px", width: "32px"}}
                    className="rounded-full"
                    src={user.pic ? getFileUrl(user?.pic) : Dummy.img("100x100")}
                    alt=""
                />
                <p style={{marginLeft: "7px"}} className="text-15px">{user.firstname}</p>
            </div>
            <span className={"text-darkblue text-12px"}>
                {generateTimeAgo(updatedAt)}
            </span>
        </div>
    )
}
