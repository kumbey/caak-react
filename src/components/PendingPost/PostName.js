import { generateFileUrl } from "../../Utility/Util";
import VideoJS from "../card/VideoJS";
export default function PostName({files, title,video, onClick}){
    return (
        <div 
            style={{otextOverflow: "ellipsis", wordBreak: "break-all"}} 
            onClick={onClick} 
            className='flex items-center cursor-pointer pl-6 mr-5'>

        {video ? (
            <VideoJS
                files={files}
                videoClassName={`videoPlayer rounded-lg video-js vjs-big-play-centered h-c7 w-c33`}
            /> 
                ? 
            <img
                src={"https://images-na.ssl-images-amazon.com/images/I/31OQNoCuVdL.png"}
                className={"h-c7 w-c33 rounded-lg "}
                alt={""}
            /> : null
            ) : (
                <img
                src={generateFileUrl(files.length > 0 && files[0].file)}
                className={"h-c7 w-c33 rounded-lg object-cover"}
                alt={""}
            />
        )}
        <p className="text-15px" style={{marginInline: "20px"}}>{title}</p>
        </div>
    )
}
