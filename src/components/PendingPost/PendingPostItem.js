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

export default function PendingPostItem({ post, onClick, className }) {
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
      className={`flex ph:grid w-full justify-between items-center ${
        className ? className : ""
      }`}
    >
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
      <div className="ph:w-full ph:mt-3 w-1/2">
        <Poster user={post.user} updatedAt={post.updatedAt} />
      </div>
      <div className="2xl:flex sm:block md:block lg:block xl:mr-c24 sm:mr-px-10 relative flex items-center justify-end hidden">
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
              <div className="sm:block md:block lg:block flex flex-col items-center justify-center hidden w-full p-2">
                <Button
                  onClick={() => acceptHandler()}
                  className="bg-caak-bleudefrance text-15px w-full mb-2 mr-2 text-white"
                >
                  Зөвшөөрөх
                </Button>
                <Button
                  onClick={() => declineHandler()}
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
