import { useState } from "react";
import Button from "../../components/button";
import Backdrop from "../../components/Backdrop";
import { closeModal } from "../../Utility/Util";
import { useHistory, useLocation } from "react-router";

const items = [
  {
    id: 1,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Спорт",
  },
  {
    id: 2,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Технологи",
  },
  {
    id: 3,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Хөгжилтэй",
  },
  {
    id: 4,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Хоол",
  },
  {
    id: 5,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Аялал",
  },
  {
    id: 6,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Түүх",
  },
  {
    id: 7,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Шинжлэх ухаан",
  },
  {
    id: 8,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Гоо сайхан",
  },
  {
    id: 9,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Урлаг",
  },
  {
    id: 10,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Дуу хөгжим",
  },
  {
    id: 11,
    icon: <span className="icon-fi-rs-world mr-1.5 text-20px" />,
    title: "Авто машин",
  },
];

export default function Interests() {
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();
  const { state } = useLocation();

  return (
    <Backdrop className="flex items-center justify-center">
      <div className=" ph:w-full bg-white rounded-lg shadow-xl">
        <div className="sm:px-10 pb-c1 px-2 bg-white rounded-lg shadow-xl">
          <div
            onClick={() => closeModal(history, state)}
            className="pt-c6 relative"
          >
            <span className="icon-fi-rs-close text-12px bg-caak-titaniumwhite w-c3 h-c3 absolute right-0 flex items-center justify-center rounded-full cursor-pointer" />
          </div>
          <div
            className={"flex justify-center mb-c2 font-bold text-24px pt-c5 "}
          >
            Миний сонирхол
          </div>
          <div
            className={
              "flex text-caak-darkBlue justify-center mb-c2 text-15px "
            }
          >
            Та өөрийн дуртай сонирхлуудыг сонгосноор <br></br> өөрийн хүрээллийг
            хурдан олох боломжтой.
          </div>
          <div className="sm:gap-4 grid grid-cols-2 gap-1">
            {items.map((data, id) => (
              <div
                key={id}
                onClick={() => setActiveIndex(id)}
                className={`flex border py-px-8 rounded-full justify-center cursor-pointer px-b5 ${
                  id === activeIndex ? "bg-caak-primary text-white" : ""
                }`}
              >
                {data.icon}
                <p className="text-15px font-medium">{data.title}</p>
              </div>
            ))}
          </div>
          <p className="text-caak-primary text-15px mt-5 text-center">
            Хамгийн багадаа 3-ыг сонгоно уу!
          </p>

          <div
            className={
              "signFooter flex self-end justify-center border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20"
            }
          >
            <Button className="w-full">Үргэлжлүүлэх</Button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
