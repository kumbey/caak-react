import React from "react";

const CommentCard = ({ children }) => {
  return (
    <div className={" flex flex-col ml-2 justify-between"}>
      <div className={"relative flex flex-row items-center"}>
        <div
          className={"cursor-pointer absolute right-0.5 z-10 text-caak-blue"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
        <span className={"text-16px font-bold text-caak-generalblack"}>
          Batsuren
        </span>
        <span className={"text-14px text-caak-darkBlue mx-1"}>·</span>
        <span className={"text-14px text-caak-darkBlue"}>15мин өмнө</span>
      </div>
      <span
        className={
          "text-15px text-caak-generalblack leading-4  tracking-normal pt-2"
        }
      >
        Монголын ийм сайхан зураг анх удаагаа харлаа зурагны чанар бол солиотой!
      </span>
      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px py-3"
        }
      >
        <div className={"flex flex-row items-start justify-center"}>
          <div
            className={
              "flex flex-row items-center mr-4 cursor-pointer hover:text-caak-primary group"
            }
          >
            <div
              className={
                "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-7 w-7"
              }
            >
              <i className={"icon-fr-rs-caak text-18px"} />
            </div>
            <span className={"text-14px"}>4.5k</span>
          </div>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <div
              className={
                "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-7 w-7"
              }
            >
              <i className={"icon-fi-rs-comment text-16px mr-1.5"} />
            </div>
            <span className={"text-14px"}>Хариулах</span>
          </div>
        </div>
      </div>
      <div className={"flex flex-col"}>{children}</div>
    </div>
  );
};

export default CommentCard;
