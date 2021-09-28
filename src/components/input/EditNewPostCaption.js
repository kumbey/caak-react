import { useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { removeItemByIndex } from "../../Utility/ArrayUtil";
import Button from "../button";

const EditNewPostCaption = ({
  setPost,
  post,
  setCurrentEditingIndex,
  currentEditingIndex,
  setIsEditing
}) => {

  const videoRef = useRef();

  const [sortedArray, setSortedArray] = useState()
  const [data, setData] = useState([...post.items])
  const [current, setCurrent] = useState(currentEditingIndex)
  const [maxTextLength] = useState(60)

  const featuredPostHandler = (e, index) => {
    e.stopPropagation();
    
    let featured = data[index]
    let arr = [...data]
    removeItemByIndex(arr, index)
    setData([featured, ...arr])
    setCurrent(0)
  };

  const captionHandler = (e) => {
    let arr = [...data]
    let cur = arr[current]
    arr[current] = {...cur, title: e.target.value}
    setData([...arr])
  };

  const handleSave = () => {
      setCurrentEditingIndex(current)
      setPost({...post, items: data})
      setIsEditing(false)
  }

  return (
    <div>
      {data[current] && (
        <div>
          {data[current].file.type.startsWith("video") ? (
            <video
              ref={videoRef}
              disablePictureInPicture
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              className={
                "videoPlayer w-full max-h-80 block object-contain  bg-black"
              }
            >
              <source src={data[current].file.url} type="video/mp4" />
            </video>
          ) : (
            <img
              className={"max-h-80 w-full object-contain bg-black"}
              src={data[current].file.url}
              alt={"sdd"}
            />
          )}

          <div className={"relative flex flex-row mt-2 items-center px-4"}>
            <textarea
              rows={2}
              value={data[current].title}
              onChange={captionHandler}
              maxLength={"60"}
              placeholder={"Нийтлэлийн тайлбар оруулах..."}
              className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded resize"
            />
            <span
              className={
                "absolute right-8 bottom-4 text-14px font-medium text-caak-darkBlue"
              }
            >
              {data[current].title.length}/{maxTextLength}
            </span>
          </div>
        </div>
      )}
      <ReactSortable
        animation={150}
        list={data}
        setList={(e) => setSortedArray(e)}
        onEnd={() => setData(sortedArray)}
        className={"flex flex-row flex-wrap px-4"}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`relative flex justify-center items-center group border-2 border-transparent w-20 h-20 mr-1 mt-2 p-1 rounded-square ${
                current === index &&
                "border-2 border-caak-mortargrey"
              }`}
            >
              <span
                onClick={(e) => featuredPostHandler(e, index)}
                className={`icon-fi-rs-rec absolute text-14px text-white bg-gray-50 rounded-full p-1 bg-opacity-40 right-2 top-2 cursor-pointer transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 ${
                  data[0] === item && "text-caak-primary opacity-100"
                }`}
              />
              {item.file.type.startsWith("video") ? (
                <video
                  height={"20rem"}
                  disablePictureInPicture
                  controlsList="nodownload noremoteplayback noplaybackrate"
                  className={
                    "videoPlayer w-full max-h-80 block object-cover cursor-pointer rounded-square"
                  }
                >
                  <source src={item.file.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  className={"w-full h-full rounded-square object-cover"}
                  src={item.file.url}
                  alt={""}
                />
              )}
            </div>
          );
        })}
      </ReactSortable>
      <div className={"flex flex-row px-4"}>
        <Button
          onClick={handleSave}
          className={"mr-2 mt-4 w-full text-17px"}>Хадгалах</Button>
      </div>
    </div>
  );
};
export default EditNewPostCaption;
