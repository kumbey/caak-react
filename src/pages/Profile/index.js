import React, {useState, useEffect} from 'react'
import Button from '../../components/button'
import Card from '../../components/card'
import { useHistory, useLocation } from 'react-router'
import { graphqlOperation } from '@aws-amplify/api-graphql'
import { getPostByStatus } from '../../graphql-custom/post/queries'
import { checkUser } from '../../Utility/Util'
import API from '@aws-amplify/api'
import { useUser } from '../../context/userContext'
import useInfiniteScroll from '../Home/useFetch'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'

export default function Profile() {

    const history = useHistory();
    const { user } = useUser();

    const [posts, setPosts] = useState([]);
    const [nextToken, setNextToken] = useState();
    const location = useLocation();
    const [isFetching, setIsFetching] = useInfiniteScroll(() => {});

    useEffect(() => {
      if (!isFetching) return;
      fetchMoreListItems();
      // eslint-disable-next-line
    }, [isFetching]);

    useEffect(() => {
        fetchPosts();
        setIsFetching(fetchMoreListItems)
        // eslint-disable-next-line
      }, []);

   const fetchMoreListItems = async () => {
    try {
      setIsFetching(true);
      if (nextToken !== null) {
        let resp = await API.graphql(
          graphqlOperation(getPostByStatus, {
            limit: 3,
            nextToken,
            status: "PENDING",
          })
        );
        setNextToken(resp.data.getPostByStatus.nextToken);
        setPosts([...posts, ...resp.data.getPostByStatus.items]);
        setIsFetching(false);
      }
      setIsFetching(false);
    } catch (ex) {
      console.log(ex);
    }
  };
  
    const fetchPosts = async () => {
      try {
        let resp = [];
        if (checkUser(user)) {
          resp = await API.graphql(
            graphqlOperation(getPostByStatus, {
              sortDirection: "DESC",
              status: "PENDING",
              limit: 6,
            })
          );
          setNextToken(resp.data.getPostByStatus.nextToken);
        } else {
          resp = await API.graphql({
            query: getPostByStatus,
            variables: {
              sortDirection: "DESC",
              status: "PENDING"
            },
            authMode: "AWS_IAM",
          });
        }
        setPosts(resp.data.getPostByStatus.items);
        console.log(posts)
      } catch (ex) {
        console.log(ex);
      }
    }

    return (
        <div>
          <div className="ph:block hidden flex">
            <span/>
            <p></p>
            <div>
              <span/>
              <span/>
            </div>
          </div>
            <div style={{height: "220px"}} className="bg-white border-t flex items-center justify-center ph:h-c22">
              <div className="flex ph:grid w-full justify-between ph:justify-center 2xl:px-cf xl:px-ch lg:px-c12 md:px-c30">
                <div className="ph:text-center">
                  <div className="flex ph:grid">
                    <div className="ph:grid ph:justify-center">
                        <img style={{height: '120px', width: '120px'}} src={"https://d238m8ukn6hkhb.cloudfront.net/file/brand/305/blackpink-jisoo-profile-image.jpeg"} alt="" className="rounded-full ph:w-c31 ph:h-c31"/>
                        
                    </div>
                    <div className="ph:grid ph:justify-center ph:mt-3 sm:ml-c6">
                        <p style={{marginBlockStart: "13px"}} className="text-26px  font-bold ph:hidden">Blackpink Jisoo</p>
                        <p className="text-18px text-caak-generalblack font-normal flex justify-center">@sooyaaa__ <span style={{marginInlineStart: "4px"}} className="icon-fi-rs-verified text-13px text-caak-buttonblue" /></p>
                        <div className="flex mt-b4">
                            <span className="flex items-center"><p className="text-18px font-medium text-caak-generalblack">2434</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">Аура</p></span>
                            <span className="flex items-center mx-c11 ph:mx-a2"><p className="text-18px font-medium text-caak-generalblack">47.2 сая</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">дагагчид</p></span>
                            <span className="flex items-center"><p className="text-18px font-medium text-caak-generalblack">715</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">фост</p></span>
                        </div>
                    </div>
                  </div>
                  <p className="text-15px text-caak-generalblack mt-a2 sm:mt-c11">energy never lies 🍓</p>
                </div>
                <div style={{marginTop: "10px"}}>
                    <div className="flex ph:hidden">
                        <div onClick={() => history.push({pathname: "/profile/settings"})} className="h-c13 shadow flex items-center rounded-lg px-c1 cursor-pointer"><span className="pr-a1 icon-fi-rs-settings text-18px"/><p className="text-15px font-medium">Тохиргоо</p></div>
                        <span style={{width: "49px", marginInlineStart: "10px"}} className="h-c13 text-4px shadow icon-fi-rs-dots text-caak-generalblack items-center flex justify-center rounded-lg cursor-pointer"/>
                    </div>
                    <div className="flex ph:mt-4 sm:mt-10 justify-end ph:justify-center">
                        <span style={{marginInlineEnd: "14px"}} className="icon-fi-rs-ig text-caak-blue cursor-pointer"/>
                        <span style={{marginInlineEnd: "14px"}} className="icon-fi-rs-fb text-caak-blue cursor-pointer"/>
                        <span style={{marginInlineEnd: "14px"}} className="icon-fi-rs-tiktok text-caak-blue cursor-pointer"/>
                        <span className="icon-fi-rs-tw text-caak-blue cursor-pointer"/>
                    </div>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="flex justify-center">

                {/* post */}
                <div className="grid_container_container w-full flex flex-col justify-center">

                    {/* navigator */}
                    <div className="flex md:justify-between mt-c2 items-center ph:justify-center sm:justify-center">
                        <div className="flex">
                            <Button className="bg-white text-15px font-bold h-c32 text-caak-primary flex justify-center items-center mr-a1 rounded-lg shadow hover:bg-caak-titaniumwhite"><span className="icon-fi-rs-drag text-20px mr-a1"/>Миний фостууд</Button>
                            <Button className="text-15px font-bold h-c32 text-caak-generalblack flex justify-center items-center mr-a1 rounded-lg bg-transparent hover:bg-caak-titaniumwhite"><span className="icon-fi-rs-bookmark text-20px mr-a1"/>Хадгалсан фостууд</Button>
                        </div>
                        <select className="ph:hidden sm:hidden md:block text-15px w-c132 text-caak-generalblack font-semibold cursor-pointer border-0 bg-transparent">
                            <option>Илүү ихийг</option>
                            <option>Тйреырбйыр</option>
                            <option>йыөүйзшыбаөүк</option>  
                        </select>
                    </div>

                    {/* contents */}  
                    <div className="grid-container justify-center mt-b5">
                      {posts.map((data, index) => {
                        return (
                          <Link
                            key={index}
                            to={{
                              pathname: `/post/view/${data.id}`,
                              state: { background: location },
                            }}
                          >
                            <Card
                              video={data.items.items[0].file.type.startsWith("video")}
                              post={data}
                              className="ph:mb-4 sm:mb-4 ph:mb-4"
                            />
                          </Link>
                        );
                      })}
                      <Loader
                        className={`bg-caak-primary ${
                          isFetching ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                </div>
            </div>
        </div>
    )
}
