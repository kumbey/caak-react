import { useState, useEffect } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import Post from "../../components/PendingPost/Post";
import Button from "../../components/button";
import Shittt from "./Shittt";

const Posts = [
    {
        id: "1",
        content: <Post/>
    },
    {
        id: "2",
        content: <Post/>
    },
    {
        id: "3",
        content: <Post/>
    },
    {
        id: "4",
        content: <Post/>
    }
]

export default function PostPending({settt}) {
    const [array, setArray] = useState(Posts);

    useEffect(() => {
        if (array) {
            console.log(array.length);
        }
    }, [array]);
    
    const deleteKey = item => {
        let shallowCopy = [...array];
        const index = shallowCopy.indexOf(item);
        if (index > -1) {
            shallowCopy.splice(index, 1);
        }
        setArray(shallowCopy);
        return
    };

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
    }

    return (
        <div>
            <div className="flex w-full items-center bg-white py-b4 border-t">
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
                    <p className="w-1/3 ml-c2 justify-center flex">Фостын нэр</p>
                    <div className="flex justify-between w-2/3">
                        <p>Нийтлэгч</p>
                        <p>Хугацаа</p>
                        <p className={`${settt ? "mr-c24" : "2xl:mr-c18 xl:mr-c14"}`}>Үйлдэл</p>
                    </div>
                </div>}
            </div>
            {(array || []).map(item => {
                return (
                    <div className="flex items-center bg-white border-t hover:shadow hover:bg-caak-liquidnitrogen" key={item.id}>
                        <Checkbox
                            key={item.id}
                            id={item.id}
                            handleClick={handleClick}
                            isChecked={isCheck.includes(item.id)}
                            className=" ml-c34 w-b4 h-b4 cursor-pointer border-2 border-caak-darkgray rounded"
                        />
                        {item.content}
                        <div className="relative 2xl:flex sm:block md:block lg:block hidden xl:mr-c24 lg:mr-c24 md:mr-c1 sm:mr-b1 justify-end items-center">
                            {
                                settt 
                                ? 
                                "" 
                                :
                                <div className="flex">
                                    <Button className="bg-caak-bleudefrance text-15px text-white w-c132">Зөвшөөрөх</Button>
                                    <Button onClick={() => deleteKey(item)} className="bg-white text-caak-generalblack text-15px ml-b1 border w-c14">Татгалзах</Button>
                                </div>
                            }
                            <Shittt deletePost={() => deleteKey(item)}/>
                        </div>
                        
                    </div>
                );
            })}
        </div>
    )
}
