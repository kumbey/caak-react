import {useState, useEffect} from 'react'
import Button from '../../components/button'
import Card from '../../components/card'
import API from '@aws-amplify/api'
import { graphqlOperation } from '@aws-amplify/api-graphql'
import {getPostByStatus} from '../../graphql-custom/post/queries'
import { Link } from 'react-router-dom'
import { useLocation, useParams, useHistory } from 'react-router'
import { useUser } from '../../context/userContext'
import { checkUser } from '../../Utility/Util'
import useInfiniteScroll from '../Home/useFetch'
import Loader from '../../components/loader'
import { getGroupView } from '../../graphql-custom/group/queries'
import GroupHeader from './GroupHeader'
import Dummy from "dummyjs"

export default function Group() {
    
    const { user } = useUser();
    const { groupId } = useParams();

    const [group, setGroup] = useState([]);
    const [posts, setPosts] = useState([]);
    const [nextToken, setNextToken] = useState();
    const location = useLocation();
    const history = useHistory();
    const [isFetching, setIsFetching] = useInfiniteScroll(() => {});

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
    };
    return ( group ?
        <div>
          <div className="bg-white sm:hidden flex items-center justify-between px-c6 border-t border-b py-b3">
            <span onClick={() => history.goBack()} className="icon-fi-rs-back text-20px cursour-pointer"/>
            <p className="text-  font-medium">Грүпп</p>
            <span className="icon-fi-rs-dots text-4px" />
          </div>
            <GroupHeader group={group}/>

                {/* post */}
                <div className="ph:flex ph:flex-col ph:items-center grid justify-center">

                    {/* header */}
                      <div className="bg-white ph:w-full h-c29 ph:h-c35 sm:rounded-lg flex ph:flex-col ph:justify-evenly justify-between ph:pr-a1 sm:pr-b5 mt-c6">
                        <div className="flex items-center justify-center">
                          <img
                            alt=""
                            src={Dummy.img("200x200")}
                            className={"w-c28 h-c28 ph:w-c25 ph:h-c25 block object-cover rounded-full sm:ml-c3 ph:ml-c6"}
                          />
                          <div className="2xl:w-cg xl:w-cc md:w-ci ml-c6">
                            <p onClick={() => alert("yu ch hiigd bgan")} className="text-15px text-caak-darkBlue flex items-center w-full h-c30 ph:h-c37 bg-caak-liquidnitrogen rounded-lg pl-b1 hover:bg-gray-200 cursor-pointer">Энэ бүлэгт фост нийтлэх...</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="flex ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-image mr-a2 text-22px text-caak-algalfuel"/>
                            <p className="text-15px text-caak-blue">Зураг/Видео</p>
                          </div>
                          <div className="flex items-center  ml-b5 cursor-pointer">
                            <span className="icon-fi-rs-link pr-a2 text-20px text-caak-bleudefrance"/>
                            <p className="text-15px text-caak-blue">Линк</p>
                          </div>
                        </div>
                      </div> 

                    {/* navigator */}
                    <div className="flex justify-between mt-c2 items-center">
                        <div className="flex">
                            <Button className="bg-white text-15px font-bold w-c31 h-c32 text-caak-primary flex justify-center items-center mr-a1 rounded-lg shadow hover:bg-caak-titaniumwhite">Трэнд</Button>
                            <Button className="text-15px font-bold w-c7 h-c32 text-caak-generalblack flex justify-center items-center mr-a1 rounded-lg bg-transparent hover:bg-caak-titaniumwhite">Шинэ</Button>
                            <Button className="text-15px font-bold w-c7 h-c32 text-caak-generalblack flex justify-center items-center rounded-lg bg-transparent hover:bg-caak-titaniumwhite">Шилдэг</Button>
                        </div>
                        {/*<select className="text-15px text-caak-generalblack font-semibold cursor-pointer border-0 bg-transparent">
                            <option>Шинэ фостууд</option>
                            <option>Тйреырбйыр</option>
                            <option>йыөүйзшыбаөүк</option>
                          </select>*/}
                    </div>

                    {/* contents */}
                    <div>
                    <div style={{marginTop: "15px"}} className="grid gap-5 grid-cols-1 justify-center md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
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
