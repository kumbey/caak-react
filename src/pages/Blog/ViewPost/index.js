import { useState } from "react";
import ImageCarousel from "../../../components/carousel/ImageCarousel";
import Button from "../../../components/button";
import CommentCard from "../../../components/card/CommentCard";
import SubCommentCard from "../../../components/card/SubCommentCard";
import PostHeader from "./PostHeader";

const ViewPost = () => {
  let i = 0;
  // const items = Array.from(Array(20), () => ({ id: i++ }));
  const [items] = useState(() =>
    Array.from(Array(10), () => ({
      id: i++,
      src: `https://picsum.photos/id/${Math.floor(
        Math.random(0, 1) * 10
      )}/${Math.floor(Math.random(0, 1) * 800)}`,
    }))
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const nextItem = () => {
    if (activeIndex !== items.length - 1) setActiveIndex(activeIndex + 1);
  };

  const prevItem = () => {
    if (activeIndex !== 0) setActiveIndex(activeIndex - 1);
  };
  return (
    <div
      className={
        "fullscreen_header_size flex flex-col justify-between sm:flex-row md:flex-col lg:flex-row"
      }
    >
      <div
        className={
          "relative max-w-full w-full  flex justify-center items-center bg-black bg-opacity-60 h-full"
        }
      >
        <span
          onClick={() => prevItem()}
          className={
            "cursor-pointer absolute text-2xl left-2 text-white z-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
          }
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
        <span
          onClick={() => nextItem()}
          className={
            "cursor-pointer z-10 absolute text-2xl right-2 text-white top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
          }
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
        <ImageCarousel>
          {items.map((item, index) => {
            if (activeIndex === index)
              return (
                <img
                  className={`h-full w-auto max-h-half`}
                  key={index}
                  src={item.src}
                  alt={""}
                />
              );
            return null;
          })}
        </ImageCarousel>
        <div className={"flex flex-row absolute bottom-6"}>
          {items.map((_, index) => {
            return (
              <div
                key={index}
                className={`rounded-full mr-1.5 w-2 h-2 bg-white ${
                  activeIndex === index ? "bg-opacity-100" : "bg-opacity-40"
                } `}
              />
            );
          })}
        </div>
      </div>
      <div
        className={
          "relative flex flex-col w-full  max-w-xl md:w-3/4 bg-white h-full pt-7 overflow-y-scroll"
        }
      >
        <div className={"cursor-pointer absolute right-4 top-0 z-50"}>
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
        <div className={"relative flex flex-row px-7"}>
          <div className={"relative"}>
            <img
              className="w-c60 m-34px rounded-square"
              src="https://i.pravatar.cc/100"
              alt="Alex"
            />
            <img
              className="-bottom-2 -right-3 w-9 absolute border-2 border-white rounded-full"
              src="https://i.pravatar.cc/100?img=3"
              alt="John"
            />
          </div>
          <div className={"flex flex-col justify-center ml-5 self-center"}>
            <span className={"text-caak-generalblack font-bold text-18px"}>
              Developers
            </span>
            <span className={"text-caak-generalblack text-15px"}>@Tulgaa</span>
          </div>
        </div>
        <PostHeader />

        <div
          className={
            "relative flex flex-col justify-between bg-caak-whitesmoke pt-4"
          }
        >
          <div className={"flex flex-row border-b-2 px-7"}>
            <img
              className="m-34px w-10 h-10 rounded-full"
              src="https://i.pravatar.cc/100"
              alt="Alex"
            />
            <CommentCard>
              <SubCommentCard name={"Bataa"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Nomio"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Tsetsegee"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Saraa"} comment={"Харин тиймээ"} />
              <SubCommentCard name={"Boloroo"} comment={"Харин тиймээ"} />
            </CommentCard>
          </div>
          <div
            className={
              "bg-white sticky bottom-0 right-0 left-0 flex flex-row justify-between items-center py-3"
            }
          >
            <div className={"flex flex-row justify-center items-center"}>
              <img
                className="border-caak-primary w-10 h-10 ml-5 border-2 rounded-full"
                src="https://i.pravatar.cc/100"
                alt="Alex"
              />
            </div>
            <div className={"relative flex w-3/5 justify-center items-center"}>
              <textarea
                rows={1}
                className={
                  "px-2.5 border-0 bg-caak-liquidnitrogen w-full text-caak-darkBlue rounded-square text-16px  focus:ring-1 ring-caak-primary"
                }
                placeholder={"Сэтгэгдэл үлдээх"}
              />
              <div
                className={
                  "flex flex-row absolute right-2 text-18px text-caak-generalblack"
                }
              >
                <span className={"icon-fi-rs-mention mr-2"} />
                <span className={"icon-fi-rs-emoji"} />
              </div>
            </div>

            <Button
              className={
                "bg-white text-caak-primary py-2 text-15px font-medium h-full mx-2 border-0 shadow-none"
              }
            >
              Илгээх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
