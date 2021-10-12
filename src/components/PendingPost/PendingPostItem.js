import Poster from "./Poster";
import PostName from "./PostName";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function PendingPostItem({post, onClick, className}) {
    const location = useLocation();
    return (
        <div style={{paddingBlock: "20px", marginLeft: "25px"}} className={`flex ph:grid w-full items-center ${className ? className : ""}`}>
            <div className="w-1/2 ph:w-full">
                <Link
                    to={{
                        pathname: `/pending/view/${post.id}`,
                        state: { background: location },
                    }}
                >
                    <PostName video={post.items.items[0].file.type.startsWith("video")} onClick={onClick} files={post.items.items} title={post.title}/>
                </Link>
            </div>
            <div className="w-1/2 ph:w-full ph:mt-3">
                <Poster user={post.user} updatedAt={post.updatedAt}/>
            </div>
        </div>
    )
}
