import React from "react";

const DropDown = ({ open, onToggle, className, content }) => {
  return (
    open && (
      <div
        onClick={onToggle}
        className={`dropdown py-2 shadow-dropdown ${className && className}`}
      >
        {content ? content : null}
        {/*{items ? (*/}
        {/*  <div className={"dropdown-item-wrapper"}>*/}
        {/*    {items.map((item) => (*/}
        {/*      <Link*/}
        {/*        className={"dropdown-items"}*/}
        {/*        key={item.name}*/}
        {/*        to={item.href.replace(*/}
        {/*          ":userId",*/}
        {/*          checkUser(user) && user.sysUser.id*/}
        {/*        )}*/}
        {/*      >*/}
        {/*        {item.icon}*/}

        {/*        <p>{item.name}</p>*/}
        {/*      </Link>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*) : null}*/}

        <div className="absolute inset-0 z-0 flex justify-end mr-6 -mt-2">
          <svg
            className={"text-right"}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path fill={"white"} d="M24 22h-24l12-20z" />
          </svg>
        </div>
      </div>
    )
  );
};
export default DropDown;
