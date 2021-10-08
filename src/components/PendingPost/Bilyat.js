import Poster from "./Poster";
import PostName from "./PostName";

export default function Bilyat({post,onClick}) {
    return (
        <div style={{paddingBlock: "20px", marginLeft: "25px"}} className="flex items-center">
            <PostName onClick={onClick} files={post.items.items} title={post.title}/>
            <Poster 
                user={post.user}
                updatedAt={post.updatedAt}
            />
        </div>
    )
}
