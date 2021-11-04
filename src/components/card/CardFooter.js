import { Link, useHistory, useLocation } from "react-router-dom";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/userContext";
import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";
import { checkUser, getReturnData, useClickOutSide } from "../../Utility/Util";
import GroupInformationDrop from "../PendingPost/GroupInformationDrop";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const CardFooter = ({ title, totals, items, postId, reacted }) => {
  const location = useLocation();
  const history = useHistory();
  const { user } = useUser();
  const [subscripTotal, setSubscripTotal] = useState();
  const [isReacted, setIsReacted] = useState(reacted);
  const [render, setRender] = useState(0);

  const subscriptions = {};
  const handleClick = () => {
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let totalComment = Object.keys(items[0].comments.items).length;
  const reactionTimer = useRef(null);
  const initReacted = useRef(null);

  const postMenu = [
    {
      id: 0,
      type: "facebook",
      title: "Facebook",
      btn: (
        <FacebookShareButton
          url={`${window.location.origin}/post/view/${postId}`}
          className="Demo__some-network__share-button"
        >
          {/* <FacebookIcon size={32} round />  */}
          Facebook
        </FacebookShareButton>
      ),
    },
    {
      id: 1,
      type: "twitter",
      title: "Twitter",
      btn: (
        <TwitterShareButton
          url={`${window.location.origin}/post/view/${postId}`}
          quote={"quote text here"}
          hashtag={"#twitter"}
          description={"description text here"}
          className="Demo__some-network__share-button"
        >
          {/* <TwitterIcon size={32} round />  */}
          Twitter
        </TwitterShareButton>
      ),
    },
    {
      id: 2,
      type: "linkedin",
      title: "LinkedIn",
      btn: (
        <LinkedinShareButton
          url={`${window.location.origin}/post/view/${postId}`}
          quote={"quote text here"}
          hashtag={"#linkedin"}
          description={"description text here"}
          className="Demo__some-network__share-button"
        >
          {/* <LinkedInIcon size={32} round />  */}
          LinkedIn
        </LinkedinShareButton>
      ),
    },
    {
      id: 3,
      type: "caak",
      icon: <span className="icon-fi-rs-hide text-16px" />,
      title: "Өөр дээрээ",
      btn: "Өөр дээрээ",
    },
  ];

  const localHandler = () => {
    if (checkUser(user)) {
      setIsReacted(!isReacted);
      if (reactionTimer.current) {
        clearTimeout(reactionTimer.current);
      }

      if (!isReacted) {
        totals.reactions += 1;
      } else {
        if (totals.reactions > 0) totals.reactions -= 1;
      }
      if (initReacted.current !== !isReacted) {
        reactionTimer.current = setTimeout(
          () => reactionHandler(!isReacted),
          3000
        );
      }
    } else {
      history.push({
        pathname: "/login",
        state: { background: location },
      });
    }
  };

  const reactionHandler = async (type) => {
    try {
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
      initReacted.current = type;
    } catch (ex) {
      console.log(ex);
    }
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
    initReacted.current = reacted;
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
      totals.reactions = parseInt(subscripTotal.reactions);
      setRender(render + 1);
    }
    // eslint-disable-next-line
  }, [subscripTotal]);

  return (
    <>
      <div className="xs:w-full xs:max-w-full sm:w-96 md:96 max-w-8xl relative flex flex-col justify-between h-full px-4 py-2 pb-4">
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
              onClick={() => localHandler()}
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
            <div
              onClick={() =>
                checkUser(user)
                  ? history.push({
                      pathname: `/post/view/${postId}`,
                      state: { background: location },
                    })
                  : history.push({
                      pathname: "/login",
                      state: { background: location },
                    })
              }
              className={"flex flex-row items-center mr-4 cursor-pointer"}
            >
              <i className={"icon-fi-rs-comment text-16px mr-1.5"} />
              <span>{totalComment}</span>
            </div>
          </div>

          <div
            ref={menuRef}
            onClick={toggleMenu}
            className={"flex flex-row items-center cursor-pointer"}
          >
            <i className={"icon-fi-rs-share text-15px mr-1.5"} />
            <span>Хуваалцах</span>
            <GroupInformationDrop
              className="bottom-12 absolute right-0"
              shadow
              open={isMenuOpen}
              onToggle={handleClick}
              content={postMenu.map((data) => (
                <div
                  key={data.id}
                  style={{ height: "36px" }}
                  className="px-c6 hover:bg-caak-liquidnitrogen flex items-center cursor-pointer"
                >
                  <span className="icon-fi-rs-drag text-14px" />
                  <p className="text-14px text-caak-extraBlack ml-px-12">
                    {data.btn}
                  </p>
                </div>
              ))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFooter;
