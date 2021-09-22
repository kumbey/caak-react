import React from "react";
import Masonry from "react-masonry-css";
import CardVideoContainer from "../card/CardVideoContainer";

const Card = ({ video, onClick, stateFiles, ...data }) => {
  const popItem = (index1) => {
    const filteredArray = stateFiles.filter(function (item, index) {
      return index !== index1;
    });
    onClick(filteredArray);
  };
  return (
    <div key={data.index} className={"relative p-1 w-full"}>
      {video ? (
        <CardVideoContainer data={data.data} />
      ) : (
        <img
          src={data.data.preview}
          className={"rounded-md h-full max-h-80 w-full object-cover mr-2"}
          alt={""}
        />
      )}

      <span
        onClick={() => popItem(data.index)}
        className={
          "cursor-pointer bg-black bg-opacity-50 text-12px p-2 rounded-full text-white icon-fi-rs-close absolute top-2 right-3"
        }
      />
    </div>
  );
};

const UploadedMediaEdit = ({
  onChangeText,
  onChangeFiles,
  textCount,
  files,
}) => {
  return (
    <div>
      <div
        className={
          "flex flex-row justify-between bg-caak-red bg-opacity-70 w-full p-3.5 px-6 my-4"
        }
      >
        <span className={"text-15px text-white font-normal"}>
          Зураг болон Видео хуулахад алдаа гарлаа.
        </span>
        <span
          className={
            "cursor-pointer text-14px font-medium text-white underline tracking-wider"
          }
        >
          Дэлгэрэнгүй унших..
        </span>
      </div>
      <div className={"relative flex flex-row mt-2 items-center px-7"}>
        <textarea
          rows={1}
          onChange={(e) => onChangeText(e.target.value.length)}
          maxLength={"60"}
          placeholder={"Нийтлэлийн тайлбар оруулах..."}
          className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded resize"
        />
        <span className={"absolute right-8 text-14px text-caak-generalblack"}>
          {textCount}/60
        </span>
      </div>
      <div
        className={
          "border-caak-titaniumwhite  border border-dashed rounded-square p-1 mx-7"
        }
      >
        <div className="editor-selection max-h-96 overflow-y-scroll">
          <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {files.map((item, index) => {
              let video;
              if (item.type.startsWith("video")) {
                video = "video";
              } else {
                video = "";
              }
              return (
                <Card
                  key={index}
                  data={item}
                  index={index}
                  onClick={onChangeFiles}
                  stateFiles={files}
                  video={video}
                />
              );
            })}
          </Masonry>
        </div>
      </div>
      <div
        className={
          "text-caak-primary px-7 mt-3 flex flex-row items-center justify-items-start"
        }
      >
        <span className={"icon-fi-rs-desc  cursor-pointer"} />
        <span className={"font-medium text-15px ml-2  cursor-pointer"}>
          Зураг тус бүрт тайлбар оруулах
        </span>
      </div>
    </div>
  );
};

export default UploadedMediaEdit;
