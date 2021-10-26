import { generateTimeAgo, extractDate } from "../../Utility/Util";
import { getFileUrl } from "../../Utility/Util";
import Dummy from "dummyjs";
export default function CheckHeader({ itemTitle, updatedAt, user }) {
  const date = extractDate(updatedAt);
  return (
    <div
      style={{ paddingInline: "30px", paddingBottom: "15px", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all" }}
      className="mt-c6 justify-between w-full"
    >
      <p className="text-18px">{itemTitle}</p>
      <div className="my-c6 flex items-center justify-between">
        <div className="flex items-center">
          <img
            alt=""
            src={user.pic ? getFileUrl(user.pic) : Dummy.img("100x100")}
            className="h-c13 w-c13 rounded-full"
          />
          <p className="text-15px ml-2 font-bold">{user.firstname}</p>
        </div>
        <div className={"text-caak-darkBlue text-14px pt-2"}>
          {generateTimeAgo(updatedAt)} ·{" "}
          {`${date.year}/${date.month}/${date.day}`}
        </div>
      </div>
    </div>
  );
}
