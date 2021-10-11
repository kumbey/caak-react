import { useUser } from "../../context/userContext";
import { checkUser, getFileUrl } from "../../Utility/Util";
import Dummy from "dummyjs";

export default function BottomTabs() {
  const { user } = useUser();

  return (
    <div
      style={{ height: "50px" }}
      className="justify-evenly flex items-center w-full bg-white"
    >
      <span className="icon-fi-sp-home-f text-caak-generalblack text-24px px-b5 py-a2 rounded-lg" />
      <span className="icon-fi-fi-sp-hamburger-menu text-caak-blue text-24px px-b5 py-a2 rounded-lg" />
      <span className="icon-fi-rs-thick-add text-14px bg-caak-primary px-b5 py-a2 text-white rounded-lg" />
      <span className="icon-fi-rs-notification text-22px text-caak-blue px-b5 py-a2 rounded-lg" />
      {checkUser(user) ? (
        <img
          className={"rounded-full w-c3 h-c3"}
          alt={user.sysUser.name}
          src={
            user.sysUser.pic
              ? getFileUrl(user.sysUser.pic)
              : Dummy.image("50x50")
          }
        />
      ) : (
        <span className="icon-fi-rs-profile text-24px text-caak-blue px-b5 py-a2 rounded-lg" />
      )}
    </div>
  );
}
