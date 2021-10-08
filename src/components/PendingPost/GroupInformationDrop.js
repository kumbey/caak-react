import React from "react";
import PendingPostMenu from "./PendingPostMenu"

const GroupInformationDrop = ({ open, onToggle, className, content, shadow, remove,onMouseEnter}) => {
  return (
    <div
      onClick={onToggle}
      onMouseEnter={onMouseEnter}
      className={`dropdown bg-white ${shadow ? "" : "shadow-dropdown"} ${open ? "" : "hidden"} ${
        className && className
      }`}
    >
      <div>{content || <PendingPostMenu remove={remove} />}</div>
    </div>
  );
};
export default GroupInformationDrop;
