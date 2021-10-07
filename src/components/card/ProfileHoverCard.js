import Button from "../button";
import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { useEffect } from "react";

export default function ProfileHoverCard({ setHover, user }) {
  const loggedUser = useUser().user.username;
  const groupCreatorUser = user.id;

  useEffect(() => {
    console.log("FOLLOW: ", user.followed);
  }, [user.followed]);

  const createFollowUser = async () => {
    let resp = await API.graphql({
      query: createFollowedUsers,
      variables: {
        input: { followed_user_id: loggedUser, user_id: groupCreatorUser },
      },
    });
    console.log(resp);
  };

  const deleteFollowUser = async () => {
    let resp = await API.graphql({
      query: deleteFollowedUsers,
      variables: {
        input: {
          followed_user_id: loggedUser,
          user_id: groupCreatorUser,
        },
      },
    });
    console.log(resp);
  };

  const handleClick = () => {
    if (!user.followed) {
      createFollowUser();
    } else if (user.followed) {
      deleteFollowUser();
    }
    console.log("clikced");
  };
  return (
    <div
      onMouseLeave={setHover}
      className="dropdown left-5 pl-7 pb-3 pr-6 bg-white"
      style={{ top: "45px" }}
    >
      <div className="mt-c6 flex flex-row items-center justify-between w-full">
        <img
          className=" w-12 h-12 border-2 border-white rounded-full"
          alt=""
          src={`https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg`}
        />
        <Button
          className="text-15px w-c19 h-c24 font-bold"
          // disabled={user.followed}
          onClick={handleClick}
        >
          {`${user.followed}` ? "Дагасан" : "Дагах"}
        </Button>
      </div>
      <div className="mb-b1">
        <div className=" flex items-center">
          <p className="text-17px font-bold">{user.nickname}</p>
          <span className="icon-fi-rs-verified text-13px text-caak-buttonblue " />
        </div>
        <p className="text-15px font-light">{user.about}</p>
      </div>
      <div className=" pr-14 flex flex-row items-center justify-between">
        <div className="flex items-center" style={{ marginRight: "22px" }}>
          <p className="text-18px mr-1 font-medium">{user.aura.point}</p>
          <p className="text-15px text-caak-darkBlue font-roboto font-light">
            Аура
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-18px mr-1 font-medium">{user.totals.followers}</p>
          <p className="text-15px text-caak-darkBlue font-light"> дагагчид</p>
        </div>
      </div>
    </div>
  );
}
