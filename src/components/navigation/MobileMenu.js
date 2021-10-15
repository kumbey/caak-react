import { menu_data } from "../menu_data";
import Button from "../button";
import { useWrapper } from "../../context/wrapperContext";
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { checkUser, useClickOutSide } from "../../Utility/Util";

const MobileMenu = () => {
  const { user } = useUser();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useWrapper();
  const history = useHistory();
  const location = useLocation();
  const sideMenuRef = useClickOutSide(() => {
    setIsMobileMenuOpen(false);
  });
  return (
    <div
      ref={sideMenuRef}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className={`w-full flex z-50 bg-transparent justify-end fixed right-0 top-0 transition ease-linear duration-300 ${
        isMobileMenuOpen
          ? "transform translate-x-0"
          : "transform translate-x-full"
      }`}
      id="mobile-menu"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col h-screen px-2 pb-3 bg-white"
      >
        <div
          className={
            "relative text-20px text-caak-generalblack font-medium py-2.5 px-5 border-t border-b border-gray-100"
          }
        >
          Туслах цэс
          <span
            onClick={() => setIsMobileMenuOpen(false)}
            className={
              "cursor-pointer text-16px absolute right-0 top-1/2 transform -translate-y-1/2 icon-fi-rs-close"
            }
          />
        </div>
        <div className={`relative p-2`}>
          {menu_data.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:bg-gray-50 flex flex-row items-center px-3 py-2 pr-5 text-left transition duration-150 ease-in-out rounded-md"
            >
              {item.image}

              <p className="text-base font-medium text-gray-900">{item.name}</p>
            </a>
          ))}
        </div>
        {!checkUser(user) && (
          <div className={"flex flex-col"}>
            <Button
              round
              className={"ml-2 mb-2 h-12"}
              skin={"secondary"}
              onClick={() =>
                history.push({
                  pathname: "/login",
                  state: { background: location },
                })
              }
            >
              Нэвтрэх
            </Button>
            <Button
              round
              className={"ml-2 h-12"}
              skin={"primary"}
              onClick={() =>
                history.push({
                  pathname: "/register",
                  state: { background: location },
                })
              }
            >
              Бүртгэл үүсгэх
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
