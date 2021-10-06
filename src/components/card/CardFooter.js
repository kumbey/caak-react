import React, { useEffect, useState } from "react";

const CardFooter = ({ title, reactions, comments }) => {
  const [totalComments, setTotalComments] = useState(0);
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < comments.length; i++) {
      total += comments[i].totals && comments[i].totals.comments;
    }
    setTotalComments(total);
  }, [comments]);

  return (
    <div className="flex flex-col justify-between px-4 py-2 pb-4 w-96 h-full max-w-8xl">
      <p className="font-bold leading-5 break-words text-generalblack text-17px">
        {title}
      </p>
      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px mt-3"
        }
      >
        <div className={"flex flex-row"}>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fr-rs-caak text-16px mr-1.5"} />
            <span>{reactions}</span>
          </div>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fi-rs-comment text-16px mr-1.5"} />
            <span>{totalComments}</span>
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
