import {useState, useEffect} from 'react'
import Admin from '../../components/Sidebar/Admin'
import Button from '../../components/button'
import Card from '../../components/card'
import Description from '../../components/Sidebar/Description'
import TopMembers from '../../components/Sidebar/TopMembers'
import Suggest from '../../components/Sidebar/Suggest'
import API from '@aws-amplify/api'
import { graphqlOperation } from '@aws-amplify/api-graphql'
import {getPostByStatus} from '../../graphql-custom/post/queries'
import { Link } from 'react-router-dom'
import { useLocation, useParams } from 'react-router'
import { useUser } from '../../context/userContext'
import { checkUser } from '../../Utility/Util'
import useInfiniteScroll from '../Home/useFetch'
import Loader from '../../components/loader'
import { listGroupsForAddPost, getGroupView } from '../../graphql-custom/group/queries'
import GroupHeader from './GroupHeader'
import Dummy from "dummyjs"
import { getGroupUserRole } from '../../graphql-custom/GroupUsers/queries'

export default function Group() {
    
    const { user } = useUser();
    const { groupId } = useParams();

    const [group, setGroup] = useState();
    const [posts, setPosts] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [nextToken, setNextToken] = useState();
    const location = useLocation();
    const [isFetching, setIsFetching] = useInfiniteScroll(() => {});
    const [userRole, setUserRole ] = useState("")

    console.log("posts",posts);

    useEffect(() => {
      try {
        const getGroup = async (id) => {
          const res = await API.graphql(graphqlOperation(getGroupView, { id }));
          setGroup(res.data.getGroup);
        };
        getGroup(groupId);
      } catch (ex) {
        console.log(ex);
      }
    }, [groupId]);

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
  
      useEffect(() => {
          if(checkUser(user)){
            console.log("USER EFFECT")
            fetchtGroupUserRole()
          }
          // eslint-disable-next-line
      }, [user]);
  
    const fetchtGroupUserRole = async () => {
      try {
        let resp = await API.graphql(graphqlOperation(getGroupUserRole, {
          user_id: user.sysUser.id,
          group_id: groupId
        }));
        setUserRole(resp.data.getGroupUsers.role)
      } catch (ex) {
        console.log(ex);
      }
    };

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
    };

    return ( group ?
        <div>
            <div className="bg-white relative justify-center h-c18">
                <GroupHeader group={group}/>
            </div>

            {/* body */}
            <div className="2xl:flex sm:flex md:flex lg:flex xl:flex md:flex">

                {/* sideBar */}
                <div className="mt-c24 ml-c3 2xl:w-c22 md:w-c17">

                    {/* admin */}
                    {/* { (userRole == "ADMIN" || userRole == "MODERATOR") ? */}
                        <Admin userRole={userRole} /> : null
                    {/* } */}

                    {/* description */}
                    <Description about={group.about}/>

                    {/* top members */}
                    {/* <TopMembers/> */}

                    {/* suggested */}
                    {/* {
                      groupData.map((data, index) => {
                        return(
                          <Link
                            key={index}
                            to={{
                              pathname: `/group/view/${data.id}`
                            }}
                          >
                        <Suggest
                          item={data}
                          className="ph:mb-4 sm:mb-4 btn:mb-4"
                        />
                      </Link>
                        )
                      })
                    } */}
                </div>

                {/* post */}
                <div className="flex flex-col w-full items-left sm:justify-center md:justify-center xl:justify-start xl:content-start">

                    {/* header */}
                    {/* <div className="bg-white h-c29 rounded rounded-lg flex items-center justify-between pr-b5">
                      <img
                        alt={user.sysUser.nickname}
                        src={Dummy.img("200x200")}
                        className={"w-c28 w-c28 block object-cover rounded-full ml-c3"}
                      />
                        <div className="2xl:w-cg xl:w-cc md:w-ci ml-c6">
                            <p onClick={() => alert("yu ch hiigd bgan")} className="text-15px text-caak-darkBlue flex items-center w-full h-c30 bg-caak-liquidnitrogen rounded-lg pl-b1 hover:bg-gray-200 cursor-pointer">Энэ бүлэгт фост нийтлэх...</p>
                        </div>
                        <div className="flex ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-image mr-a2 text-22px text-caak-algalfuel"/>
                            <p className="text-15px text-caak-blue">Зураг/Видео</p>
                        </div>
                        <div className="flex items-center  ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-link pr-a2 text-20px text-caak-bleudefrance"/>
                            <p className="text-15px text-caak-blue">Линк</p>
                        </div>
                    </div> */}

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
                    <div className="flex flex-col w-full items-center sm:justify-center md:justify-center xl:justify-start xl:content-start">
                      <div className="2xl:grid-cols-3 xl:grid xl:grid-cols-2 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 gap-c11 mt-b4 ph:mt-0 mb-b4">
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
                                className="ph:mb-4 sm:mb-4 btn:mb-4"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <Loader
                      className={`bg-caak-primary ${
                        isFetching ? "opacity-100" : "opacity-0"
                      }`}
                    />
                </div>
            </div>
        </div> 
          : 
        null
    )
}
