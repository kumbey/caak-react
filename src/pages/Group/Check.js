import { useState, useEffect } from "react";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import { useHistory, useParams } from "react-router";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getPostView } from "../../graphql-custom/post/queries";
import { getFileUrl, closeModal } from "../../Utility/Util";
import CheckHeader from "./CheckHeader";
import { useLocation } from "react-router";

export default function Check() {
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const history = useHistory();
    const { state } = useLocation();
  
    useEffect(() => {
      try {
        const getPostById = async (id) => {
          const resp = await API.graphql(graphqlOperation(getPostView, { id }));
          setPost(resp.data.getPost);
        };
        getPostById(postId);
      } catch (ex) {
        console.log(ex);
      }
    }, [postId]);
  
    useEffect(() => {
      const handler = (e) => {
        if (e.keyCode === 39) {
          nextItem();
        } else if (e.keyCode === 37) {
          prevItem();
        } else if (e.keyCode === 27) {
          history.goBack();
        }
      };
      document.addEventListener("keydown", handler);
      return () => {
        document.removeEventListener("keydown", handler);
      };
    });
  
    const nextItem = () => {
      if (activeIndex < post.items.items.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(0);
      }
    };
  
    const prevItem = () => {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else {
        setActiveIndex(post.items.items.length - 1);
      }
    };

    return post ? (
        <Backdrop className="flex justify-center sm:items-center">
            <div className="flex flex-col justify-between ph:justify-start sm:flex-col md:flex-col lg:flex-row m-10 ph:m-0 ph:w-full" >
              <div className="flex sm:hidden justify-between bg-white py-a1 px-c6">
                <span onClick={() => closeModal(history, state)} className="icon-fi-rs-back flex items-center"/>
                <p className="text-20px">Фост шалгах</p>
                <span className="icon-fi-rs-dots text-4px flex items-center"/>
              </div>
              <div>
                <div className="bg-white ph:mt-c6 rounded-lg">
                  <p style={{paddingBlockStart: '21px', marginBlockEnd: '17px'}} className="text-20px text-caak-generalblack font-bold flex justify-center">{post.title}</p>
                    <div className='flex items-center bg-black bg-opacity-80'>
                      <span
                        style={{paddingInline: "19px", paddingBlock: '15px'}}
                        onClick={() => prevItem()}
                        className={
                          "icon-fi-rs-back mx-c2 ph:mx-a1 text-white cursor-pointer bg-white rounded-full bg-opacity-10 hover:bg-opacity-30"
                        }
                      />
                        <div
                          className={
                            "relative flex justify-center items-center bg-black bg-opacity-60"
                          }
                        >
                          {post.items.items.map((item, index) => {
                            if (activeIndex === index)
                            if (item.file.type.startsWith("video")) {
                              return (
                                <video
                                  key={index}
                                  controls
                                  disablePictureInPicture
                                  controlsList="nodownload noremoteplayback noplaybackrate"
                                  className="ph:w-sp ph:h-sp h-ih w-iw"
                                >
                                    <source src={getFileUrl(item.file)} type="video/mp4" />
                                </video>
                              );
                            } else {  
                              return (
                                <img
                                  className="h-ih ph:w-sp ph:h-sp"
                                  key={index}
                                  src={getFileUrl(item.file)}
                                  alt={""}
                                />
                              );
                            }
                            return null;
                          })}
                          <div className={"flex flex-row absolute bottom-6"}>
                            {post.items.items.map((_, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`rounded-full mr-1.5 w-2 h-2 bg-white 
                                    ${activeIndex === index ? "bg-opacity-100" : "bg-opacity-40"} 
                                  `}
                                />
                              );
                            })}
                          </div>
                        </div>
                        <span
                          style={{paddingInline: "19px", paddingBlock: '15px'}}
                          onClick={() => nextItem()}
                          className={
                            "icon-fi-rs-back mx-c2 ph:mx-a1 text-white transform rotate-180 cursor-pointer bg-white rounded-full bg-opacity-10 hover:bg-opacity-30"
                          }
                        />
                    </div>
                    <CheckHeader
                      user={post.user}
                      updatedAt={post.updatedAt}
                      itemTitle={post.items.items[activeIndex].title}
                    />
                </div>
                <div className="flex justify-end mt-b4">
                  <Button className="bg-white text-caak-generalblack text-15px w-c14">Татгалзах</Button>
                  <Button className="bg-caak-bleudefrance text-15px text-white ml-b1 mr-c11 w-c132">Зөвшөөрөх</Button>
                </div>
              </div>
              <span onClick={() => closeModal(history, state)} className="icon-fi-rs-close text-white text-30px mt-c3 ml-c3 cursor-pointer ph:flex ph:justify-center ph:hidden"/>
            </div>
        </Backdrop>
    ) : null
}
