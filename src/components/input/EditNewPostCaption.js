import { useEffect, useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Button from "../button";

const EditNewPostCaption = ({
  onChangeFiles,
  uploadedFiles,
  setCurrentEditingIndex,
  currentEditingIndex,
}) => {
  const [textCount, setTextCount] = useState(0);
  const [post, setPost] = useState();
  const [sortedArray, setSortedArray] = useState();
  const featuredPostHandler = (e, index) => {
    e.stopPropagation();
    // eslint-disable-next-line no-extend-native
    function arrayMove(arr, fromIndex, toIndex) {
      let element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }

    arrayMove(uploadedFiles, index, 0);
    setCurrentEditingIndex(index)
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
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current && videoRef.current.load();
  }, [post]);

  return (
    <div>
      {post && (
        <div>
          {post.type.startsWith("video") ? (
            <video
              ref={videoRef}
              disablePictureInPicture
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              className={
                "videoPlayer w-full max-h-80 block object-contain  bg-black"
              }
            >
              <source src={post.preview} type="video/mp4" />
            </video>
          ) : (
            <img
              className={"max-h-80 w-full object-contain bg-black"}
              src={post.preview}
              alt={""}
            />
          )}

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
              className={`relative flex justify-center items-center group border-2 border-transparent w-20 h-20 mr-1 mt-2 p-1 rounded-square ${
                currentEditingIndex === index &&
                "border-2 border-caak-mortargrey"
              }`}
            >
              <span
                onClick={(e) => featuredPostHandler(e, index)}
                className={`icon-fi-rs-rec absolute text-14px text-white bg-gray-50 rounded-full p-1 bg-opacity-40 right-2 top-2 cursor-pointer transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 ${
                  uploadedFiles[0] === item && "text-caak-primary opacity-100"
                }`}
              />
              {item.type.startsWith("video") ? (
                <video
                  height={"20rem"}
                  disablePictureInPicture
                  controlsList="nodownload noremoteplayback noplaybackrate"
                  className={
                    "videoPlayer w-full max-h-80 block object-cover cursor-pointer rounded-square"
                  }
                >
                  <source src={item.preview} type="video/mp4" />
                </video>
              ) : (
                <img
                  className={"w-full h-full rounded-square object-cover"}
                  src={item.preview}
                  alt={""}
                />
              )}
            </div>
          );
        })}
      </ReactSortable>
      <div className={"flex flex-row pb-4 px-4"}>
        <Button className={"mr-2 mt-4 w-full text-17px"}>Хадгалах</Button>
      </div>
    </div>
  );
};
export default EditNewPostCaption;
