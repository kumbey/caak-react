import React from "react";
import { useUser } from "../../context/userContext";

const DropDown = ({ items, open, onToggle, className }) => {

  const { user } = useUser()

  return (
    <div
      onClick={onToggle}
      className={`dropdown py-2 shadow-dropdown ${open ? "" : "hidden"} ${
        className && className
      }`}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {items.map((item) => (
          <a key={item.name} href={item.href.replace(":userId", user.sysUser.id)}>
            {item.image}

            <p>{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
export default DropDown;
