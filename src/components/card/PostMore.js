import { useUser } from "../../context/userContext";
import { checkUser } from "../../Utility/Util";
import { useHistory, useLocation } from "react-router-dom";

export default function PostMore({ postUser, postId }) {
  const { user } = useUser();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="bg-white">
      <div
        style={{ paddingInlineEnd: "21px" }}
        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-add-group-f ml-b4 mr-b2 text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          Бүлэгт элсэх
        </p>
      </div>
      {checkUser(user) && postUser.id === user.sysUser.id && (
        <div
          style={{ paddingInlineEnd: "21px" }}
          className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
          onClick={() =>
            history.push({
              pathname: `/post/add/${postId}`,
              state: { background: location },
            })
          }
        >
          <span className={"icon-fi-rs-pencil ml-b4 mr-b2 text-16px"} />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Постыг засах
          </p>
        </div>
      )}

      <div
        style={{ paddingInlineEnd: "21px" }}
        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-bookmark ml-b4 mr-b2 text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          Постыг хадгалах
        </p>
      </div>
      <div
        style={{ paddingInlineEnd: "21px" }}
        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-report ml-b4 mr-b2 text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          Зөрчилтэй мэдээлэл
        </p>
      </div>
      <div
        style={{ paddingInlineEnd: "21px" }}
        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-hide ml-b4 mr-b2 text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          Дахин харагдуулахгүй
        </p>
      </div>
    </div>
  );
}
