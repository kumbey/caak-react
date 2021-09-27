import React, { useEffect, useRef, useState } from "react";

const CardVideoContainer = ({ ...data }) => {
  const videoRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const togglePlayBack = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // const handleFullscreen = () => {
  //   videoRef.current.requestFullscreen();
  // };
  //
  // const handleRange = (e) => {
  //   videoRef.current.volume = e.target.value / 100;
  // };

  function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }

  function totalDuration() {
    const time = formatTime(Math.round(videoDuration));
    return `${time.minutes}:${time.seconds}`;
  }

  function currentVideoTime() {
    const time = formatTime(Math.round(currentTime));
    return `${time.minutes}:${time.seconds}`;
  }

  useEffect(() => {
    videoRef.current.ontimeupdate = (e) => {
      setCurrentTime(e.currentTarget.currentTime);
    };
    videoRef.current.onloadeddata = (e) => {
      setVideoDuration(e.currentTarget.duration);
    };
  }, []);
  return (
    <div className={"relative"}>
      <div
        className={
          "flex flex-row tracking-wide items-center leading-none text-center align-middle absolute font-bold top-3 left-3 text-white text-11px bg-black bg-opacity-20 rounded px-2 py-1"
        }
      >
        <span className={"icon-fi-rs-rec mr-1"} />
        {totalDuration()}
      </div>
      {data.length > 1 ? (
        <div
          className={`flex flex-row tracking-wide items-center text-center align-middle absolute font-bold top-3 left-20 text-white text-11px bg-black bg-opacity-20 rounded px-2 py-1`}
        >
          <span className={"icon-fi-rs-album mr-1"} />
          +2
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
          "videoPlayer w-full max-h-80 block object-cover cursor-pointer rounded-square"
        }
      >
        <source src={data.data.preview} type="video/mp4" />
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
