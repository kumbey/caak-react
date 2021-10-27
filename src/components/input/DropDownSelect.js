import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Input from "./index";
import { generateFileUrl } from "../../Utility/Util";

const DropDownSelect = ({ groupData, open, onToggle, className, onSelect }) => {
  return (
    <div
      onClick={onToggle}
      className={`dropdown py-2 shadow-dropdown ${open ? "" : "hidden"} ${
        className && className
      }`}
    >
      <div className={"p-1"}>
        <div
          onClick={onToggle}
          className={
            "relative flex flex-row items-center cursor-pointer bg-white text-16px text-caak-generalblack w-full pl-3 pr-10  block h-11 rounded-md text-base  border border-caak-primary placeholder-gray-400 ring-2 ring-caak-primary ring-opacity-20 sm:text-sm hover:border-caak-primary"
          }
        >
          <span
            className={
              "icon-fi-rs-search text-caak-darkBlue flex items-center justify-center border-2 border-dashed border-caak-darkBlue w-6.5 h-6.5 rounded-square mr-2 p-1"
            }
          />
          <Input
            onClick={(e) => e.stopPropagation()}
            hideLabel
            placeholder={"Хайлт хийх"}
            className={
              "py-2 border-transparent hover:border-transparent focus:ring-transparent"
            }
            hideError
            containerStyle={"w-full"}
          />
          <FontAwesomeIcon
            className={"absolute right-2.5"}
            icon={faCaretDown}
          />
          <span />
        </div>
        <div className={"z-50"}>
          <div className={"flex flex-row justify-between px-3.5 pt-2"}>
            <span className={"text-15px text-caak-darkBlue"}>
              Миний удирдаж буй бүлгүүд
            </span>
            <span className={"text-15px font-medium text-caak-primary"}>
              Шинэ бүлэг үүсгэх
            </span>
          </div>
          <div className={"px-2"}>
            {groupData.adminModerator.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onSelect(item)}
                  className={"flex flex-col"}
                >
                  <div
                    className={
                      "flex flex-row items-center p-1.5 my-px rounded-square hover:bg-caak-liquidnitrogen"
                    }
                  >
                    <img
                      src={generateFileUrl(item.profile)}
                      className={"w-8 h-8 rounded-md object-cover mr-2"}
                      alt={""}
                    />
                    <span
                      className={"text-caak-generalblack font-medium text-16px"}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={
              "flex flex-row justify-between border-t border-caak-liquidnitrogen px-3.5"
            }
          >
            <span className={"text-15px text-caak-darkBlue pt-2"}>
              Миний дагасан бүлгүүд
            </span>
          </div>
          <div className={"px-2"}>
            {groupData.member.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onSelect(item)}
                  className={"flex flex-col"}
                >
                  <div
                    className={
                      "flex flex-row items-center p-1.5 my-px rounded-square hover:bg-caak-liquidnitrogen"
                    }
                  >
                    <img
                      src={generateFileUrl(item.profile)}
                      className={"w-8 h-8 rounded-md object-cover mr-2"}
                      alt={""}
                    />
                    <span
                      className={"text-caak-generalblack font-medium text-16px"}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DropDownSelect;
