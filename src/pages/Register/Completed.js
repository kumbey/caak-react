import React from "react";
import { useHistory, useLocation } from "react-router";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'
import Backdrop from "../../components/Backdrop";
import { closeModal } from "../../Utility/Util";

export default function Completed() {

    const history = useHistory();
    const { state } = useLocation()

    return (
        <Backdrop className={"flex justify-center items-center"}>
            <div className=" sm:mx-auto w-cc sm:max-h-md">
                <div className=" sm:w-full bg-white rounded-lg shadow-xl">
                    <div className="flex  px-c6 justify-end pt-c6 items-center  cursor-pointer ">
                        <span 
                            onClick={() => closeModal(history, state)}
                            className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex justify-center cursor-pointer items-center rounded-full"
                        />
                    </div>  
                    <div className=" flex justify-center text-56px mt-c15">
                        <FontAwesomeIcon
                        className={"text-caak-algalfuel cursor-pointer"}
                        icon={faCheckCircle}
                        />
                    </div>
                    <div className={"flex text-caak-generalblack justify-center text-center align-center font-bold text-24px mt-c11"}>
                        Шинэ Саак-т <br/> Тавтай морилно уу?
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={() => closeModal(history, state)} round className={"font-bold bg-caak-primary rounded-lg h-c9 w-cd text-17px my-c15"}>
                            Нүүр хуудас руу очих
                        </Button>
                    </div>
                </div>
            </div>
        </Backdrop>
    )
}
