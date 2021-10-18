import { Link, useLocation } from "react-router-dom";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";
import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";
import { getReturnData } from "../../Utility/Util";

const CardFooter = ({ title, totals, items, postId, reacted }) => {
  const location = useLocation();
  const { user } = useUser();
  const [isReacted, setIsReacted] = useState(reacted);
  const [subscripTotal, setSubscripTotal] = useState();
  const [render, setRender] = useState(0);
  const subscriptions = {};

  let totalComment = Object.keys(items[0].comments.items).length;

  const updateReaction = async (type) => {
    if (type) {
      totals.reactions += 1;
    } else {
      totals.reactions -= 1;
    }
    console.log(totals);
    setIsReacted(!isReacted);
    if (type) {
      await API.graphql(
        graphqlOperation(createReaction, {
          input: {
            id: postId,
            on_to: "POST",
            type: "CAAK",
            user_id: user.sysUser.id,
          },
        })
      );
    } else {
      await API.graphql(
        graphqlOperation(deleteReaction, {
          input: {
            id: postId,
            user_id: user.sysUser.id,
          },
        })
      );
    }

    // console.log(resp);
  };

  const subscrip = () => {
    subscriptions.onChangedTotalsBy = API.graphql({
      query: onChangedTotalsBy,
      variables: {
        type: "PostTotal",
        id: postId,
      },
      authMode: "AWS_IAM",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscripTotal(JSON.parse(onData.totals));
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    subscrip();

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (subscripTotal) {
      totals.reactions = subscripTotal.reactions;
      setRender(render + 1);
    }
    // eslint-disable-next-line
  }, [subscripTotal]);

  return (
    <div className="xs:w-full xs:max-w-full sm:w-96 md:96 max-w-8xl flex flex-col justify-between h-full px-4 py-2 pb-4">
      <Link
        to={{
          pathname: `/post/view/${postId}`,
          state: { background: location },
        }}
      >
        <p className="text-generalblack text-17px font-bold leading-5 break-words">
          {title}
        </p>
      </Link>

      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px mt-3"
        }
      >
        <div className={"flex flex-row"}>
          <div
            onClick={() => updateReaction(!isReacted)}
            className={
              "flex flex-row group items-center mr-4 cursor-pointer hover:text-caak-primary hover:bg-caak-peachbreeze rounded-full p-2 h-7 w-7"
            }
          >
            <i
              className={`${
                isReacted
                  ? "icon-fr-rs-caak-active text-caak-primary"
                  : "icon-fr-rs-caak"
              } text-16px mr-1.5 text-caak-extraBlack`}
            />
            <span>{totals.reactions}</span>
          </div>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i
              className={
                "icon-fi-rs-comment text-16px mr-1.5 text-caak-extraBlack"
              }
            />
            <span>{totalComment}</span>
          </div>
        </div>
        <div className={"flex flex-row items-center cursor-pointer"}>
          <i className={"icon-fi-rs-share text-15px mr-1.5"} />

          <span>Хуваалцах</span>
        </div>
      </div>
    </div>
  );
};

export default CardFooter;
