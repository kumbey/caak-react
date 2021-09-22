import Dummy from "dummyjs";

const Card = ({video, verifiedUser, ...data}) => {
    // const videoRef = useRef();
    // const [currentTime, setCurrentTime] = useState(0);
    // const [videoDuration, setVideoDuration] = useState(0);
    //
    // const togglePlayBack = () => {
    //     if (videoRef.current.paused) {
    //         videoRef.current.play();
    //     } else {
    //         videoRef.current.pause();
    //     }
    // };
    //
    // const handleFullscreen = () => {
    //     videoRef.current.webkitEnterFullscreen();
    // };
    //
    // const handleRange = (e) => {
    //     videoRef.current.volume = e.target.value / 100;
    // };
    //
    // function formatTime(timeInSeconds) {
    //     const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    //
    //     return {
    //         minutes: result.substr(3, 2),
    //         seconds: result.substr(6, 2),
    //     };
    // }
    //
    // function totalDuration() {
    //     const time = formatTime(Math.round(videoDuration));
    //     return `${time.minutes}:${time.seconds}`;
    // }
    //
    // function currentVideoTime() {
    //     const time = formatTime(Math.round(currentTime));
    //     return `${time.minutes}:${time.seconds}`;
    // }
    //
    // useEffect(() => {
    //     videoRef.current.onloadeddata = (e) => {
    //         setVideoDuration(e.currentTarget.duration);
    //     };
    // }, []);
    //
    // useEffect(() => {
    //     videoRef.current.ontimeupdate = (e) => {
    //         setCurrentTime(e.currentTarget.currentTime);
    //     };
    // }, []);

    return (
        <div className="rounded-xl shadow-card mx-auto transition bg-white">
            <div className="h-14 flex items-center justify-between px-4">
                <div className="flex items-center justify-between py-4">
                    <div className={"relative"}>
                        <img
                            className="w-34px m-34px rounded-square"
                            src="https://i.pravatar.cc/100"
                            alt="Alex"
                        />
                        <img
                            className="-bottom-1.5 -right-1.5 absolute w-22px border-2 border-white rounded-full"
                            src="https://i.pravatar.cc/100?img=3"
                            alt="John"
                        />
                    </div>

                    <div className="ml-3">
                        <div className={"flex flex-row  items-center"}>
              <span className="text-generalblack text-14px mr-1 font-bold cursor-pointer">
                Developers
              </span>
                            {verifiedUser ? (
                                <div
                                    className={"bg-caak-buttonblue text-white rounded-full p-px"}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-2.5 h-2.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className={"flex flex-row items-center"}>
                            <p className="hover:underline text-generalblack text-12px cursor-pointer">
                                @Tulgaa
                            </p>
                            <span className={"text-darkblue text-12px mx-1"}>•</span>
                            <span className={"text-darkblue text-12px"}>30мин өмнө</span>
                        </div>
                    </div>
                </div>
                <div className={"cursor-pointer"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                    </svg>
                </div>
            </div>
            {video ? (
                <div className={"relative"}>
                    {/*<div className={"absolute top-0 left-0 text-white"}>{totalDuration()}</div>*/}
                    <video
                        // onClick={togglePlayBack}
                        // ref={videoRef}
                        // ref={videoRef}
                        // controls
                        disablePictureInPicture
                        controlsList="nodownload noremoteplayback noplaybackrate"
                        className={
                            "videoPlayer w-full max-h-96 block object-cover cursor-pointer"
                        }
                    >
                        <source
                            src="https://assets.mixkit.co/videos/download/mixkit-portrait-of-a-woman-in-a-pool-1259.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="w-full relative w-full bg-gray-200 rounded">
                        <div
                            style={{width: "60"}}
                            className="shim-green absolute top-0 h-4 rounded"
                        >sdadas</div>
                    </div>
                    <div className={"absolute bottom-0"}>
                        <div className={"flex flex-row "}>

                            {/*<div onClick={togglePlayBack}>play</div>*/}
                            <input
                                // onChange={handleRange}
                                type="range"
                                step={1}
                                id="vol"
                                name="vol"
                                min="0"
                                max="100"
                            />
                            {/*<div>{currentVideoTime()}/</div>*/}
                            {/*<div>{totalDuration()}</div>*/}
                            {/*<div onClick={handleFullscreen}>Fullscreen</div>*/}

                        </div>
                    </div>
                </div>
            ) : (
                <img
                    alt=""
                    data-dummy="400,100x100,600"
                    src={Dummy.img("400,100x100,800")}
                    className={"w-full max-h-96 block object-cover"}
                />
                // <img
                //   src={data.src}
                //   alt=""
                //   className={"w-full max-h-96 block object-cover"}
                // />
            )}

            <div className="px-4 py-2 pb-4">
                <h1 className="text-generalblack text-17px font-bold leading-5">
                    Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!
                </h1>
                <div
                    className={
                        "flex flex row justify-between text-blue-primary text-14px mt-3"
                    }
                >
                    <div className={"flex flex-row"}>
                        <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            <span>23</span>
                        </div>
                        <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                />
                            </svg>
                            <span>4.5k</span>
                        </div>
                    </div>
                    <div className={"flex flex-row items-center cursor-pointer"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>
                        <span>Хуваалцах</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
