import {group_data} from './groupData'
import { useState } from 'react';
import Settings from './Settings';
<<<<<<< Updated upstream
import { useHistory } from 'react-router';

export default function Infromation() {

    const history = useHistory();


=======

export default function Infromation() {

>>>>>>> Stashed changes
    const [selected, setSelected] = useState();

    const handleColor = (row) => {
        setSelected(row.title);
    };

    return (
<<<<<<< Updated upstream
        <div style={{marginTop: "36px"}} className="grid justify-center ">
            <div className="flex items-center justify-start">
                <span onClick={() => history.goBack()} style={{paddingBlock: "15px", paddingInline: "19px"}} className="icon-fi-rs-back bg-caak-titaniumwhite rounded-full cursor-pointer"/>
                <img alt="" style={{height: "52px", width: "52px", marginInlineStart: "20px", marginInlineEnd: "8px"}}  className="rounded-lg bg-caak-red"/>
                <p className="text-24px font-medium text-caak-generalblack">Монгол өв уламжлал</p>
            </div>
            <div style={{marginTop: "34px"}} className="2xl:flex xl:flex md:flex">
                <div style={{height: "170px"}} className="bg-white rounded-lg pr-c13">
=======
        <div style={{marginTop: "36px", marginInline: "500px"}} className="grid">
            <div className="flex items-center justify-start">
                <span style={{paddingBlock: "15px", paddingInline: "19px"}} className="icon-fi-rs-back bg-caak-titaniumwhite rounded-full"/>
                <img alt="" style={{height: "52px", width: "52px", marginInlineStart: "20px", marginInlineEnd: "8px"}}  className="rounded-lg bg-caak-red"/>
                <p className="text-24px font-medium text-caak-generalblack">Монгол өв уламжлал</p>
            </div>
            <div style={{marginTop: "34px"}} className="flex">
            <div style={{height: "170px"}} className="bg-white rounded-lg pr-c13">
>>>>>>> Stashed changes
                            {group_data.map((list) => (
                                <div
                                    className={`flex items-center cursor-pointer py-a1 rounded-lg ${list.title === selected ? "text-caak-primary" : "text-caak-generalblack"}`}
                                    key={list.title}
                                    onClick={() => handleColor(list)}
                                >
                                    {list.icon}
                                    <p className="text-17px font-medium">{list.title}</p>
                                </div>
                            ))}
<<<<<<< Updated upstream
                </div>
=======
                        </div>
>>>>>>> Stashed changes
                <div style={{ width: "608px", marginInlineStart: "19px"}} className="bg-white rounded-lg">
                    <Settings/>
                </div>
            </div>
        </div>
    )
}
