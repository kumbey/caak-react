import Poster from "./Poster";
import PostName from "./PostName";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Button from "../button";
import PendingPostMenuDrop from "../../pages/Group/PendingPostMenuDrop";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import { useState } from "react";
import DropDown from "../navigation/DropDown";

export default function PendingPostItem({ post, onClick, className }) {
  const location = useLocation();
  const { user } = useUser();

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
      style={{ paddingBlock: "20px"}}
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
      <div className="ph:w-full flex w-1/2 ph:mt-3 justify-between relative">
        <div className="w-2/3">
          <Poster user={post.user} updatedAt={post.updatedAt} />
        </div>
        <PendingPostMenuDrop
          setIsMenuOpen={setIsMenuOpen}
          toggleMenu={toggleMenu}
        >
          <DropDown
            className="absolute"
            open={isMenuOpen}
            onToggle={toggleMenu}
            content={
              <div className="flex flex-col w-full p-2">
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
        </PendingPostMenuDrop>
      </div>
    </div>
  );
}
