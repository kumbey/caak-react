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
import { listGroupsForAddPost } from '../../graphql-custom/group/queries'
import Loader from '../../components/loader'

export default function Profile() {

    const history = useHistory();
    const { user } = useUser();

    const [posts, setPosts] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [nextToken, setNextToken] = useState();
    const location = useLocation();
    const [isFetching, setIsFetching] = useInfiniteScroll(() => {});

    useEffect(() => {
      if (!isFetching) return;
      fetchMoreListItems();
      // eslint-disable-next-line
    }, [isFetching]);

    useEffect(() => {
      if (checkUser(user)) {
        listGroups();
      }
        fetchPosts();
        setIsFetching(fetchMoreListItems)
        // eslint-disable-next-line
      }, []);

    const listGroups = async () => {
      try {
        let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));
        setGroupData(resp.data.listGroups.items);
      } catch (ex) {
        console.log(ex);
      }
    };

   const fetchMoreListItems = async () => {
    try {
      setIsFetching(true);
      if (nextToken !== null) {
        let resp = await API.graphql(
          graphqlOperation(getPostByStatus, {
            limit: 2,
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
            <div style={{height: "220px"}} className="bg-white  border-t flex items-center justify-center">
                <div className="flex justify-between 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1">
                <div className="flex">
                    <div>
                        <img style={{height: '120px', width: '120px'}} src={"https://d238m8ukn6hkhb.cloudfront.net/file/brand/305/blackpink-jisoo-profile-image.jpeg"} alt="" className="rounded-full"/>
                        <p style={{marginBlockStart: "22px"}} className="text-15px text-caak-generalblack">energy never lies 🍓</p>
                    </div>
                    <div style={{height: '120px', marginInlineStart: "15px"}}>
                        <p style={{marginBlockStart: "13px"}} className="text-26px  font-bold">Blackpink Jisoo</p>
                        <p className="text-18px text-caak-generalblack font-normal flex items-center">@sooyaaa__ <span style={{marginInlineStart: "4px"}} className="icon-fi-rs-verified text-13px text-caak-buttonblue" /></p>
                        <div style={{marginBlockStart: "17px"}} className="flex ">
                            <span className="flex items-center"><p className="text-18px font-medium text-caak-generalblack">2434</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">Аура</p></span>
                            <span style={{marginInline: "21px"}} className="flex items-center"><p className="text-18px font-medium text-caak-generalblack">47.2 сая</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">дагагчид</p></span>
                            <span className="flex items-center"><p className="text-18px font-medium text-caak-generalblack">715</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">фост</p></span>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: "10px"}}>
                    <div className="flex">
                        <div onClick={() => history.push({pathname: "/profile/settings"})} className="h-c13 shadow flex items-center rounded-lg px-c1 cursor-pointer"><span className="pr-a1 icon-fi-rs-settings text-18px"/><p className="text-15px font-medium">Тохиргоо</p></div>
                        <span style={{width: "49px", marginInlineStart: "10px"}} className="h-c13 text-4px shadow icon-fi-rs-dots text-caak-generalblack items-center flex justify-center rounded-lg cursor-pointer"/>
                    </div>
                    <div style={{marginTop: "40px"}} className="flex justify-end">
                        <span style={{marginInlineEnd: "14px"}} className="icon-fi-rs-ig text-caak-blue cursor-pointer"/>
                        <span style={{marginInlineEnd: "14px"}} className="icon-fi-rs-fb text-caak-blue cursor-pointer"/>
                        <span style={{marginInlineEnd: "14px"}} className="icon-fi-rs-tiktok text-caak-blue cursor-pointer"/>
                        <span className="icon-fi-rs-tw text-caak-blue cursor-pointer"/>
                    </div>
                </div>
                </div>
            </div>

            {/* body */}
            <div className="2xl:flex sm:flex md:flex lg:flex xl:flex md:flex">

                
                {/*<div className="mt-b5 ml-c3 2xl:w-c22 md:w-c17">

                    
                    <Suggest title={"Миний үүсгэсэн группууд"} className="text-caak-darkBlue text-15px font-medium"/>

                    
                    <TopMembers title={"Миний найзууд"} className="text-caak-darkBlue text-15px font-medium"/>

                    
                    <Suggest title={"Миний элссэн группууд"} className="text-caak-darkBlue text-15px font-medium"/>
                </div>*/}

                {/* post */}
                <div className="mt-c11 2xl:absolute 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">

                    {/* navigator */}
                    <div className="flex justify-between mt-c2 items-center">
                        <div className="flex">
                            <Button className="bg-white text-15px font-bold h-c32 text-caak-primary flex justify-center items-center mr-a1 rounded-lg shadow hover:bg-caak-titaniumwhite"><span className="icon-fi-rs-drag text-20px mr-a1"/>Миний фостууд</Button>
                            <Button className="text-15px font-bold h-c32 text-caak-generalblack flex justify-center items-center mr-a1 rounded-lg bg-transparent hover:bg-caak-titaniumwhite"><span className="icon-fi-rs-bookmark text-20px mr-a1"/>Хадгалсан фостууд</Button>
                        </div>
                        <select className="text-15px w-c132 text-caak-generalblack font-semibold cursor-pointer border-0 bg-transparent">
                            <option>Илүү ихийг</option>
                            <option>Тйреырбйыр</option>
                            <option>йыөүйзшыбаөүк</option>
                        </select>
                    </div>

                    {/* contents */}
                    <div className="2xl:grid 2xl:grid-cols-3 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 gap-c11 mt-b4">
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
