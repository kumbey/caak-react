import {useCallback, useState} from "react";
import Card from "../../components/card";
import {Masonry} from "masonic";
import Button from "../../components/button";
import {
  faEgg,
  faFire,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Feed = () => {
  let i = 0;
  // const items = Array.from(Array(20), () => ({ id: i++ }));
  const [items] = useState(() =>
      Array.from(Array(10), () => ({
        id: i++,
        src: `https://picsum.photos/id/1/${Math.random(0, 1) > 0.5 ? 800 : 600}/${
            Math.random(0, 1) > 0.5 ? 600 : 800
        }/`,
      }))
  );

  const feedType = [
    {
      id: 0,
      type: "Тренд",
      icon: faFire,
    },
    {
      id: 1,
      type: "Шинэ",
      icon: faEgg,
    },
    {
      id: 2,
      type: "Шилдэг",
      icon: faUsers,
    },
    {
      id: 3,
      type: "Бүлгүүд",
      icon: faUsers,
    },
    {
      id: 4,
      type: "Дагасан найзууд",
      icon: faUserFriends,
    },
  ];
  const [activeIndex, setActiveIndex] = useState();

  const CardWithClick = useCallback(
      (props) => <Card {...props} video verifiedUser/>,
      []
  );
  //TODO Responsive
  return (
      <main className={"flex justify-center items-center"}>
        <div className={"py-10 flex justify-center w-full px-7"}>
          {/*<Card verifiedUser video/>*/}
          <div className={"h-full w-2/12"}>
            <div className={"flex flex-col items-start"}>
              {feedType.map(({icon, active, type, id}) => {
                return (
                    <Button
                        key={id}
                        onClick={() => setActiveIndex(id)}
                        className={`sm:w-56  w-full ${
                            id === activeIndex
                                ? "white shadow-button mb-2"
                                : "transparent mb-2"
                        }`}
                        iconPosition={"left"}
                        icon={
                          <FontAwesomeIcon
                              size={"lg"}
                              className={`mr-4 ${
                                  id === activeIndex
                                      ? "text-caak-primary"
                                      : "text-caak-generalblack"
                              }`}
                              icon={icon}
                          />
                        }
                    >
                      {type}
                    </Button>
                );
              })}
            </div>
          </div>
          <div
              className={"flex flex-row justify-center items-center w-8/12 px-4"}
          >
            {/*TODO useMasonry to fix attribute warnings*/}
            <Masonry
                // className={"flex flex-row justify-center items-center w-8/12"}
                items={items}
                columnGutter={16}
                columnWidth={325}
                overscanBy={3}
                render={Card}
            />
          </div>

          <div className={"bg-red-100 h-full w-2/12"}></div>
        </div>
      </main>
  );
};

export default Feed;
