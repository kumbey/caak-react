import Button from "../button";
import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { useState } from "react";
import { checkUser } from "../../Utility/Util";
import { Link } from "react-router-dom";

export default function ProfileHoverCard({ postUser }) {
  const { user } = useUser();
  const [doRender, setDoRender] = useState(0);

  // useEffect(() => {
  //   console.log("FOLLOW: ", postUser.followed);
  // }, [postUser.followed]);

  const createFollowUser = async () => {
    await API.graphql({
      query: createFollowedUsers,
      variables: {
        input: { followed_user_id: user.sysUser.id, user_id: postUser.id },
      },
    });
    postUser.totals.followers += 1;
    postUser.followed = true;
    setDoRender(doRender + 1);
  };

  const deleteFollowUser = async () => {
    await API.graphql({
      query: deleteFollowedUsers,
      variables: {
        input: {
          followed_user_id: user.sysUser.id,
          user_id: postUser.id,
        },
      },
    });
    postUser.totals.followers -= 1;
    postUser.followed = false;
    setDoRender(doRender + 1);
  };

  const handleClick = () => {
    if (checkUser(user)) {
      if (!postUser.followed) {
        createFollowUser();
      } else if (postUser.followed) {
        deleteFollowUser();
      }
    }

  };
  return (
    <div
      className="w-max rounded-square shadow-dropdown pl-7 pt-3 pb-3 pr-6 bg-white"
      // style={{ top: "45px" }}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <img
          className=" w-12 h-12 border-2 border-white rounded-full"
          alt=""
          src={`https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg`}
        />
        {checkUser(user) && user.sysUser.id !== postUser.id ? (
          <Button
            className="text-15px w-c19 h-c24 font-bold"
            // disabled={postUser.followed}
            onClick={handleClick}
          >
            {postUser.followed ? "Дагасан" : "Дагах"}
          </Button>
        ) : null}
      </div>
      <div className="mb-b1">
        <Link 
          to={{
            pathname: `/user/${postUser.id}/profile`,
          }}
        >
          <div className=" flex items-center">
            <p className="text-17px font-bold">{postUser.nickname}</p>
            <span className="icon-fi-rs-verified text-13px text-caak-buttonblue " />
          </div>
        </Link>
        <p className="text-15px font-light">{postUser.about}</p>
      </div>
      <div className=" pr-14 flex flex-row items-center justify-between">
        <div className="flex items-center" style={{ marginRight: "22px" }}>
          {/*<p className="text-18px mr-1 font-medium">{postUser.aura.point}</p>*/}
          <p className="text-15px text-caak-darkBlue font-roboto font-light">
            Аура
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-18px mr-1 font-medium">
            {postUser.totals.followers}
          </p>
          <p className="text-15px text-caak-darkBlue font-light"> дагагчид</p>
        </div>
      </div>
    </div>
  );
}
