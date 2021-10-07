import CardVideoContainer from "./CardVideoContainer";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardImageContainer from "./CardImageContainer";

const Card = ({ video, verifiedUser, post, onClick }) => {
  return (
    <div className="rounded-xl shadow-card max-w-8xl flex flex-col justify-between mx-auto bg-white">
      <div className={"flex flex-col"}>
        <CardHeader
          user={post.user}
          group={post.group}
          updatedAt={post.updatedAt}
        />
        <div onClick={onClick}>
          {video ? (
            <CardVideoContainer files={post.items.items} />
          ) : (
            <CardImageContainer files={post.items.items} />
          )}
        </div>
      </div>

      <CardFooter
        title={post.title}
        reactions={post.totals.reactions}
        comments={post.items.items}
      />
    </div>
  );
};

export default Card;
