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
  const [sortedArray, setSortedArray] = useState();
  const [featuredPost, setFeaturedPost] = useState();
  const featuredPostHandler = (e, item) => {
    e.stopPropagation();
    featuredPost ? setFeaturedPost(null) : setFeaturedPost(item);
  };
  const captionHandler = (e) => {
    setTextCount(e.target.value.length);
    Object.assign(uploadedFiles[currentEditingIndex], {
      caption: e.target.value,
    });
  };
  useEffect(() => {
    uploadedFiles[currentEditingIndex] &&
      setPost(uploadedFiles[currentEditingIndex]);
  }, [uploadedFiles, currentEditingIndex]);
  return (
    <div>
      {post ? (
        <div>
          <img
            className={"max-h-80 w-full object-contain bg-black"}
            src={post.preview}
            alt={"sdd"}
          />
          <div className={"relative flex flex-row mt-2 items-center px-4"}>
            <textarea
              rows={2}
              value={uploadedFiles[currentEditingIndex].caption}
              onChange={(e) => captionHandler(e)}
              maxLength={"60"}
              placeholder={"Нийтлэлийн тайлбар оруулах..."}
              className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded resize"
            />
            <span
              className={
                "absolute right-8 bottom-4 text-14px font-medium text-caak-darkBlue"
              }
            >
              {textCount}/60
            </span>
          </div>
        </div>
      ) : (
        <div className={"animate-pulse w-full h-full bg-blue-300"} />
      )}
      <ReactSortable
        animation={150}
        list={uploadedFiles}
        setList={(e) => setSortedArray(e)}
        onEnd={() => onChangeFiles(sortedArray)}
        className={"flex flex-row flex-wrap px-4"}
      >
        {uploadedFiles.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setCurrentEditingIndex(index)}
              className={`relative group border-2 border-transparent w-20 h-20 mr-1 mt-2 p-1 rounded-square ${
                currentEditingIndex === index &&
                "border-2 border-caak-mortargrey"
              }`}
            >
              <span
                onClick={(e) => featuredPostHandler(e, item)}
                className={`icon-fi-rs-rec absolute right-2 top-2 cursor-pointer transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 ${
                  item === featuredPost && "text-caak-primary opacity-100"
                }`}
              />
              <img
                className={"w-full h-full rounded-square object-cover"}
                src={item.preview}
                alt={"sd"}
              />
            </div>
          );
        })}
      </ReactSortable>
    </div>
  );
};
export default EditNewPostCaption;
