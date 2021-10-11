import { useState, useEffect } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import Button from "../../components/button";
import PendingPostMenuDrop from "./PendingPostMenuDrop";
import { checkUser } from "../../Utility/Util";
import { useUser } from "../../context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {getPostByStatus} from '../../graphql-custom/post/queries'
import PendingPostItem from "../../components/PendingPost/PendingPostItem";

export default function PostPending({settt}) {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        if (isCheckAll) {
            setIsCheck([]);
        }else{
            setIsCheck();
        }
    };
    
    const handleClick = e => {
        const { id, checked } = e.target;
        if (!checked) {
            setIsCheck(isCheck.filter(Bilyat => Bilyat !== id));
        }else{
            setIsCheck([...isCheck, id]);
        }
    }

    const [posts, setPosts] = useState([]);
    const { user } = useUser();

    const fetchPosts = async () => {
        try {
    
          let resp = []
          if(checkUser(user)){
            resp = await API.graphql(graphqlOperation(getPostByStatus, {status: "PENDING"}));
          }else{
            resp = await API.graphql({ 
              query: getPostByStatus,
              authMode: 'AWS_IAM'
            });
          }
    
          setPosts(resp.data.getPostByStatus.items);
        } catch (ex) {
          console.log(ex);
        }
      };

      useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
      }, []);

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
            {posts.map((data, index) => {
                return (
                    <div className="flex items-center  bg-white border-t hover:shadow hover:bg-caak-liquidnitrogen">
                        <div className="w-full flex items-center">
                            <Checkbox
                                key={data.id}
                                id={data.id}
                                handleClick={handleClick}
                                isChecked={isCheck.includes(data.id)}
                                className=" ml-c34 w-b4 h-b4 cursor-pointer border-2 border-caak-darkgray rounded"
                            />
                                <PendingPostItem
                                    key={index}
                                    post={data}
                                    className="ph:mb-4 sm:mb-4 ph:mb-4 "
                                />
                        </div>
                        <div className="flex  justify-end relative 2xl:flex sm:block md:block lg:block hidden xl:mr-c24 lg:mr-c24 md:mr-c1 sm:mr-b1 justify-end items-center">
                            {
                                settt 
                                ? 
                                "" 
                                :
                                <div className="2xl:block 2xl:flex xl:block hidden ">
                                    <Button className="bg-caak-bleudefrance text-15px text-white w-c132">Зөвшөөрөх</Button>
                                    <Button className="bg-white text-caak-generalblack text-15px ml-b1 border w-c14">Татгалзах</Button>
                                </div>
                            }
                            <PendingPostMenuDrop/>
                        </div>
                    </div>
                    
                );
            })}
        </div>
    )
}
