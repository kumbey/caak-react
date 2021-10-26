import { Fragment, useEffect, useState } from "react";
import Backdrop from "../../../components/Backdrop";
import DropZoneWithCaption from "../../../components/input/DropZoneWithCaption";
import UploadedMediaEdit from "../../../components/input/UploadedMediaEdit";
import EditNewPostCaption from "../../../components/input/EditNewPostCaption";
import Header from "./Header";
import SelectGroup from "./SelectGroup";
import { closeModal } from "../../../Utility/Util";
import { useHistory, useLocation, useParams } from "react-router";
import { useUser } from "../../../context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listGroupsForAddPost } from "../../../graphql-custom/group/queries";
import { getPost } from "../../../graphql-custom/post/queries";
import { crtPost, pdtPost } from "../../../apis/post";

const AddPost = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { postId } = useParams();
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(0);
  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [loading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [permissionDenied, setPermissionDenied] = useState(true);

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

  useEffect(() => {
    getGroups();
    if (postId !== "new") {
      loadPost(postId);
    } else {
      setPermissionDenied(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (groupData && selectedGroupId) {
      setSelectedGroup(groupData.find((item) => item.id === selectedGroupId));
    }
    // eslint-disable-next-line
  }, [selectedGroupId]);

  useEffect(() => {
    if (selectedGroup) {
      post.group_id = selectedGroup.id;
      post.category_id = selectedGroup.category_id;
    }
    // eslint-disable-next-line
  }, [selectedGroup]);

  useEffect(() => {
    if (groupData && selectedGroupId) {
      setSelectedGroup(groupData.find((item) => item.id === selectedGroupId));
    }
    // eslint-disable-next-line
  }, [groupData]);

  const getGroups = async () => {
    try {
      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));
      setGroupData(resp.data.listGroups.items);
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadPost = async (id) => {
    try {
      let resp = await API.graphql(graphqlOperation(getPost, { id: id }));
      let { items, ...data } = resp.data.getPost;
      if (data.user_id === user.sysUser.id) {
        setPermissionDenied(false);
        setSelectedGroupId(data.group_id);
        setPost({ ...data, items: items.items });
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const uploadPost = async () => {
    try {
      setLoading(true);

      if (post.id === "new") {
        await crtPost(post, user.sysUser.id);
      } else {
        await pdtPost(post, user.sysUser.id);
      }

      setLoading(false);
      // closeModal(history, state);

      history.push(
        { pathname: `/user/${user.sysUser.id}/profile` },
        { index: 2 }
      );
      // setActiveIndex(2)
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  return !permissionDenied ? (
    <Backdrop>
      <div
        className={`flex justify-center items-center h-screen md:h-auto md:mt-10 h-full`}
      >
        <div
          className={`flex flex-col w-screen sm:w-full max-w-xl bg-white mx-auto rounded-square shadow-card h-full md:h-auto`}
        >
          {post.items.length !== 0 ? (
            !isEditing ? (
              <Fragment>
                <Header
                  hideDivider
                  iconRight={
                    <Fragment>
                      <span
                        onClick={() => closeModal(history, state)}
                        className={
                          "hidden md:block icon-fi-rs-close absolute right-4 text-12px cursor-pointer bg-caak-titaniumwhite p-2 rounded-full"
                        }
                      />
                      <span
                        className={
                          "md:hidden absolute right-4 font-medium text-15px text-caak-bleudefrance"
                        }
                      >
                        Дараах
                      </span>
                    </Fragment>
                  }
                  title={"Нийтлэл нэмэх"}
                  iconLeft={
                    <span
                      onClick={() => closeModal(history, state)}
                      className={
                        "icon-fi-rs-back absolute left-4 md:invisible text-20px cursor-pointer rounded-full"
                      }
                    />
                  }
                />
                <SelectGroup
                  containerClassName={"mt-2"}
                  groupData={groupData}
                  isGroupVisible={isGroupVisible}
                  setIsGroupVisible={setIsGroupVisible}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                  setPost={setPost}
                  post={post}
                />
                <UploadedMediaEdit
                  setPost={setPost}
                  post={post}
                  setIsEditing={setIsEditing}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                  loading={loading}
                  uploadPost={uploadPost}
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
                containerClassName={"mt-2"}
                groupData={groupData}
                isGroupVisible={isGroupVisible}
                setIsGroupVisible={setIsGroupVisible}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                setPost={setPost}
                post={post}
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
  ) : null;
};
export default AddPost;
