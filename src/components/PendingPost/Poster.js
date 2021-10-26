import Dummy from "dummyjs";
import { generateTimeAgo } from "../../Utility/Util";
import { getFileUrl } from "../../Utility/Util";

export default function Poster({ user, updatedAt }) {
  return (
    <div className="sm:flex flex-row items-center justify-between w-full">
      <div className="flex items-center">
        <img
          className="ph:w-c2 ph:h-c2 w-8 h-8 rounded-full"
          src={user.pic ? getFileUrl(user?.pic) : Dummy.img("100x100")}
          alt=""
        />
        <p className="text-15px ml-px-7">{user.firstname}</p>
      </div>

      <div className="flex items-center">
        <span className={"text-darkblue text-12px"}>
          {generateTimeAgo(updatedAt)}
        </span>
      </div>
    </div>
  );
}
