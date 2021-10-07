import React from "react";
import Shitt from "./shitt";

const GroupInformationDrop = ({
  open,
  onToggle,
  className,
  content,
  shadow,
  remove,
}) => {
  return (
    <div
      onClick={onToggle}
      className={`dropdown py-2 bg-white ${shadow ? "" : "shadow-dropdown"} ${
        open ? "" : "hidden"
      } ${className && className}`}
    >
      <div>{content || <Shitt remove={remove} />}</div>
    </div>
  );
};
export default GroupInformationDrop;
