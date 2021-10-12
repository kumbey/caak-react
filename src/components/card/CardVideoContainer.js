import { useState } from "react";
import { getFileUrl } from "../../Utility/Util";
import VideoJS from "./VideoJS";
import { useHistory, useLocation } from "react-router-dom";

const CardVideoContainer = ({ files, addPost, postId }) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: false,
    fluid: false,
    sources: [
      {
        src: getFileUrl(files.length ? files[0].file : files.file),
        type: "video/mp4",
      },
    ],
  };

  function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }


  let clickTimer = null;

  function touchStart() {
    if (clickTimer == null) {
      clickTimer = setTimeout(function () {
        clickTimer = null;
        console.log("single");

      }, 500)
    } else {
      clearTimeout(clickTimer);
      clickTimer = null;
      console.log("double");

    }
  }

  const formattedTime = formatTime(videoDuration);
  return (
    <div
      className={`relative ${
        files.length > 0 ? "max-h-100 h-100" : " max-h-80"
      }`}
    >
      <div
        className={`z-1 flex flex-row tracking-wide items-center leading-none text-center align-middle absolute font-bold top-3 ${
          !addPost ? (files.length === 2 ? "right-16" : "right-3") : "left-3"
        } text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1`}
      >
        <span className={"icon-fi-rs-rec mr-1 text-9px"} />
        {`${formattedTime.minutes}:${formattedTime.seconds}`}
      </div>
      {files.length > 1 ? (
        <div
          className={`z-1 flex flex-row tracking-wide items-center text-center align-middle absolute font-bold top-3 right-3 text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1`}
        >
          <span className={"icon-fi-rs-album mr-1 text-11px"} />+{files.length}
        </div>
      ) : (
        ""
      )}
      <VideoJS
          onTouch={()=> {
            touchStart()
          }}
        // onDoubleClick={() =>
        //   history.push({
        //     pathname: `/post/view/${postId}`,
        //     state: { background: location },
        //   })
        // }
        onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}
        files={files}
        options={videoJsOptions}
        style={{ objectFit: "cover", width: "100%" }}
        videoClassName={`videoPlayer  video-js vjs-big-play-centered max-w-8xl ${
          addPost ? "w-full rounded-square" : "w-96"
        } ${
          files?.length > 0 ? "max-h-100 h-100" : "max-h-80"
        } block cursor-pointer`}
      />
      {/*<video*/}
      {/*  onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}*/}
      {/*  onClick={togglePlayBack}*/}
      {/*  ref={videoRefr}*/}
      {/*  disablePictureInPicture*/}
      {/*  controlsList="nodownload noremoteplayback noplaybackrate"*/}
      {/*  className={`videoPlayer max-w-8xl ${*/}
      {/*    addPost ? "w-full rounded-square" : "w-96"*/}
      {/*  } ${*/}
      {/*    files.length > 0 ? "max-h-100 h-100" : "max-h-80"*/}
      {/*  } block object-cover cursor-pointer`}*/}
      {/*>*/}
      {/*  <source*/}
      {/*    src={getFileUrl(files.length ? files[0].file : files.file)}*/}
      {/*    type="video/mp4"*/}
      {/*  />*/}
      {/*</video>*/}
    </div>
  );
};

export default CardVideoContainer;
