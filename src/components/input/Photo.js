import React from "react";

const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = (event) => {
    onClick(event, { photo, index });
  };

  return (
    // <div className={"relative"}>
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        {...photo}
        onClick={onClick ? handleClick : null}
        className={"rounded-md h-full max-h-80 w-56 object-cover mr-2"}
        alt={""}
      />
      // <span className={"icon-fi-rs-close absolute top-0 right-0"} />
    // </div>
  );
};

export default Photo;
