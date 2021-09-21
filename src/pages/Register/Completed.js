import React from "react";
import { useHistory } from "react-router";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'

export default function Completed() {
    const history = useHistory();
    function home(){
        history.push("/")
    }
    return (
        <Backdrop>
            <div className=" sm:mx-auto pt-40 pb-96 sm:max-w-md sm:max-h-md sm-my-auto h-full ">
                <div className="loginCard min-w-max sm:w-full relative w-screen px-10 py-8 bg-white rounded-lg shadow-xl">
                    <div className="flex justify-end">
                    </div>
                    <div className=" flex justify-center text-56px ">
                    <FontAwesomeIcon
                    className={"text-caak-algalfuel cursor-pointer mt-8"}
                    icon={faCheckCircle}
                    />
                    </div>
                    <div className={"flex text-caak-generalblack justify-center text-center align-center mb-4 font-bold text-24px mt-5"}>
                        Шинэ Саак-т <br/> Тавтай морилно уу?
                    </div>
                    <div className="flex justify-center">
                    <Button onClick={home} round className={"font-bold bg-caak-primary py-3 px-14 text-17px mt-10"}>
                        Нүүр хуудас руу очих
                    </Button>
                    </div>
        </div>
      </div>
    </Backdrop>
    )
}
