import React, {useEffect, useRef, useState} from "react";
import {getFileUrl} from "../../Utility/Util";

const CardVideoContainer = ({files}) => {
  const videoRef = useRef();
  const [videoDuration, setVideoDuration] = useState(0);

  const togglePlayBack = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };


  // function formatTime(timeInSeconds) {
  //   const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  //
  //   return {
  //     minutes: result.substr(3, 2),
  //     seconds: result.substr(6, 2),
  //   };
  // }


  useEffect(() => {
    videoRef.current.onloadedfiles = (e) => {
      setVideoDuration(e.current.duration);
    };
  }, []);
  return (
      <div className={"relative"}>
        <div
            className={
              "flex flex-row tracking-wide items-center leading-none text-center align-middle absolute font-bold top-3 left-3 text-white text-11px bg-black bg-opacity-20 rounded px-2 py-1"
            }
        >
          <span className={"icon-fi-rs-rec mr-1 text-9px"}/>
          {videoDuration}
        </div>
        {files.length > 1 ? (
            <div
                className={`flex flex-row tracking-wide items-center text-center align-middle absolute font-bold top-3 left-20 text-white text-11px bg-black bg-opacity-20 rounded px-2 py-1`}
            >
              <span className={"icon-fi-rs-album mr-1 text-"}/>+{files.length}
            </div>
        ) : (
            ""
        )}
        {/*<div className={"absolute top-0 left-0 text-white"}>{totalDuration()}</div>*/}
        <video
            onClick={togglePlayBack}
            ref={videoRef}
            disablePictureInPicture
            controlsList="nodownload noremoteplayback noplaybackrate"
            className={
              "videoPlayer max-w-8xl w-96 max-h-100 h-100 block object-cover cursor-pointer"
            }
        >
          <source src={getFileUrl(files[0].file)} type="video/mp4"/>
        </video>

        {/*<div className={"absolute bottom-0"}>*/}
        {/*  <div className={"flex flex-row "}>*/}
        {/*    <div onClick={togglePlayBack}>play</div>*/}
        {/*    <input*/}
        {/*      onChange={handleRange}*/}
        {/*      type="range"*/}
        {/*      step={1}*/}
        {/*      id="vol"*/}
        {/*      name="vol"*/}
        {/*      min="0"*/}
        {/*      max="100"*/}
        {/*    />*/}
        {/*    <div>{currentVideoTime()}/</div>*/}
        {/*    <div>{totalDuration()}</div>*/}
        {/*    <div onClick={handleFullscreen}>Fullscreen</div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
  );
};

export default CardVideoContainer;
