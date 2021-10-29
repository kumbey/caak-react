import { useState } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import { useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import GroupPosts from "./GroupPosts";

export default function PostPending() {

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const { groupId } = useParams();

    const updatePostStatus = async (id, status) => {
        await API.graphql(graphqlOperation(updatePost, { input: { id, status } }));
    };

    const onSelectHandler = (e) => {
        isCheck.map((item) => {
            return updatePostStatus(item, e.target.value);
        });
    };
  
    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        if (isCheckAll) {
            setIsCheck([]);
        } else {
            setIsCheck();
        }
    };

    return (
        <div className={"w-full"}>
            <div className="py-b4 flex items-center w-full pr-2 bg-white border-t">
                {isCheck.length ? (
                    <div className="ml-c34 flex items-center border rounded-lg">
                        <Checkbox
                            id="selectAll"
                            handleClick={handleSelectAll}
                            isChecked={isCheck.length}
                            className="w-b4 h-b4 ml-px-11 border-caak-darkgray border-2 rounded cursor-pointer"
                        />
                        <p className="ml-px-11 text-15px text-caak-generalblack font-medium">
                            {isCheck.length} пост сонгогдлоо
                        </p>
                        <select
                            onChange={(e) => onSelectHandler(e)}
                            className="text-15px text-caak-generalblack font-medium border-0"
                        >
                            <option hidden className="focus:bg-caak-darkBlue">
                                Үйлдэл
                            </option>
                            <option value={"CONFIRMED"}>Зөвшөөрөх</option>
                            <option value={"ARCHIVED"}>Татгалзах</option>
                        </select>
                    </div>
                ) : (
                <div className="text-16px text-caak-generalblack flex items-center w-full">
                    <Checkbox
                        id="selectAll"
                        handleClick={handleSelectAll}
                        isChecked={isCheckAll}
                        className="w-b4 h-b4 ml-c34 border-caak-darkgray border-2 rounded cursor-pointer"
                    />
                    <div className="flex w-full justify-evenly">
                        <p className="md:w-1/3 md:ml-c32">Пост</p>
                        <div className="md:w-1/3 hidden md:flex">
                            <p className="md:w-1/2">Нийтлэгч</p>
                            <p className="md:w-1/2 text-center">Хугацаа</p>
                        </div>
                        <p className="text-center md:w-1/3">Үйлдэл</p>
                    </div>
                </div>
                )}
            </div>
            <GroupPosts groupId={groupId} type="PENDING"/>
        </div>
    );
}
