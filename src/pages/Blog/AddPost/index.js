import { Fragment, useState } from "react";
import Backdrop from "../../../components/Backdrop";
import Dummy from "dummyjs";
import DropZoneWithCaption from "../../../components/input/DropZoneWithCaption";
import UploadedMediaEdit from "../../../components/input/UploadedMediaEdit";
import EditNewPostCaption from "../../../components/input/EditNewPostCaption";
import Header from "./Header";
import SelectGroup from "./SelectGroup";
import { closeModal } from "../../../Utility/Util";
import { useHistory, useLocation, useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { useUser } from "../../../context/userContext";

const AddPost = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { postId } = useParams();
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(0);
  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();

  const [post, setPost] = useState({
    id: postId,
    title: "",
    commentType: true,
    status: "PENDING",
    user_id: user.sysUser.id,
    group_id: "",
    category_id: "",
    items: [],
  });

  const groupData = [
    { name: "Ном сонирхогчид", id: 1, image: Dummy.img("100x100") },
    { name: "UX/UI дизайнерууд", id: 2, image: Dummy.img("100x100") },
    { name: "Ууланд гарцгаая", id: 3, image: Dummy.img("100x100") },
    { name: "Машин хурд шалгагчид", id: 4, image: Dummy.img("100x100") },
  ];

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <Backdrop>
      <div className={`flex justify-center items-center mt-10`}>
        <div
          className={`flex flex-col w-full max-w-xl bg-white mx-auto rounded-square shadow-card `}
        >
          {post.items.length !== 0 ? (
            !isEditing ? (
              <Fragment>
                <Header
                  iconRight={
                    <span
                      onClick={() => closeModal(history, state)}
                      className={
                        "icon-fi-rs-close absolute text-12px right-3 top-1/4 cursor-pointer bg-caak-titaniumwhite p-2 rounded-full"
                      }
                    />
                  }
                  title={"Нийтлэл нэмэх"}
                />
                <SelectGroup
                  groupData={groupData}
                  isGroupVisible={isGroupVisible}
                  setIsGroupVisible={setIsGroupVisible}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                />
                <UploadedMediaEdit
                  setPost={setPost}
                  post={post}
                  setIsEditing={setIsEditing}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                  // loading
                />
              </Fragment>
            ) : (
              <Fragment>
                <Header
                  iconLeft={
                    <span
                      onClick={() => setIsEditing(false)}
                      className={
                        "icon-fi-rs-back absolute text-12px w-7 h-7 left-3 top-1/4 cursor-pointer text-center bg-caak-titaniumwhite p-2 rounded-full"
                      }
                    />
                  }
                  title={"Зураг/Видеоний тайлбар"}
                />
                <EditNewPostCaption
                  setPost={setPost}
                  post={post}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                  currentEditingIndex={currentEditingIndex}
                  setIsEditing={setIsEditing}
                />
              </Fragment>
            )
          ) : (
            <Fragment>
              <Header
                hideDivider
                iconRight={
                  <span
                    onClick={() => closeModal(history, state)}
                    className={
                      "icon-fi-rs-close absolute text-12px right-3 top-1/4 cursor-pointer bg-caak-titaniumwhite p-2 rounded-full"
                    }
                  />
                }
                title={"Нийтлэл нэмэх"}
              />
              <SelectGroup
                groupData={groupData}
                isGroupVisible={isGroupVisible}
                setIsGroupVisible={setIsGroupVisible}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
              />
              <DropZoneWithCaption post={post} setPost={setPost} />
            </Fragment>
          )}

          <div className={"flex flex-row pb-4 px-4"}>
            {/*<Button*/}
            {/*  icon={*/}
            {/*    <span*/}
            {/*      className={*/}
            {/*        "icon-fi-rs-draft mr-1.5 text-caak-generalblack text-20px"*/}
            {/*      }*/}
            {/*    />*/}
            {/*  }*/}
            {/*  iconPosition={"left"}*/}
            {/*  className={*/}
            {/*    "white text-caak-generalblack py-3 w-1/6 ml-1 mt-4 justify-center text-15px mr-2"*/}
            {/*  }*/}
            {/*>*/}
            {/*  Ноорог*/}
            {/*</Button>*/}
            {/* <Button
              icon={
                <span
                  className={
                    "icon-fi-rs-scheduled mr-1.5 text-caak-generalblack text-20px "
                  }
                />
              }
              iconPosition={"left"}
              className={
                "white  text-caak-generalblack py-3 w-4/5 ml-1 mt-4 justify-center text-15px mr-2"
              }
            >
              Хугацаа оруулах
            </Button> */}
            {/*<Button className={"mr-2 mt-4 w-full text-17px"}>Нийтлэх</Button>*/}
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
export default AddPost;
