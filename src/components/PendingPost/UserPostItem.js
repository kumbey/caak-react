import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import VideoJS from "../card/VideoJS";
import { generateFileUrl, getFileUrl, generateTimeAgo } from "../../Utility/Util";
import Dummy from "dummyjs"

export default function UserPostItem({ post, onClick, className }) {
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
          <div className="flex w-1/2">
          <div 
            style={{textOverflow: "ellipsis", wordBreak: "break-all"}} 
            className='flex items-center cursor-pointer pl-6 mr-5'>

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
        )}
        <p className="text-15px" style={{marginInline: "20px"}}>{post.title}</p>
        </div>
          </div>
          <div className="ph:w-full ph:mt-3 w-1/3">
          <div className="sm:flex flex-row items-center justify-between w-full">
      <div className="flex items-center">
        <img
          className="ph:w-c2 ph:h-c2 w-8 h-8 rounded-full object-cover"
          src={post.user?.pic ? getFileUrl(post.user?.pic) : Dummy.img("100x100")}
          alt=""
        />
        <p className="text-15px ml-px-7">{post.user?.firstname}</p>
      </div>

      <div className="flex items-center">
        <span className={"text-darkblue text-12px"}>
          {generateTimeAgo(post.updatedAt)}
        </span>
      </div>
    </div>
          </div>
        </div>
    </Link>
  );
}
