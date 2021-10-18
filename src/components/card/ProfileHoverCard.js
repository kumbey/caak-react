import Button from "../button";
import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { checkUser, getFileUrl } from "../../Utility/Util";
import { Link } from "react-router-dom";
import { getUserById } from "../../Utility/ApiHelper";

export default function ProfileHoverCard({ userId }) {
  const { user } = useUser();
  const [doRender, setDoRender] = useState(0);
  const [profileUser, setProfileUser] = useState({});
  // useEffect(() => {
  //   console.log("FOLLOW: ", postUser.followed);
  // }, [postUser.followed]);

  useEffect(() => {
    if (userId) {
      if (checkUser(user)) {
        getUserById({ id: userId, setUser: setProfileUser });
      } else {
        getUserById({
          id: userId,
          setUser: setProfileUser,
          authMode: "AWS_IAM",
        });
      }
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

  useEffect(()=> {
    return ()=> {
      setProfileUser(null)
    }
  },[])

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
    }
  };
  return profileUser.id ? (
    <div
      className="w-max rounded-square shadow-dropdown pl-7 pt-3 pb-3 pr-6 bg-white z-50"
      // style={{ top: "45px" }}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <img
          className=" w-12 h-12 border-2 border-white rounded-full"
          alt=""
          src={
            profileUser.pic
              ? getFileUrl(profileUser.pic)
              : "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"
          }
        />
        {checkUser(user) && user.sysUser.id !== profileUser.id ? (
          <Button
            className="text-15px w-c19 h-c24 font-bold"
            // disabled={postUser.followed}
            onClick={handleClick}
          >
            {profileUser.followed ? "Дагасан" : "Дагах"}
          </Button>
        ) : null}
      </div>
      <div className="mb-b1">
        <Link
          to={{
            pathname: `/user/${profileUser.id}/profile`,
          }}
        >
          <div className=" flex items-center">
            <p className="text-17px mr-0.5 font-bold">{profileUser.nickname}</p>
            <span className="icon-fi-rs-verified w-3.5 h-3.5 text-caak-buttonblue " />
          </div>
        </Link>
        <p className="text-15px font-light">{profileUser.about}</p>
      </div>
      <div className=" pr-14 flex flex-row items-center justify-between">
        <div className="flex items-center" style={{ marginRight: "22px" }}>
          <p className="text-18px mr-1 font-medium">{profileUser.aura}</p>
          <p className="text-15px text-caak-darkBlue font-roboto font-light">
            Аура
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-18px mr-1 font-medium">
            {profileUser.totals?.followers}
          </p>
          <p className="text-15px text-caak-darkBlue font-light"> дагагчид</p>
        </div>
      </div>
    </div>
  ) : null;
}
