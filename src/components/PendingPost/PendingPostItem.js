import Poster from "./Poster";
import PostName from "./PostName";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Button from "../button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import { useState } from "react";
import DropDown from "../navigation/DropDown";
import { useUser } from "../../context/userContext";
import { updateStatus } from "../../apis/post/updateStatus";
import { useClickOutSide } from "../../Utility/Util";

export default function PendingPostItem({ post, onClick, className }) {
  const location = useLocation();
  const { user } = useUser();
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const postHandler = async (id, status) => {
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
    } catch (ex) {
      if (
        ex.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
      ) {
        updateStatus(post, user.sysUser.id, status);
      }
    }
  };

  return (
    <div
      style={{ paddingBlock: "20px" }}
      className={`flex ph:grid w-full items-center ${
        className ? className : ""
      }`}
    >
      <div className="w-1/2">
        <Link
          to={{
            pathname: `/pending/view/${post.id}`,
            state: { background: location },
          }}
        >
          <PostName
            video={post.items.items[0].file.type.startsWith("video")}
            onClick={onClick}
            files={post.items.items}
            title={post.title}
          />
        </Link>
      </div>
      <div className="ph:w-full ph:mt-3 relative flex justify-between w-1/2">
        <div className="w-2/3">
          <Poster user={post.user} updatedAt={post.updatedAt} />
        </div>
        <div
          onClick={toggleMenu}
          ref={menuRef}
          className={`flex justify-center w-c8 h-c8 items-center cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full`}
        >
          <span className="icon-fi-rs-dots text-4px" />
          <DropDown
            className={"top-5"}
            open={isMenuOpen}
            onToggle={toggleMenu}
            content={
              <div className="dropdown-item-wrapper flex flex-col w-full p-2">
                <Button
                  onClick={() => postHandler(post.id, "CONFIRMED")}
                  className="bg-caak-bleudefrance text-15px w-full mb-2 mr-2 text-white"
                >
                  Зөвшөөрөх
                </Button>
                <Button
                  onClick={() => postHandler(post.id, "ARCHIVED")}
                  className="text-caak-generalblack text-15px w-full bg-white border"
                >
                  Татгалзах
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
