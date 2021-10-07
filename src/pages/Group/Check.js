import { useState, useEffect } from "react";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import ImageCarousel from "../../components/carousel/ImageCarousel";
import { useHistory, useParams } from "react-router";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getPostView } from "../../graphql-custom/post/queries";
import { getFileUrl } from "../../Utility/Util";
import CheckHeader from "./CheckHeader";

export default function Check() {
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [activeIndex, setActiveIndex] = useState(0);

    const history = useHistory();
  
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
        <Backdrop>
            <div className="fullscreen_header_size flex flex-col justify-between sm:flex-col md:flex-col lg:flex-row m-10" >
                <div>
                    <div className="bg-white rounded-lg">
                        <p style={{paddingBlockStart: '21px', marginBlockEnd: '17px'}} className="text-20px text-caak-generalblack font-bold flex justify-center">Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!</p>
                        <div className="bg-black flex items-center">
                        <div
          className={
            "relative max-w-full w-full flex justify-center items-center bg-black bg-opacity-60 h-full sm:h-1/2 md:h-1/2 lg:h-full"
          }
        >
          <span
            onClick={() => prevItem()}
            className={
              "cursor-pointer z-2 absolute text-2xl left-2 text-white  top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
          <span
            onClick={() => nextItem()}
            className={
              "cursor-pointer z-2 absolute text-2xl right-2 text-white top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <ImageCarousel>
            {post.items.items.map((item, index) => {
              if (activeIndex === index)
                return (
                  <img
                    className={`w-full max-h-half lg:max-h-full md:h-full sm:max-h-half object-contain z-0`}
                    key={index}
                    src={getFileUrl(item.file)}
                    alt={""}
                  />
                );
              return null;
            })}
          </ImageCarousel>
          <div className={"flex flex-row absolute bottom-6"}>
            {post.items.items.map((_, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-full mr-1.5 w-2 h-2 bg-white ${
                    activeIndex === index ? "bg-opacity-100" : "bg-opacity-40"
                  } `}
                />
              );
            })}
          </div>
        </div>
                    </div>
                    <div className={"cursor-pointer absolute right-4 top-0 z-50"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
                        <CheckHeader
                            updatedAt={post.updatedAt}
                            title={post.title}
                            itemTitle={post.items.items[activeIndex].title}
                        />
                    </div>
                    <div className="flex justify-end mt-b4">
                        <Button className="bg-white text-caak-generalblack text-15px w-c14">Татгалзах</Button>
                        <Button className="bg-caak-bleudefrance text-15px text-white ml-b1 mr-c11 w-c132">Зөвшөөрөх</Button>
                    </div>
                </div>
                <span onClick={() => history.goBack()} className="icon-fi-rs-close text-white text-30px mt-c3 ml-c3 cursor-pointer btn:flex btn:justify-center"/>
            </div>
            
        </Backdrop>
    ) : null
}
