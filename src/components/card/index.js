import CardVideoContainer from "./CardVideoContainer";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardImageContainer from "./CardImageContainer";

const Card = ({ video, verifiedUser, post }) => {

  return post && (
    <div className="flex flex-col justify-between mx-auto bg-white rounded-xl card shadow-card">
      <div className={"flex flex-col "}>
        <CardHeader
          postUser={post.user}
          postId={post.id}
          group={post.group}
          updatedAt={post.updatedAt}
        />
        {video ? (
          <CardVideoContainer postId={post.id} files={post.items.items} />
        ) : (
          <CardImageContainer postId={post.id} files={post.items.items} />
        )}
      </div>

      <CardFooter
        reacted={post.reacted}
        postId={post.id}
        title={post.title}
        totals={post.totals}
        items={post.items.items}
      />
    </div>
  );
};

export default Card;
