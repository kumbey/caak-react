import { useState, useEffect } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import { Posts } from "../../components/PendingPost/mock";

export default function PostPending() {

    const [count, setCount] = useState(0)

    const counts = count > 0

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(Posts);
    }, [list]);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };
    
    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        setCount(count + 1);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const posts = list.map(({ id, content }) => {
        return (
            <div className="flex items-center hover:bg-caak-posthover border border-b-0">
                <>
            <Checkbox
                key={id}
                id={id}
                content={content}
                handleClick={handleClick}
                isChecked={isCheck.includes(id)}
                className=" ml-c34 w-b4 h-b4 cursor-pointer border-2 border-caak-darkgray rounded"
            />
                {content}
            </>
            </div>
        );
    });

    return (
        <div>
            <div className="flex w-full items-center bg-white py-b4 border border-b-0">
                {
                counts
                    ? 
                <div className="flex items-center border ml-c34 rounded-lg">
                    <Checkbox 
                        id="selectAll" 
                        handleClick={handleSelectAll}
                        isChecked={counts}
                        className=" w-b4 h-b4 ml-b3 cursor-pointer border-2 border-caak-darkgray rounded"
                    />
                    <p className="ml-b3 text-15px text-caak-generalblack font-medium">{count} фост сонгогдлоо</p>
                    <select className=" border-0 text-15px text-caak-generalblack font-medium">
                        <option className="focus:bg-caak-darkBlue">Үйлдэл</option>
                        <option >Үйлдэл</option>
                        <option >Үйлдэл</option>
                    </select>
                </div>
                    : 
                <div className="flex items-center text-16px text-caak-generalblack">
                    <Checkbox 
                        id="selectAll" 
                        handleClick={handleSelectAll}
                        isChecked={isCheckAll} 
                        className=" w-b4 h-b4 ml-c34 cursor-pointer border-2 border-caak-darkgray rounded"
                    />
                    <p style={{marginLeft: '111px'}}>Фостын нэр</p>
                    <p style={{marginLeft: '238px'}}>Нийтлэгч</p>
                    <p style={{marginLeft: '112px'}}>Хугацаа</p>
                    <p style={{marginLeft: '144px'}}>Үйлдэл</p>
                </div>}
            </div>
            {posts}
        </div>
    )
}
