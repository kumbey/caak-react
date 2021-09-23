import React from "react";
import Masonry from "react-masonry-css";
import CardVideoContainer from "../card/CardVideoContainer";
import AddPostCardSmall from "../card/AddPostCardSmall";

const Card = ({
  video,
  onClick,
  uploadedFiles,
  setIsEditing,
  setCurrentEditingIndex,
  ...data
}) => {
  const popItem = (index_arg) => {
    const filteredArray = uploadedFiles.filter(function (item, index) {
      return index !== index_arg;
    });
    onClick(filteredArray);
  };

  const editHandler = (index) => {
    setIsEditing(true);
    setCurrentEditingIndex(index);
  };

  return (
    <div key={data.index} className={"relative mb-1 w-full group"}>
      <span
        onClick={() => editHandler(data.index)}
        className={
          "absolute transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 bottom-2 left-2 motion-safe:hover:animate-spin font-medium cursor-pointer leading-none text-14px text-white bg-black bg-opacity-50 py-2 px-3 rounded-full"
        }
      >
        Засварлах
      </span>
      {video ? (
        <CardVideoContainer data={data.data} />
      ) : (
        <img
          src={data.data.preview}
          className={"rounded-md w-full h-full max-h-80  object-cover"}
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
  uploadedFiles,
  setIsEditing,
  setCurrentEditingIndex,
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
        <div className="max-h-96 editor-selection overflow-y-scroll">
          <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {uploadedFiles.map((item, index) => {
              let video;
              if (item && item.type.startsWith("video")) {
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
                  uploadedFiles={uploadedFiles}
                  video={video}
                  setIsEditing={setIsEditing}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                />
              );
            })}
            {uploadedFiles.length < 10 && (
              <AddPostCardSmall
                uploadedFiles={uploadedFiles}
                onChangeFile={onChangeFiles}
              />
            )}
          </Masonry>
        </div>
      </div>
      <div
        className={
          "text-caak-primary px-7 mt-3 flex flex-row items-center justify-items-start"
        }
      >
        <span className={"icon-fi-rs-desc  cursor-pointer"} />
        <span
          onClick={() => setIsEditing(true)}
          className={"font-medium text-15px ml-2  cursor-pointer"}
        >
          Зураг тус бүрт тайлбар оруулах
        </span>
      </div>
    </div>
  );
};

export default UploadedMediaEdit;
