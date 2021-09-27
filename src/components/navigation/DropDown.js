import React from "react";

const DropDown = ({ items, open, onToggle, className }) => {
  return (
    <div
      onClick={onToggle}
      className={`dropdown shadow-dropdown ${open ? "" : "hidden"} ${
        className && className
      }`}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {items.map((item) => (
          <a key={item.name} href={item.href}>
            {item.image}

            <p>{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
export default DropDown;
