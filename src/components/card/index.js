import React from "react";

const Card = ({ video, verifiedUser, data }) => {
  return (
    <div className="rounded-xl duration-400 mx-auto transition ease-in transform bg-white shadow">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center justify-between py-4">
          <div className={"relative"}>
            <img
              className="w-9 rounded-lg"
              src="https://i.pravatar.cc/100"
              alt="Alex"
            />
            <img
              className="-bottom-1.5 -right-1.5 absolute w-6 border-2 border-white rounded-full"
              src="https://i.pravatar.cc/100?img=3"
              alt="John"
            />
          </div>

          <div className="ml-3">
            <div className={"flex flex-row  items-center"}>
              <span className="text-generalblack mr-1 text-sm font-bold cursor-pointer">
                Tulgaa
              </span>
              {verifiedUser ? (
                <div
                  className={"bg-blue-verified text-white rounded-full p-px"}
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
              <p className="hover:underline text-generalblack text-xs cursor-pointer">
                @Developer
              </p>
              <span className={"text-darkblue text-xs mx-1"}>•</span>
              <span className={"text-darkblue text-xs"}>30мин өмнө</span>
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
        <video
          controls
          disablePictureInPicture
          controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
          className={"w-full max-h-96 block object-cover"}
        >
          <source
            src="https://assets.mixkit.co/videos/download/mixkit-portrait-of-a-woman-in-a-pool-1259.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <img
          src={data.src}
          alt=""
          className={"w-full max-h-96 block object-cover"}
        />
      )}

      <div className="px-4 py-2 pb-4">
        <h1 className="text-generalblack text-lg font-bold leading-5">
          Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!
        </h1>
        <div
          className={
            "flex flex row justify-between text-blue-primary text-sm mt-3"
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
