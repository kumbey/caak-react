import React from "react";
import { getFileUrl } from "../../Utility/Util";

const CardImageContainer = ({ files }) => {
  return (
    <div className={"relative max-w-8xl w-96 h-100"}>
      {files.length > 1 ? (
        <div
          className={
            "flex flex-row tracking-wide items-center text-center align-middle absolute font-bold h-5 top-3 right-3 text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1"
          }
        >
          <span className={"icon-fi-rs-album mr-1 text-11px"} />+{files?.length}
        </div>
      ) : (
        ""
      )}
      <img
        src={getFileUrl(files[0].file)}
        className={"w-96 h-100 block object-cover"}
        alt={""}
      />
    </div>
  );
};

export default CardImageContainer;
