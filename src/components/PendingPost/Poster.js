import Dummy from "dummyjs";
import { generateTimeAgo } from "../../Utility/Util";
import { getFileUrl } from "../../Utility/Util";
export default function Poster({user, updatedAt}) {
    return (
        <div className="flex items-center">
            <div className="flex items-center w-1/2">
                <img
                    className="rounded-full w-8 h-8 ph:w-c2 ph:h-c2"
                    src={user.pic ? getFileUrl(user?.pic) : Dummy.img("100x100")}
                    alt=""
                />
                <p className="text-15px ml-a3">{user.firstname}</p>
            </div>
            <span className={"text-darkblue text-12px"}>
                {generateTimeAgo(updatedAt)}
            </span>
        </div>
    )
}
