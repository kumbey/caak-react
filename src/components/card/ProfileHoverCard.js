import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { checkUser, getFileUrl } from "../../Utility/Util";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUserById } from "../../Utility/ApiHelper";
import Loader from "../loader";

export default function ProfileHoverCard({ userId }) {
  const { user } = useUser();
  const [doRender, setDoRender] = useState(0);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  // useEffect(() => {
  //   console.log("FOLLOW: ", postUser.followed);
  // }, [postUser.followed]);

  useEffect(() => {
    setLoading(true);
    if (userId)
      if (checkUser(user)) {
        getUserById({ id: userId, setUser: setProfileUser }).then(() =>
          setLoading(false)
        );
      } else {
        getUserById({
          id: userId,
          setUser: setProfileUser,
          authMode: "AWS_IAM",
        }).then(() => setLoading(false));
      }

    // eslint-disable-next-line
  }, [userId]);

  const createFollowUser = async () => {
    await API.graphql({
      query: createFollowedUsers,
      variables: {
        input: { followed_user_id: user.sysUser.id, user_id: profileUser.id },
      },
    });
    profileUser.totals.followers += 1;
    profileUser.followed = true;
    setDoRender(doRender + 1);
  };

  useEffect(() => {
    return () => {
      setProfileUser(null);
    };
  }, []);

  const deleteFollowUser = async () => {
    await API.graphql({
      query: deleteFollowedUsers,
      variables: {
        input: {
          followed_user_id: user.sysUser.id,
          user_id: userId,
        },
      },
    });
    profileUser.totals.followers -= 1;
    profileUser.followed = false;
    setDoRender(doRender + 1);
  };

  const handleClick = () => {
    if (checkUser(user)) {
      if (!profileUser.followed) {
        createFollowUser();
      } else if (profileUser.followed) {
        deleteFollowUser();
      }
    } else {
      history.push({
        pathname: `/login`,
        state: { background: location },
      });
    }
  };
  return !loading && profileUser.id ? (
    <div
      className="pt-3 pr-6 pb-3 pl-7 bg-white w-ch h-px-154 rounded-square shadow-dropdown"
      // style={{ top: "45px" }}
    >
      <div className="flex flex-row justify-between items-center w-full">
      <Link
          to={{
            pathname: `/user/${profileUser.id}/profile`,
          }}
        >
        <img
          className="w-12 h-12 rounded-full border-2 border-white"
          alt=""
          src={
            profileUser.pic
              ? getFileUrl(profileUser.pic)
              : "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"
          }
        />
        </Link>
        {/*If no user is logged, show only follow button*/}
        {/*And If user is there show follow or unfollow button*/}
        {checkUser(user) ? (
          user.sysUser.id !== profileUser.id ? (
            <button onClick={handleClick} className={"button small  bg-caak-titaniumwhite text-black"}>
              {profileUser.followed ? "Дагасан" : "Дагах"}
            </button>
          ) : null
        ) : (
          <button onClick={handleClick} className={"button small"}>
            Дагах
          </button>
        )}
      </div>
      <div className="mb-px-10">
          <div className="flex items-center">
        <Link
          className="flex items-center"
          to={{
            pathname: `/user/${profileUser.id}/profile`,
          }}
        >
            <p className="text-17px mr-0.5 font-bold">{profileUser.nickname}</p>
            <span className="icon-fi-rs-verified w-3.5 h-3.5 text-caak-buttonblue " />
        </Link>
          </div>
        <p className="font-light text-15px">{profileUser.about}</p>
      </div>
      <div className="flex flex-row justify-between items-center pr-14">
        <div className="flex items-center" style={{ marginRight: "22px" }}>
          <p className="mr-1 font-medium text-18px">{profileUser.aura}</p>
          <p className="font-light text-15px text-caak-darkBlue font-roboto">
            Аура
          </p>
        </div>
        <div className="flex items-center">
          <p className="mr-1 font-medium text-18px">
            {profileUser.totals?.followers}
          </p>
          <p className="font-light text-15px text-caak-darkBlue"> дагагчид</p>
        </div>
      </div>
    </div>
  ) : (
    <Loader
      containerClassName={
        "flex items-center justify-center w-ch h-px-154 rounded-square shadow-dropdown pl-7 z-50 pt-3 pb-3 pr-6 bg-white"
      }
      className={`bg-caak-primary`}
    />
  );
}
