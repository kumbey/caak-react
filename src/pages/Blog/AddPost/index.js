import { useState } from "react";
import Backdrop from "../../../components/Backdrop";
import Divider from "../../../components/divider";
import Dummy from "dummyjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/button";
import DropDownSelect from "../../../components/input/DropDownSelect";
import DropZoneWithCaption from "../../../components/input/DropZoneWithCaption";
import UploadedMediaEdit from "../../../components/input/UploadedMediaEdit";

const AddPost = () => {
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
      <div className={"flex justify-center items-center mt-10"}>
        <div
          className={
            "flex flex-col w-full max-w-xl bg-white mx-auto rounded-square shadow-card"
          }
        >
          <div className={"relative header mb-3"}>
            <span
              className={
                "icon-fi-rs-close absolute text-12px right-3 top-1/4 cursor-pointer bg-caak-titaniumwhite p-2 rounded-full"
              }
            />
            <div
              className={
                "text-22px text-center text-caak-generalblack font-bold py-4 leading-7"
              }
            >
              Нийтлэл нэмэх
            </div>
            <Divider />
          </div>
          <div className={"body flex flex-col"}>
            <div className={"avatar flex flex-row items-center px-7"}>
              <img
                data-dummy="100x100"
                src={Dummy.img("100x100")}
                className={"w-12 h-12 rounded-full object-cover mr-2"}
                alt={""}
              />
              <div
                onClick={() => setIsGroupVisible(!isGroupVisible)}
                className={`relative flex flex-row items-center cursor-pointer ${
                  selectedGroup ? "bg-white" : "bg-caak-liquidnitrogen"
                } text-16px text-caak-generalblack mt-1 w-full pl-1.5 pr-10 py-3 block h-11 w-full rounded-md text-base  border border-gray-200 placeholder-gray-400   sm:text-sm  hover:bg-white`}
              >
                {selectedGroup ? (
                  ""
                ) : (
                  <span
                    className={
                      "flex border-2 border-dashed border-caak-generalblack w-7 h-7 rounded-square mr-2"
                    }
                  />
                )}
                {selectedGroup ? (
                  <div className={"flex flex-row items-center"}>
                    <img
                      src={selectedGroup.image}
                      className={"w-8 h-8 rounded-md object-cover mr-2"}
                      alt={""}
                    />
                    <span className={"text-16px text-caak-generalblack"}>
                      {selectedGroup.name}
                    </span>
                  </div>
                ) : (
                  "Бүлэг сонгох"
                )}

                <FontAwesomeIcon
                  className={"absolute right-2.5"}
                  icon={faCaretDown}
                />
                <span />
                <DropDownSelect
                  onSelect={setSelectedGroup}
                  open={isGroupVisible}
                  onToggle={() => setIsGroupVisible(!isGroupVisible)}
                  items={groupData}
                  className={
                    "-top-3 left-0 right-0 bg-white rounded-square w-full"
                  }
                />
              </div>
            </div>
            {uploadedFiles.length !== 0 ? (
              // <Draggable items={uploadedFiles}/>
              <UploadedMediaEdit
                files={uploadedFiles}
                onChangeText={setTextCount}
                textCount={textCount}
                onChangeFiles={setUploadedFiles}
              />
            ) : (
              // <Draggable/>
              <DropZoneWithCaption
                onChange={setTextCount}
                textCount={textCount}
                onSelected={setUploadedFiles}
              />
            )}

            <div className={"flex flex-row pb-5 px-7"}>
              <Button className={"w-3/4 mr-2 mt-4"}>
                Нийтлэх
              </Button>
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
                  "white text-caak-generalblack py-3 w-1/4 ml-1 mt-4 justify-center"
                }
              >
                Ноорог
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
export default AddPost;
