import React from 'react'
import ProfileBack from '../../components/Sidebar/ProfileBack'
import PostPending from '../Group/PostPending'
import { useState } from 'react';
import {types} from './data'
import { useHistory } from 'react-router';

export default function Activities() {

    const history = useHistory();

    const [selected, setSelected] = useState();

    const handleColor = (row) => {
        setSelected(row.title);
    };
    return (
        <div>
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
            <div className="2xl:flex sm:grid md:grid lg:flex xl:flex md:flex ph:grid">

                {/* sideBar */}
                <div className="mt-b5 ml-c3 2xl:w-c22 md:w-c17 ph:hidden">

                    {/*profile*/}
                    <ProfileBack title={"Профайл руу буцах"}/>

                    {/*my rate*/}
                    <div style={{marginTop: "23px"}}>
                        <p className="text-17px font-bold text-caak-generalblack">Миний идэвхи</p>
                        <div>
                            {types.map((list) => (
                                <div
                                    className="flex items-center cursor-pointer py-a1 rounded-lg "
                                    key={list.title}
                                    onClick={() => handleColor(list)}
                                    style={{ backgroundColor: list.title === selected ? "white" : "", boxShadow: list.title === selected ? "0px 1px 2px #9E9E9E" : "" }}
                                >
                                    {list.icon}
                                    <p>{list.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* post */}
                <div className="border  rounded-lg mt-c11 2xl:absolute 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18 bg-white lg:left-c12 lg:right-c12 sm:left-b1 sm:right-b1 ">
                    <p style={{margin: "28px"}} className="text-18px font-medium text-caak-generalblack">Нийтэд оруулсан фостууд</p>
                    <PostPending settt/>
                </div>
            </div>
        </div>
    )
}
