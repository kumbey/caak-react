import React, { useRef, useState } from "react";
import { getFileUrl } from "../../Utility/Util";

const CardVideoContainer = ({ files, addPost }) => {
  const videoRef = useRef();
  const [videoDuration, setVideoDuration] = useState(0);
  const togglePlayBack = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }

  const formattedTime = formatTime(videoDuration);
  return (
    <div
      className={`relative ${
        files.length > 0 ? "max-h-100 h-100" : "max-w-8xl max-h-80"
      }`}
    >
      <div
        className={`flex flex-row tracking-wide items-center leading-none text-center align-middle absolute font-bold top-3 ${
          !addPost ? (files.length === 2 ? "right-16" : "right-3") : "left-3"
        } text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1`}
      >
        <span className={"icon-fi-rs-rec mr-1 text-9px"} />
        {`${formattedTime.minutes}:${formattedTime.seconds}`}
      </div>
      {files.length > 1 ? (
        <div
          className={`flex flex-row tracking-wide items-center text-center align-middle absolute font-bold top-3 right-3 text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1`}
        >
          <span className={"icon-fi-rs-album mr-1 text-11px"} />+{files.length}
        </div>
      ) : (
        ""
      )}
      <video
        onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}
        onClick={togglePlayBack}
        ref={videoRef}
        disablePictureInPicture
        controlsList="nodownload noremoteplayback noplaybackrate"
        className={`videoPlayer max-w-8xl ${
          addPost ? "w-full rounded-square" : "w-96"
        } ${
          files.length > 0 ? "max-h-100 h-100" : "max-h-80"
        } block object-cover cursor-pointer`}
      >
        <source
          src={getFileUrl(files.length ? files[0].file : files.file)}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default CardVideoContainer;
