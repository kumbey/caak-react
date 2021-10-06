import React from "react";

const Notification = ({ newPost, type }) => {
  const button = () => {
    if (type === "success") {
      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5 p-1 bg-caak-algalfuel rounded-full"
          }
        >
          <span
            style={{ fontSize: "8px" }}
            className={"icon-fi-rs-thick-check text-white "}
          />
        </div>
      );
    } else if (type === "plus") {
      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-absoluteapricot rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-add text-white "}
          />
        </div>
      );
    } else if (type === "caak") {
      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-primary rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fr-rs-caak-active text-white "}
          />
        </div>
      );
    } else if (type === "comment") {
      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-darkBlue rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-comment text-white "}
          />
        </div>
      );
    } else if (type === "request") {
      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-bleudefrance rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-follow text-white "}
          />
        </div>
      );
    }
  };
  return (
    <div
      className={
        "flex flex-row justify-between items-center bg-white pl-5 pr-3.5 py-2 cursor-pointer hover:bg-caak-titaniumwhite"
      }
    >
      <div className={"flex flex-row"}>
        <div className={"avatar relative"}>
          {newPost && (
            <div
              className={
                "absolute -left-2 top-0 w-2 h-2 bg-caak-bleudefrance rounded-full"
              }
            />
          )}

          <div className={"flex justify-center items-center  w-10 h-10"}>
            <img
              className={"rounded-full w-full h-full"}
              src={"https://i.pravatar.cc/100"}
              alt={""}
            />
          </div>

          {/*<div*/}
          {/*  className={*/}
          {/*    "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-absoluteapricot rounded-full"*/}
          {/*  }*/}
          {/*>*/}
          {button()}
          {/*  <span*/}
          {/*    style={{ fontSize: "6px" }}*/}
          {/*    className={"icon-fi-rs-check text-white "}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        <div className={"flex flex-row flex-wrap items-center ml-3"}>
          <span className={"text-15px text-caak-generalblack font-medium"}>
            Oyunerdene{" "}
          </span>
          <span className={"text-14px text-caak-darkBlue"}>таны пост</span>
          <span className={"text-14px text-caak-generalblack"}>
            амжилттай нийтлэгдлээ
          </span>
        </div>
      </div>
      <div className={"postImage"}>
        <img
          className={"rounded-square w-14 h-10 object-cover"}
          src={"https://i.pravatar.cc/300"}
          alt={""}
        />
      </div>
    </div>
  );
};

export default Notification;
