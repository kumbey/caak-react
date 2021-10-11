import { generateFileUrl } from "../../Utility/Util"
import VideoJS from "../card/VideoJS"
export default function PostName({title,files, onClick, video}) {

    return (
        <div onClick={onClick} className='flex items-center cursor-pointer'>

        {video ? (
            <VideoJS
                files={files}
                videoClassName={`videoPlayer rounded-lg video-js vjs-big-play-centered h-c7 w-c33`}
            /> 
                ? 
            <img
                src={"https://images-na.ssl-images-amazon.com/images/I/31OQNoCuVdL.png"}
                className={"h-c7 w-c33 rounded-lg"}
                alt={""}
            /> : null
            ) : (
                <img
                src={generateFileUrl(files[0].file)}
                className={"h-c7 w-c33 rounded-lg"}
                alt={""}
            />
        )}
            
            <p style={{marginInline: "20px"}}>{title}</p>
        </div>
    )
}
