import {useState, useEffect} from 'react'
import Admin from '../../components/Sidebar/Admin'
import PostPending from './PostPending';
import { useHistory, useParams } from 'react-router';
import { generateFileUrl } from '../../Utility/Util';
import Button from '../../components/button';
import API from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import { getGroupView } from '../../graphql-custom/group/queries';

export default function PendingPostAdmin() {
    const history = useHistory();
    const { groupId } = useParams();
    const [group, setGroup] = useState([]);

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

    const totalMembers = () => {
        //return parseInt(group.totals.admin) + parseInt(group.totals.moderator) + parseInt(group.totals.moderator);
    }

    return (
        <div>
            <div className="sm:hidden flex w-full items-center py-a3 bg-white border-t-2 border-b-2 px-c6">
                <span className="icon-fi-rs-back w-1/4"/>
                <div className="flex items-center">
                    <img alt="" src={generateFileUrl(group.profile)} className="w-8 h-8 rounded-lg"/>
                    <p className="text-26px ph:text-22px font-bold ml-b1">Group Name</p>
                </div>
            </div>
            <div className="relative bg-white h-c18 flex justify-center ph:hidden">
                <img alt="cover" src={generateFileUrl(group.cover)} className="w-full h-c17 ph:h-c31"/>

                {/* menu */}
                <div className="flex justify-between absolute xl:bottom-c6 bottom-a1 w-full 2xl:px-cf xl:px-ch lg:px-c12 md:px-c30">
                <div className="flex ph:grid items-center w-full mx-c6">
                    <img alt="" src={generateFileUrl(group.profile)} className="w-c19 h-c19 border-4 border-white rounded-lg"/>
                        <div className="ml-c6 ph:ml-0">
                            <div className="flex items-center">
                                <p className="text-26px ph:text-22px font-bold">
                                    Group Name
                                </p>
                                <span className="icon-fi-rs-back text-12px ml-b3 transform rotate-180 ph:block hidden" />
                            </div>
                            <div className="flex items-center ph:grid">
                                <div className="flex items-center">
                                    <span className="icon-fi-rs-world text-16px text-caak-darkBlue flex"/>
                                    <p className="text-15px ml-a1 text-caak-darkBlue">Нээлттэй бүлэг</p>
                                </div>
                                <p className="mx-a1 ph:hidden">·</p> 
                                <p className="text-15px text-caak-darkBlue">
                                    {
                                        totalMembers() 
                                    }
                                    {` гишүүнтэй`}
                                </p>
                            </div>
                        </div>
                        <div className="hidden ph:block w-full">
                            <Button className="w-full flex items-center bg-caak-bleudefrance">
                                <span className="icon-fi-rs-add-group-f text-20px"/>
                                <p className="text-16px font-medium ml-b3">
                                {group.followed ? `Нэгдсэн`:`Нэгдэх` }
                                </p>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-end ph:hidden">
                        <Button className="ph:mb-b1 h-c13 text-15px rounded rounded-lg bg-caak-titaniumwhite text-caak-generalblack"> 
                            <span className="icon-fi-rs-check text-12px mr-a1"/>
                            {group.followed ? `Нэгдсэн`:`Нэгдэх` }
                        </Button>
                        {/* <Button className="h-c13 text-15px rounded rounded-lg bg-caak-generalblack ml-b1"> 
                            <span className="icon-fi-rs-link text-15px mr-a1"/>
                            Найзаа урих
                        </Button> */}
                        <div className="flex">
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

            {/* body */}
            <div className="2xl:flex sm:grid md:flex lg:flex xl:flex items-start">

                {/* sideBar */}
                <div className="mt-c24 ml-c3 2xl:w-c22 md:w-c17 grid justify-center ph:hidden">
                    <div style={{marginBlockEnd: "23px"}}>
                        <p className="text-17px font-bold text-caak-generalblack">Бүлэг руу буцах</p>
                        <div onClick={() => history.push({pathname: "/group"})} className="flex items-center mt-b5 cursor-pointer">
                            <img alt="" src={generateFileUrl()} className="bg-caak-red h-c37 w-c37 rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-medium ml-a2">Монгол өв уламжлал</p>
                        </div>
                    </div>

                    {/* admin */}
                    <Admin/>

                </div>

                {/* post */}
                <div className=" rounded-lg bg-white mt-c11 2xl:absolute 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18  lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">

                    {/* navigator */}
                    <div className="flex justify-between  items-center p-c11">
                        <div className="flex items-center">
                            <p className="text-18px text-caak-generalblack font-medium">Хүлээгдэж буй фостууд</p>
                            <p style={{marginLeft: '6px'}} className=" text-13px px-b3 bg-caak-bleudefrance rounded-full text-caak-bleudefrance bg-opacity-20">4</p>
                        </div>
                        <select className="shadow rounded-lg text-15px text-caak-generalblack font-medium cursor-pointer border-0 ">
                            <option>Шинэ фостууд</option>
                            <option>Тйреырбйыр</option>
                            <option>йыөүйзшыбаөүк</option>
                        </select>
                    </div>

                    {/* pending posts */}
                    <div>
                        <PostPending/>
                    </div>
                </div>
            </div>
        </div>
    )
}
