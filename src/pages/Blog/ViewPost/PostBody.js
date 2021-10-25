import CommentCard from "../../../components/card/CommentCard";
import { getReturnData } from "../../../Utility/Util";
import API from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { onCommentByPostItem } from "../../../graphql-custom/comment/subscriptions";

const PostBody = ({ post, activeIndex, posts }) => {
  const subscriptions = {};
  const [subscriptionComment, setSubscriptionComment] = useState(null);
  const [reRender, setReRender] = useState(0);

  const subscrip = () => {
    subscriptions.onCommentByPostItem = API.graphql({
      query: onCommentByPostItem,
      variables: {
        post_item_id: post.id,
      },
      authMode: "AWS_IAM",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionComment(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (subscriptionComment) {
      if (
        !posts.items.items[activeIndex].comments.items.find(
          (item) => item.id === subscriptionComment.id
        )
      ) {
        posts.items.items[activeIndex].comments.items.push(subscriptionComment);
      }
      setReRender(reRender + 1);
    }
    // eslint-disable-next-line
  }, [subscriptionComment]);

  useEffect(() => {
    if (post.id) {
      subscrip();
    }
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [post]);

  return (
    <div
      className={"relative flex flex-col justify-between bg-caak-whitesmoke"}
    >
      {post.comments.items.map((comment, index) => {
        return (
          <CommentCard key={index} comment={comment}>
            {/*<SubCommentCard name={"Bataa"} comment={"Харин тиймээ"}/>*/}
            {/*<SubCommentCard name={"Nomio"} comment={"Харин тиймээ"} />*/}
            {/*<SubCommentCard*/}
            {/*  name={"Tsetsegee"}*/}
            {/*  comment={"Харин тиймээ"}*/}
            {/*/>*/}
            {/*<SubCommentCard name={"Saraa"} comment={"Харин тиймээ"} />*/}
            {/*<SubCommentCard name={"Boloroo"} comment={"Харин тиймээ"} />*/}
          </CommentCard>
        );
      })}
    </div>
  );
};

export default PostBody;
