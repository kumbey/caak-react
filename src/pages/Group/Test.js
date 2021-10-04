import { useState, useEffect } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import { Posts } from "../../components/PendingPost/mock";

export default function Test() {

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
            
    {posts}
        </div>
    )
}
