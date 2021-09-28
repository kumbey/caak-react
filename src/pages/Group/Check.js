import { useState } from "react";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/button";
import ImageCarousel from "../../components/carousel/ImageCarousel";
import { useHistory } from "react-router";

export default function Check() {
    const history = useHistory();
    let i = 0;
    // const items = Array.from(Array(20), () => ({ id: i++ }));
    const [items] = useState(() =>
        Array.from(Array(10), () => ({
            id: i++,
            src: `https://picsum.photos/id/${Math.floor(
                Math.random(0, 1) * 10
            )}/550`,
        }))
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const nextItem = () => {
        if (activeIndex !== items.length - 1) setActiveIndex(activeIndex + 1);
    };

    const prevItem = () => {
        if (activeIndex !== 0) setActiveIndex(activeIndex - 1);
    };

    return (
        <Backdrop className="flex justify-center items-center">
            <div className="2xl:flex xl:flex lg:flex md:flex sm:grid ph:grid btn:grid" >
                <div>
                    <div className="bg-white rounded-lg">
                        <p style={{paddingBlockStart: '21px', marginBlockEnd: '17px'}} className="text-20px text-caak-generalblack font-bold flex justify-center">Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн!</p>
                        <div className="bg-black flex items-center">
                            <div
                                className={
                                    "relative max-w-full w-full  flex justify-evenly items-center bg-black bg-opacity-60 h-full"
                                }
                            >
                                <span
                                    style={{paddingInline: "19px", paddingBlock: '15px'}}
                                    onClick={() => prevItem()}
                                    className={
                                        "icon-fi-rs-back text-white cursor-pointer bg-white rounded-full bg-opacity-10 hover:bg-opacity-30"
                                    }
                                />
        <ImageCarousel>
            {items.map((item, index) => {
                if (activeIndex === index)
                    return (
                        <img
                            className={`2xl:h-full 2xl:w-full 2xl:max-h-half xl:w-full md:w-full md:w-full sm:w-full btn:w-full ph:w-full`}
                            key={index}
                            src={item.src}
                            alt={""}
                        />
                    );
                return null;
            })}
        </ImageCarousel>
        <div className={"flex flex-row absolute bottom-6"}>
            {items.map((_, index) => {
                return (
                <div
                    key={index}
                    className={`rounded-full mr-1.5 w-2 h-2 bg-white ${
                        activeIndex === index ? "bg-opacity-100" : "bg-opacity-40"
                    } `}
                />
                );
            })}
        </div>
        <span
            style={{paddingInline: "19px", paddingBlock: '15px'}}
            onClick={() => nextItem()}
            className={
                "icon-fi-rs-back text-white transform rotate-180 cursor-pointer bg-white rounded-full bg-opacity-10 hover:bg-opacity-30"
            }
        />
    </div>
                    </div>
                        <div className="mt-c6 grid justify-center mx-c3 ">
                            <p style={{maxWidth: '600px'}} className="text-18px text-caak-generalblack">Зураг түс бүрийн тайлбар энэ хэсэгт орох бөгөөд өгүүлбэрийн үсгийн тоо хязгаартай байна.</p>
                            <div className="flex items-center justify-between my-c6">
                                <div className="flex items-center">
                                    <img alt="" src="https://picsum.photos/200" className="h-c13 w-c13 rounded-full"/>
                                    <p className="ml-a2 text-15px font-bold text-caak-generalblack">Tulgaa</p>
                                </div>
                                <div>
                                    <p className="text-15px text-caak-darkBlue">30мин өмнө · 2021/09/20</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-b4">
                        <Button className="bg-white text-caak-generalblack text-15px w-c14">Татгалзах</Button>
                        <Button className="bg-caak-bleudefrance text-15px text-white ml-b1 mr-c11 w-c132">Зөвшөөрөх</Button>
                    </div>
                </div>
                <span onClick={() => history.goBack()} className="icon-fi-rs-close text-white text-30px mt-c3 ml-c3 cursor-pointer btn:flex btn:justify-center"/>
            </div>
            
        </Backdrop>
    )
}
