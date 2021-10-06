import {useState} from 'react'
import Admin from '../../components/Sidebar/Admin'
import Button from '../../components/button'
import Card from '../../components/card'
import Description from '../../components/Sidebar/Description'
import TopMembers from '../../components/Sidebar/TopMembers'
import Suggest from '../../components/Sidebar/Suggest'
import API from '@aws-amplify/api'
import { graphqlOperation } from '@aws-amplify/api-graphql'
import {getPostByStatus} from '../../graphql-custom/post/queries'
import { useEffect } from 'react'

export default function Group() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      let resp = await API.graphql(graphqlOperation(getPostByStatus));
      setPosts(resp.data.getPostByStatus.items);
      console.log(posts);
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
            <div className="bg-white relative justify-center h-c18">
                <img alt="cover" className="w-full  h-c17 bg-caak-blue"/>

                {/* menu */}
                <div className="absolute  bottom-b3 2xl:left-cf 2xl:right-cf xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">
                    <div className="flex justify-between">
                        <div className="flex  items-end">
                            <img alt="" className="w-c19 h-c19 border-4 border-white bg-caak-red rounded-lg"/>
                            <div className="ml-c6">
                                <div>
                                    <p className="text-26px font-bold text-caak-generalblack">Монгол өв уламжлал</p>
                                </div>
                                <div className="flex items-center btn:grid">
                                    <div className="flex items-center">
                                        <span className="icon-fi-rs-world text-16px text-caak-darkBlue flex"/>
                                        <p className="text-15px ml-a1 text-caak-darkBlue">Нээлттэй бүлэг</p>
                                    </div>
                                    <p className="mx-a1">·</p> 
                                    <p className="text-15px text-caak-darkBlue">245k гишүүнтэй</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden lg:hidden flex">
                            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-caak-generalblack hover:text-white hover:bg-caak-darkBlue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white inline-flex items-center justify-center p-2 rounded-md"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
                        <div className="flex btn:grid items-end">
                            <Button className="ph:mb-b1 h-c13 text-15px rounded rounded-lg bg-caak-titaniumwhite text-caak-generalblack"> 
                                <span className="icon-fi-rs-check text-12px mr-a1"/>
                                Нэгдсэн
                            </Button>
                            <Button className="h-c13 text-15px rounded rounded-lg bg-caak-generalblack ml-b1"> 
                                <span className="icon-fi-rs-link text-15px mr-a1"/>
                                Найзаа урих
                            </Button>
                            <div className="flex btn:justify-end">
                                <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                                    <span className="icon-fi-rs-notification text-caak-generalblack shadow text-18px rounded rounded-lg px-b4 py-b1 flex"/>
                                </div>
                                <div className="bg-white ml-b1 rounded rounded-lg cursor-pointer">
                                    <span className="icon-fi-rs-settings text-caak-generalblack shadow text-18px rounded rounded-lg px-b4 py-b1 flex"/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* body */}
            <div className="2xl:flex sm:flex md:flex lg:flex xl:flex md:flex">

                {/* sideBar */}
                <div className="mt-c24 ml-c3 2xl:w-c22 md:w-c17">

                    {/* admin */}
                    <Admin/>

                    {/* description */}
                    <Description/>

                    {/* top members */}
                    <TopMembers/>

                    {/* suggested */}
                    <Suggest className="text-15px font-medium text-caak-darkBlue" title={"Танд санал болгох группууд"}/>
                </div>

                {/* post */}
                <div className="mt-c11 2xl:absolute 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">

                    {/* header */}
                    <div className="bg-white h-c29 rounded rounded-lg flex items-center justify-between pr-b5">
                        <img alt="" className="h-c28 w-c28 bg-caak-red rounded rounded-full ml-c3"/>
                        <div className="2xl:w-cg xl:w-cc md:w-ci ml-c6">
                            <p onClick={() => alert("yu ch hiigd bgan")} className="text-15px text-caak-darkBlue flex items-center w-full h-c30 bg-caak-liquidnitrogen rounded-lg pl-b1 hover:bg-gray-200 cursor-pointer">Энэ бүлэгт фост нийтлэх...</p>
                        </div>
                        <div className="flex ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-image mr-a2 text-22px text-caak-algalfuel"/>
                            <p className="text-15px text-caak-blue">Зураг/Видео</p>
                        </div>
                        {/*<div className="flex items-center  ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-link pr-a2 text-20px text-caak-bleudefrance"/>
                            <p className="text-15px text-caak-blue">Линк</p>
                        </div>*/}
                    </div>

                    {/* navigator */}
                    <div className="flex justify-between mt-c2 items-center">
                        <div className="flex">
                            <Button className="bg-white text-15px font-bold w-c31 h-c32 text-caak-primary flex justify-center items-center mr-a1 rounded-lg shadow hover:bg-caak-titaniumwhite">Трэнд</Button>
                            <Button className="text-15px font-bold w-c7 h-c32 text-caak-generalblack flex justify-center items-center mr-a1 rounded-lg bg-transparent hover:bg-caak-titaniumwhite">Шинэ</Button>
                            <Button className="text-15px font-bold w-c7 h-c32 text-caak-generalblack flex justify-center items-center rounded-lg bg-transparent hover:bg-caak-titaniumwhite">Шилдэг</Button>
                        </div>
                        <select className="text-15px text-caak-generalblack font-semibold cursor-pointer border-0 bg-transparent">
                            <option>Шинэ фостууд</option>
                            <option>Тйреырбйыр</option>
                            <option>йыөүйзшыбаөүк</option>
                        </select>
                    </div>

                    {/* contents */}
                    <div className="2xl:grid 2xl:grid-cols-3 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 gap-c11 mt-b4">
                    {posts.map((data, index) => {
                return (
                  <Card
                    video={data.items.items[0].file.type.startsWith('video')}
                    post={data}
                    key={index}
                    className="ph:mb-4 sm:mb-4 btn:mb-4"
                  />
                );
              })}
                    </div>
                </div>
            </div>
        </div>
    )
}
