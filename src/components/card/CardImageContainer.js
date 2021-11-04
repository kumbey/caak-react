import React from "react";
import { getFileUrl } from "../../Utility/Util";
import { Link, useLocation } from "react-router-dom";

const CardImageContainer = ({ files, postId }) => {
  const location = useLocation();
  return (
    <Link
      to={{ pathname: `/post/view/${postId}`, state: { background: location } }}
    >
      <div className={"relative h-100"}>
        {files.length > 1 ? (
          <div
            className={
              "flex flex-row tracking-wide items-center text-center align-middle absolute font-bold h-5 top-3 right-3 text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1"
            }
          >
            <span className={"icon-fi-rs-album mr-1 text-11px"} />
            {files?.length}
          </div>
        ) : (
          ""
        )}
        <img
          src={getFileUrl(files[0].file)}
          className={"h-100 block object-cover w-full"}
          alt={""}
        />
      </div>
    </Link>
  );
};

export default CardImageContainer;
