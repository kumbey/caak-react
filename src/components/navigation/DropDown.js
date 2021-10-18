import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { checkUser } from "../../Utility/Util";

const DropDown = ({ items, open, onToggle, className }) => {

  const { user } = useUser()

  return ( checkUser(user) ?
    <div
      onClick={onToggle}
      className={`dropdown py-2 shadow-dropdown ${open ? "" : "hidden"} ${
        className && className
      }`}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {items.map((item) => (
          <Link key={item.name} to={item.href.replace(":userId", checkUser(user) && user.sysUser.id)}>
            {item.image}

            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    </div> : null
  );
};
export default DropDown;
