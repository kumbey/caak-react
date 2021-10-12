import React, {useState, useEffect} from 'react'
import Button from '../../components/button'
import Card from '../../components/card'
import { useHistory, useLocation } from 'react-router'
import { getPostByStatus } from '../../graphql-custom/post/queries'
import useInfiniteScroll from '../Home/useFetch'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'
import { useListPager } from '../../Utility/ApiHelper'
import { getUser } from '../../graphql-custom/user/queries'
import API from '@aws-amplify/api'
import { graphqlOperation } from '@aws-amplify/api-graphql'
import { useParams } from 'react-router'
import Dummy from "dummyjs"

export default function Profile() {

    const [user, setUser] = useState();
    const { userId } = useParams();
    const history = useHistory();
    console.log(user)
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const [nextPosts] = useListPager({
      query: getPostByStatus,
      variables: {
        sortDirection: "DESC",
        status: "CONFIRMED",
        limit: 6,
      }
    })

    const [setPostScroll] = useInfiniteScroll(posts, setPosts);
    //FORCE RENDER STATE
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
      try {
        const getUserById = async (id) => {
          const resp = await API.graphql(graphqlOperation(getUser, { id }));
          setUser(resp.data.getUser);
        };
        getUserById(userId);
      } catch (ex) {
        console.log(ex);
      }
    }, [userId]);

    useEffect(() => {
      fetchPosts(posts ,setPosts);
      setPostScroll(fetchPosts)
      // eslint-disable-next-line
    }, []);

    const fetchPosts = async (data, setData) => {
      try {
        if(!loading){
          setLoading(true)
  
          let resp = await nextPosts()
          if(resp){
            setData([...data, ...resp]);
          }
  
          setLoading(false)
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    return user ? (
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
              <div className="md:flex sm:grid ph:grid w-full justify-between ph:justify-center 2xl:px-cf xl:px-ch lg:px-c12 md:px-c30">
                <div className="ph:text-center">
                  <div className="flex ph:grid">
                    <div className="ph:grid ph:justify-center">
                      <img style={{height: '120px', width: '120px'}} alt={user.nickname}
                        data-dummy="200x200"
                        src={Dummy.img("200x200")} className="rounded-full ph:w-c31 ph:h-c31"
                      />
                    </div>
                    <div className="ph:grid ph:justify-center ph:mt-3 sm:ml-c6">
                        <p style={{marginBlockStart: "13px"}} className="text-26px  font-bold ph:hidden">{user.firstname}</p>
                        <p className="text-18px text-caak-generalblack font-normal flex ph:justify-center items-center">@{user.nickname}<span style={{marginInlineStart: "4px"}} className="icon-fi-rs-verified text-13px text-caak-buttonblue" /></p>
                        <div className="flex mt-b4">
                            <span className="flex items-center"><p className="text-18px font-medium text-caak-generalblack">{user.aura || "0"}</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">Аура</p></span>
                            <span className="flex items-center mx-c11 ph:mx-a2"><p className="text-18px font-medium text-caak-generalblack">{user.totals.followers}</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">дагагчид</p></span>
                            <span className="flex items-center"><p className="text-18px font-medium text-caak-generalblack">{user.totals.confirmed}</p> <p style={{marginInlineStart: "4px"}} className="text-15px text-caak-darkBlue">фост</p></span>
                        </div>
                    </div>
                  </div>
                  <p className="text-15px text-caak-generalblack mt-a2 sm:mt-c11">{user.about}</p>
                </div>
                <div style={{marginTop: "10px"}}>
                    <div className="flex ph:hidden">
                        <div onClick={() => history.push({pathname: "/profile/settings"})} className="h-c13 shadow flex items-center rounded-lg px-c1 cursor-pointer"><span className="pr-a1 icon-fi-rs-settings text-18px"/><p className="text-15px font-medium">Тохиргоо</p></div>
                        <span style={{width: "49px", marginInlineStart: "10px"}} className="h-c13 text-4px shadow icon-fi-rs-dots text-caak-generalblack items-center flex justify-center rounded-lg cursor-pointer"/>
                    </div>
                    <div className="flex ph:mt-4 md:mt-10 justify-end ph:justify-center">
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
                            <option>Илүү ихийг</option>
                            <option>Илүү ихийг</option>  
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
                        containerClassName={"self-center"}
                        className={`bg-caak-primary ${
                          loading ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                </div>
            </div>
        </div>
    ) 
    : null
}
