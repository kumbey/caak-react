import Dummy from "dummyjs";
import CommentCard from "../../../components/card/CommentCard";

const PostBody = ({ item }) => {
  return (
    <div
      className={"relative flex flex-col justify-between bg-caak-whitesmoke"}
    >
      {item.comments.items.map((comment, index) => {
        return (
          <div key={index} className={"flex flex-row border-b-2 px-7 mt-2"}>
            <img
              className="m-34px w-10 h-10 rounded-full"
              src={Dummy.image("100x100")}
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
