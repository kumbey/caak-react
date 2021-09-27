import { Fragment, useState } from "react";
import Backdrop from "../../../components/Backdrop";
import Dummy from "dummyjs";
import Button from "../../../components/button";
import DropZoneWithCaption from "../../../components/input/DropZoneWithCaption";
import UploadedMediaEdit from "../../../components/input/UploadedMediaEdit";
import EditNewPostCaption from "../../../components/input/EditNewPostCaption";
import Header from "./Header";
import SelectGroup from "./SelectGroup";

const AddPost = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState();
  const [textCount, setTextCount] = useState(0);
  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const groupData = [
    { name: "Ном сонирхогчид", id: 1, image: Dummy.img("100x100") },
    { name: "UX/UI дизайнерууд", id: 2, image: Dummy.img("100x100") },
    { name: "Ууланд гарцгаая", id: 3, image: Dummy.img("100x100") },
    { name: "Машин хурд шалгагчид", id: 4, image: Dummy.img("100x100") },
  ];
  return (
    <Backdrop>
      <div className={`flex justify-center items-center mt-10`}>
        <div
          className={`flex flex-col w-full max-w-xl bg-white mx-auto rounded-square shadow-card `}
        >
          {uploadedFiles.length !== 0 ? (
            !isEditing ? (
              <Fragment>
                <Header
                  iconRight={
                    <span
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
                  uploadedFiles={uploadedFiles}
                  onChangeText={setTextCount}
                  textCount={textCount}
                  onChangeFiles={setUploadedFiles}
                  setIsEditing={setIsEditing}
                  setCurrentEditingIndex={setCurrentEditingIndex}
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
                  onChangeFiles={setUploadedFiles}
                  uploadedFiles={uploadedFiles}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                  currentEditingIndex={currentEditingIndex}
                />
              </Fragment>
            )
          ) : (
            <Fragment>
              <Header
                hideDivider
                iconRight={
                  <span
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
              <DropZoneWithCaption
                onChange={setTextCount}
                textCount={textCount}
                onChangeFiles={setUploadedFiles}
                uploadedFiles={uploadedFiles}
              />
            </Fragment>
          )}

          <div className={"flex flex-row pb-4 px-4"}>
            <Button
              icon={
                <span
                  className={
                    "icon-fi-rs-draft mr-1.5 text-caak-generalblack text-20px"
                  }
                />
              }
              iconPosition={"left"}
              className={
                "white text-caak-generalblack py-3 w-1/6 ml-1 mt-4 justify-center text-15px mr-2"
              }
            >
              Ноорог
            </Button>
            <Button
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
            </Button>
            <Button className={"mr-2 mt-4 w-full text-17px"}>Нийтлэх</Button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
export default AddPost;
