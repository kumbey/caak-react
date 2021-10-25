import Poster from "./Poster";
import PostName from "./PostName";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function UserPostItem({ post, onClick, className }) {
  const location = useLocation();

  return (
    <div
      style={{ paddingBlock: "20px", marginLeft: "25px" }}
      className={`flex ph:grid w-full justify-between items-center ${
        className ? className : ""
      }`}
    >
      <div>
        <Link
          to={{
            pathname: `/pending/view/${post.id}`,
            state: { background: location },
          }}
        >
          <PostName
            video={post.items.items.length > 0 && post.items.items[0].file.type.startsWith("video")}
            onClick={onClick}
            files={post.items.items}
            title={post.title}
          />
        </Link>
      </div>
      <div className="ph:w-full ph:mt-3 w-1/2">
        <Poster user={post.user} updatedAt={post.updatedAt} />
      </div>
    </div>
  );
}
