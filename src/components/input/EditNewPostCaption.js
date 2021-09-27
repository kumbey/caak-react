import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

const EditNewPostCaption = ({
  onChangeFiles,
  uploadedFiles,
  setCurrentEditingIndex,
  currentEditingIndex,
}) => {
  const [textCount, setTextCount] = useState(0);
  const [post, setPost] = useState();
  useEffect(() => {
    uploadedFiles[currentEditingIndex] &&
      setPost(uploadedFiles[currentEditingIndex]);
  }, [uploadedFiles, currentEditingIndex]);
  return (
    <div>
      {post ? (
        <div className={""}>
          <img
            className={"max-h-80 w-full object-contain "}
            src={post.preview}
            alt={"sdd"}
          />
          <div className={"relative flex flex-row mt-2 items-center px-4"}>
            <textarea
              rows={3}
              onChange={(e) => setTextCount(e.target.value.length)}
              maxLength={"60"}
              placeholder={"Нийтлэлийн тайлбар оруулах..."}
              className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded resize"
            />
            <span
              className={"absolute right-8 text-14px text-caak-generalblack"}
            >
              {textCount}/60
            </span>
          </div>
        </div>
      ) : (
        <div className={"animate-pulse w-full h-full bg-blue-300"} />
      )}
      {/*<div className={"px-4 flex flex-row"}>*/}
      <ReactSortable
        animation={150}
        list={uploadedFiles}
        setList={(e) => console.log(e)} //TODO Returning different array
        // onEnd={(e) => console.log(e)}
        className={"flex flex-row px-4"}
      >
        {uploadedFiles.map((item, index) => {
          // console.log(item)
          return (
            <div
              key={index}
              onClick={() => setCurrentEditingIndex(index)}
              className={"relative w-20 h-20 mr-2 rounded-square"}
            >
              <img
                className={"w-full h-full rounded-square object-cover"}
                src={item.preview}
                alt={"sd"}
              />
            </div>
          );
        })}
      </ReactSortable>
      {/*</div>*/}
      {/*<input {...getInputProps()}></input>*/}

      {/*<div className={"px-4 flex flex-row"}>*/}
      {/*  {uploadedFiles.map((item, index) => {*/}
      {/*    return (*/}
      {/*      <div*/}
      {/*        key={index}*/}
      {/*        onClick={() => setCurrentEditingIndex(index)}*/}
      {/*        className={"relative w-20 h-20 mr-2 rounded-square"}*/}
      {/*      >*/}
      {/*        <img*/}
      {/*          className={"w-full h-full rounded-square object-cover"}*/}
      {/*          src={item.preview}*/}
      {/*          alt={"sd"}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
    </div>
  );
};
export default EditNewPostCaption;
