import React from "react";
import Dummy from "dummyjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DropDownSelect from "../../../components/input/DropDownSelect";

const SelectGroup = ({
  setIsGroupVisible,
  isGroupVisible,
  selectedGroup,
  setSelectedGroup,
  groupData,
}) => {
  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-row items-center px-7"}>
        <img
          data-dummy="100x100"
          src={Dummy.img("100x100")}
          className={"w-12 h-12 rounded-full object-cover mr-2"}
          alt={""}
        />
        <div
          onClick={() => setIsGroupVisible(!isGroupVisible)}
          className={`relative flex flex-row items-center cursor-pointer ${
            selectedGroup ? "bg-white" : "bg-caak-liquidnitrogen"
          } text-16px text-caak-generalblack mt-1 w-full pl-1.5 pr-10 py-3 block h-11 w-full rounded-md text-base  border border-gray-200 placeholder-gray-400   sm:text-sm  hover:bg-white`}
        >
          {selectedGroup ? (
            ""
          ) : (
            <span
              className={
                "flex border-2 border-dashed border-caak-generalblack w-7 h-7 rounded-square mr-2"
              }
            />
          )}
          {selectedGroup ? (
            <div className={"flex flex-row items-center"}>
              <img
                src={selectedGroup.image}
                className={"w-8 h-8 rounded-md object-cover mr-2"}
                alt={""}
              />
              <span className={"text-16px text-caak-generalblack"}>
                {selectedGroup.name}
              </span>
            </div>
          ) : (
            "Бүлэг сонгох"
          )}

          <FontAwesomeIcon
            className={"absolute right-2.5"}
            icon={faCaretDown}
          />
          <span />
          <DropDownSelect
            onSelect={setSelectedGroup}
            open={isGroupVisible}
            onToggle={() => setIsGroupVisible(!isGroupVisible)}
            items={groupData}
            className={"-top-3 left-0 right-0 bg-white rounded-square w-full"}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectGroup;
