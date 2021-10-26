import Poster from "./Poster";
import PostName from "./PostName";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

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
              <PostName
                video={post.items.items[0].file.type.startsWith("video")}
                onClick={onClick}
                files={post.items.items}
                title={post.title}
              />
          </div>
          <div className="ph:w-full ph:mt-3 w-1/3">
            <Poster user={post.user} updatedAt={post.updatedAt} />
          </div>
        </div>
    </Link>
  );
}
