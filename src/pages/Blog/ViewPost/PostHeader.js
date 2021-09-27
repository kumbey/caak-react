import React from "react";

const PostHeader = () => {
  return (
    <div className={"flex flex-col"}>
      <div className={"font-bold text-20px text-caak-generalblack pt-2 px-7"}>
        Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!
      </div>
      <div className={"text-caak-darkBlue text-14px pt-2 px-7"}>
        30мин өмнө · 2021/09/20
      </div>
      <div className={"text-15px text-caak-generalblack pt-2 px-7"}>
        Зураг түс бүрийн тайлбар энэ хэсэгт орох бөгөөд өгүүлбэрийн үсгийн тоо
        хязгаартай байна
      </div>
      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px py-2 px-7"
        }
      >
        <div className={"flex flex-row "}>
          <div
            className={
              "flex flex-row items-center mr-4 cursor-pointer hover:text-caak-primary group"
            }
          >
            <div
              className={
                "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-8 w-8"
              }
            >
              <i className={"icon-fr-rs-caak text-22px"} />
            </div>
            <span className={"text-15px"}>4.5k</span>
          </div>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fi-rs-comment text-18px mr-1.5"} />
            <span className={"text-15px"}>90 сэтгэгдэлтэй</span>
          </div>
        </div>
        <div className={"flex flex-row items-center cursor-pointer"}>
          <i className={"icon-fi-rs-share text-18px mr-1.5"} />
          <span className={"text-15px"}>Хуваалцах</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
