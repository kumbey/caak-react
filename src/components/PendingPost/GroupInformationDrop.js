import React from "react";
import Shitt from "./Shitt";

const GroupInformationDrop = ({ open, onToggle, className, content, shadow, remove,onMouseEnter}) => {
  return (
    <div
      onClick={onToggle}
      onMouseEnter={onMouseEnter}
      className={`dropdown bg-white ${shadow ? "" : "shadow-dropdown"} ${open ? "" : "hidden"} ${
        className && className
      }`}
    >
      <div>
        {content || <Shitt remove={remove}/>}
      </div>
    </div>
  );
};
export default GroupInformationDrop;

