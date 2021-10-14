import CommentCard from "../../../components/card/CommentCard";
import { getFileUrl, getReturnData } from "../../../Utility/Util";
import Dummy from "dummyjs";
import API from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { onCommentByPostItem } from "../../../graphql-custom/comment/subscriptions";

const PostBody = ({ post, activeIndex, posts }) => {
  const subscriptions = {};
  const [subscriptionComment, setSubscriptionComment] = useState({});

  const subscrip = () => {
    subscriptions.onCreateCategory = API.graphql({
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
    if (subscriptionComment.comment)
      if (
        !posts.items.items[activeIndex].comments.items[
          posts.items.items[activeIndex].comments.items.length - 1
        ].post_item_id
      ) {
        posts.items.items[activeIndex].comments.items.push(subscriptionComment);
      }
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
          <div key={index} className={"flex flex-row border-b-2 px-7 mt-2"}>
            <img
              className="m-34px w-10 h-10 rounded-full"
              src={
                comment.user.pic
                  ? getFileUrl(comment.user.pic)
                  : Dummy.image("100x100")
              }
              alt="Alex"
            />
            <CommentCard comment={comment}>
              {/*<SubCommentCard name={"Bataa"} comment={"Харин тиймээ"}/>*/}
              {/*<SubCommentCard name={"Nomio"} comment={"Харин тиймээ"} />*/}
              {/*<SubCommentCard*/}
              {/*  name={"Tsetsegee"}*/}
              {/*  comment={"Харин тиймээ"}*/}
              {/*/>*/}
              {/*<SubCommentCard name={"Saraa"} comment={"Харин тиймээ"} />*/}
              {/*<SubCommentCard name={"Boloroo"} comment={"Харин тиймээ"} />*/}
            </CommentCard>
          </div>
        );
      })}
    </div>
  );
};

export default PostBody;
