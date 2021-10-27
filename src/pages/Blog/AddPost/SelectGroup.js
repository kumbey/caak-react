import React, { useEffect, useRef } from "react";
import Dummy from "dummyjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DropDownSelect from "../../../components/input/DropDownSelect";
import { generateFileUrl, useClickOutSide } from "../../../Utility/Util";
import { useUser } from "../../../context/userContext";

const SelectGroup = ({
  setIsGroupVisible,
  isGroupVisible,
  selectedGroup,
  setSelectedGroup,
  groupData,
  containerClassName,
  setPost,
  post,
}) => {
  const { user } = useUser();
  const textareaRef = useRef();

  const dropDownClickOutsideRef = useClickOutSide(() => {
    setIsGroupVisible(false);
  });

  const onChangeText = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [post.title]);

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div className={"flex flex-row items-center px-7"}>
        <img
          data-dummy="100x100"
          src={
            user.sysUser.pic
              ? generateFileUrl(user.sysUser.pic)
              : Dummy.img("100x100")
          }
          className={"w-12 h-12 rounded-full object-cover mr-2"}
          alt={""}
        />
        <div
          ref={dropDownClickOutsideRef}
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
                src={generateFileUrl(selectedGroup.profile)}
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
          {groupData.member && <DropDownSelect
              onSelect={setSelectedGroup}
              open={isGroupVisible}
              onToggle={() => setIsGroupVisible(!isGroupVisible)}
              groupData={groupData}
              className={"-top-3 left-0 right-0 bg-white rounded-square w-full"}
          /> }

        </div>
      </div>
      <div className={"relative flex flex-row mt-2 items-center px-7"}>
        <textarea
          // rows={2}
          ref={textareaRef}
          onChange={onChangeText}
          value={post.title}
          maxLength={"200"}
          placeholder={"Нийтлэлийн тайлбар оруулах..."}
          className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded"
        />
        <span
          className={
            "absolute right-9 bottom-4 text-14px text-caak-darkBlue font-medium"
          }
        >
          {post.title.length}/200
        </span>
      </div>
    </div>
  );
};

export default SelectGroup;
