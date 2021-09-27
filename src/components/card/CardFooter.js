import React from "react";

const CardFooter = ({ data }) => {
  return (
    <div className="px-4 py-2 pb-4">
      <h1 className="text-generalblack text-17px font-bold leading-5">
        {data.title}
      </h1>
      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px mt-3"
        }
      >
        <div className={"flex flex-row"}>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fr-rs-caak text-16px mr-1.5"} />
            <span>{data.likes}</span>
          </div>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fi-rs-comment text-16px mr-1.5"} />
            <span>{data.comments}</span>
          </div>
        </div>
        <div className={"flex flex-row items-center cursor-pointer"}>
          <i className={"icon-fi-rs-share text-15px mr-1.5"} />

          <span>Хуваалцах</span>
        </div>
      </div>
    </div>
  );
};

export default CardFooter;
