import Poster from "./Poster";
import PostName from "./PostName";

export default function Bilyat({post}) {
    return (
        <div style={{paddingBlock: "20px", marginLeft: "25px"}} className="flex items-center">
            <PostName files={post.items.items} title={post.title}/>
            <Poster user={post.user}
                updatedAt={post.updatedAt}/>
        </div>
    )
}
