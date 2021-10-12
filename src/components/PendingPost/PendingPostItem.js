import Poster from "./Poster";
import PostName from "./PostName";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Button from "../button";
import PendingPostMenuDrop from "../../pages/Group/PendingPostMenuDrop";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import GroupInformationDrop from "./GroupInformationDrop";
import { useState } from "react";

export default function PendingPostItem({ post, onClick, className, settt }) {
  const location = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const acceptHandler = async () => {
    await API.graphql(
      graphqlOperation(updatePost, {
        input: { id: post.id, status: "CONFIRMED" },
      })
    );
  };

  const declineHandler = async () => {
    await API.graphql(
      graphqlOperation(updatePost, {
        input: { id: post.id, status: "ARCHIVED" },
      })
    );
  };
  return (
    <div
      style={{ paddingBlock: "20px", marginLeft: "25px" }}
      className={`flex ph:grid w-full items-center ${
        className ? className : ""
      }`}
    >
      <div>
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
      <div className="w-1/2 ph:w-full ph:mt-3">
        <Poster user={post.user} updatedAt={post.updatedAt} />
      </div>
      <div className="flex hidden relative justify-end items-center 2xl:flex sm:block md:block lg:block xl:mr-c24 sm:mr-b1">
        <PendingPostMenuDrop
          setIsMenuOpen={setIsMenuOpen}
          toggleMenu={toggleMenu}
          containerClassName={"sm:block md:block lg:block"}
        >
          <GroupInformationDrop
            className="block"
            open={isMenuOpen}
            onToggle={toggleMenu}
            content={
              <div className="flex hidden flex-col justify-center items-center p-2 w-full sm:block md:block lg:block">
                <Button
                  onClick={() => acceptHandler()}
                  className="mr-2 mb-2 w-full text-white bg-caak-bleudefrance text-15px"
                >
                  Зөвшөөрөх
                </Button>
                <Button
                  onClick={() => declineHandler()}
                  className="w-full bg-white border text-caak-generalblack text-15px"
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
