import Checkbox from "../../components/checkbox/Checkbox"
import Button from "../../components/button"
import MyDropDown from "../../components/PendingPost/MyDropDown"
import { useState, useEffect } from "react";
import Post from "../../components/PendingPost/Post";

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

export default function Shitttt({settt}) {
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
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
        {(array || []).map(item => {
            return (
                <div className="flex items-center bg-white border-t hover:bg-caak-liquidnitrogen" >
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
                        <span onClick={toggleMenu} className="ml-c11 cursor-pointer mr-b5 icon-fi-rs-dots text-4px py-c6 px-a1 cursor-pointer"/>
                    </div>
                    <MyDropDown
                        open={isMenuOpen}
                        onToggle={toggleMenu}
                    /> 
                </div>
            );
        })}
        </div>
    )
}
