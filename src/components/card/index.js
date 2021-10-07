import CardVideoContainer from "./CardVideoContainer";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardImageContainer from "./CardImageContainer"; // es6

const Card = ({ video, verifiedUser, post }) => {
  return (
    <div className="rounded-xl shadow-card max-w-8xl mx-auto flex flex-col justify-between bg-white">
        <div className={"flex flex-col"}>
            <CardHeader
                user={post.user}
                group={post.group}
                updatedAt={post.updatedAt}
            />
            {video ? (
                <CardVideoContainer files={post.items.items} />
            ) : (
                <CardImageContainer files={post.items.items} />
            )}
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
