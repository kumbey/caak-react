import React from "react";
import Dummy from "dummyjs";

const CardImageContainer = ({ data }) => {
  return (
    <div className={"relative"}>
      {data.length > 1 ? (
        <div
          className={
            "flex flex-row tracking-wide items-center text-center align-middle absolute font-bold top-3 left-3 text-white text-11px bg-black bg-opacity-20 rounded px-2 py-1"
          }
        >
          <span className={"icon-fi-rs-album mr-1"} />
          +2
        </div>
      ) : (
        ""
      )}
      <img
        data-dummy="400,100x100,800"
        src={Dummy.img("400,100x100,800")}
        className={"w-full max-h-96 block object-cover"}
        alt={""}
      />
    </div>
  );
};

export default CardImageContainer;