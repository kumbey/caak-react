import { useState, useEffect } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import { Posts } from "../../components/PendingPost/mock";

export default function PostPending() {

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(Posts);
    }, [list]);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        if (isCheckAll) {
            setIsCheck([]);
        }else{
            setIsCheck(list.map(li => li.id));
        }
    };
    
    const handleClick = e => {
        const { id, checked } = e.target;
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }else{
            setIsCheck([...isCheck, id]);
        }
    };

    const posts = list.map(({ id, content }) => {
        return (
            <div key={id} className="flex items-center hover:bg-caak-posthover border border-b-0">
                <Checkbox
                key={id}
                id={id}
                content={content}
                handleClick={handleClick}
                isChecked={isCheck.includes(id)}
                className=" ml-c34 w-b4 h-b4 cursor-pointer border-2 border-caak-darkgray rounded"
                />
                    {content}
            </div>
        );
    });

    return (
        <div>
            <div className="flex w-full items-center bg-white py-b4 border border-b-0">
                {
                isCheck.length
                    ? 
                <div className="flex items-center border ml-c34 rounded-lg">
                    <Checkbox 
                        id="selectAll" 
                        handleClick={handleSelectAll}
                        isChecked={isCheck.length}
                        className=" w-b4 h-b4 ml-b3 cursor-pointer border-2 border-caak-darkgray rounded"
                    />
                    <p className="ml-b3 text-15px text-caak-generalblack font-medium">{isCheck.length} фост сонгогдлоо</p>
                    <select className=" border-0 text-15px text-caak-generalblack font-medium">
                        <option className="focus:bg-caak-darkBlue">Үйлдэл</option>
                        <option >Үйлдэл</option>
                        <option >Үйлдэл</option>
                    </select>
                </div>
                    : 
                <div className="flex w-full items-center text-16px text-caak-generalblack">
                    <Checkbox 
                        id="selectAll" 
                        handleClick={handleSelectAll}
                        isChecked={isCheckAll} 
                        className=" w-b4 h-b4 ml-c34 cursor-pointer border-2 border-caak-darkgray rounded"
                    />
                    <p className="w-2/5 justify-center flex">Фостын нэр</p>
                    <div className="flex justify-between w-2/3">
                        <p>Нийтлэгч</p>
                        <p>Хугацаа</p>
                        <p className="2xl:mr-c18 xl:mr-c18">Үйлдэл</p>
                    </div>
                </div>}
            </div>
            {posts}
        </div>
    )
}
