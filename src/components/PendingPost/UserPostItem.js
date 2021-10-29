import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import VideoJS from "../card/VideoJS";
import { generateFileUrl, getFileUrl, generateTimeAgo } from "../../Utility/Util";
import Dummy from "dummyjs"

export default function UserPostItem({ post, className }) {

  const location = useLocation();

  return (
    <Link
      className="w-full"
        to={{
          pathname: `/pending/view/${post.id}`,
          state: { background: location },
        }}
    >
        <div
          style={{ paddingBlock: "20px"}}
          className={`flex ph:grid w-full items-center ${
            className ? className : ""
          }`}
        >
          <div className="flex sm:w-1/2">
            <div 
              style={{textOverflow: "ellipsis", wordBreak: "break-all"}} 
              className='flex items-center cursor-pointer pl-6 mr-5 '
            >
              {post.items.items[0].file.type.startsWith("video") ? (
                <VideoJS
                  files={post.items.items}
                  videoClassName={`videoPlayer rounded-lg video-js vjs-big-play-centered h-c7 w-c33`}
                /> 
                ? 
                <img
                  src={"https://images-na.ssl-images-amazon.com/images/I/31OQNoCuVdL.png"}
                  className={"h-c7 w-c33 rounded-lg object-cover"}
                  alt={""}
                /> : null
                ) : (
                  <img
                    src={generateFileUrl(post.items.items.length > 0 && post.items.items[0].file)}
                    className={"h-c7 w-c33 rounded-lg object-cover"}
                    alt={""}
                  />
                )
              }
              <p className="text-15px" style={{marginInline: "20px"}}>{post.title}</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center ph:mt-3 sm:w-1/2">
            <div className="flex items-center justify-center sm:justify-evenly w-full">
              <div className="flex items-center ph:w-1/2">
                <img
                  className="ph:w-c2 ph:h-c2 w-8 h-8 rounded-full object-cover"
                  src={post.group?.profile ? getFileUrl(post.group?.profile) : Dummy.img("100x100")}
                  alt=""
                />
                <p className="text-15px ml-px-7">{post.group?.name}</p>
              </div>
              <div className="flex items-center">
                <span className={"text-darkblue text-12px text-center flex justify-center"}>
                  {generateTimeAgo(post.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
    </Link>
  );
}
