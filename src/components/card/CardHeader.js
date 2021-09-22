import React from "react";

const CardHeader = ({ verifiedUser }) => {
  return (
    <div className="h-14 flex items-center justify-between px-4">
      <div className="flex items-center justify-between py-4">
        <div className={"relative"}>
          <img
            className="w-34px m-34px rounded-square"
            src="https://i.pravatar.cc/100"
            alt="Alex"
          />
          <img
            className="-bottom-1.5 -right-1.5 absolute w-22px border-2 border-white rounded-full"
            src="https://i.pravatar.cc/100?img=3"
            alt="John"
          />
        </div>

        <div className="ml-3">
          <div className={"flex flex-row  items-center"}>
            <span className="text-generalblack text-14px mr-1 font-bold cursor-pointer">
              Developers
            </span>
            {verifiedUser ? (
              <i className={"icon-fi-rs-verified text-caak-buttonblue text-13px mr-1.5"} />
            ) : (
              ""
            )}
          </div>

          <div className={"flex flex-row items-center"}>
            <p className="hover:underline text-generalblack text-12px cursor-pointer">
              @Tulgaa
            </p>
            <span className={"text-darkblue text-12px mx-1"}>•</span>
            <span className={"text-darkblue text-12px"}>30мин өмнө</span>
          </div>
        </div>
      </div>
      <div className={"cursor-pointer"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
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
    </div>
  );
};

export default CardHeader;