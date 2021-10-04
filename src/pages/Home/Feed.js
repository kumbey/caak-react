import { useCallback, useState } from "react";
import Card from "../../components/card";
import { Masonry } from "masonic";
import Button from "../../components/button";

const Feed = () => {
  let i = 0;
  // const items = Array.from(Array(20), () => ({ id: i++ }));
  const [items] = useState(() =>
    Array.from(Array(10), () => ({
      id: i++,
      src: `https://picsum.photos/id/1/${Math.random(0, 1) > 0.5 ? 800 : 600}/${
        Math.random(0, 1) > 0.5 ? 600 : 800
      }/`,
      title: `Өнөөдрийн зурвас: Найз минь надад шүлэг бичсэн! ${Math.floor(Math.random() * 100)}`,
      comments: `${Math.floor(Math.random() * 50)}`,
      likes: `${Math.floor(Math.random() * 100)}`
    }))
  );

  const feedType = [
    {
      id: 0,
      type: "Тренд",
      icon: "icon-fi-rs-trend",
    },
    {
      id: 1,
      type: "Шинэ",
      icon: "icon-fi-rs-new",
    },
    {
      id: 2,
      type: "Шилдэг",
      icon: "icon-fi-rs-top",
    },
    {
      id: 3,
      type: "Бүлгүүд",
      icon: "icon-fi-rs-group",
    },
    {
      id: 4,
      type: "Дагасан найзууд",
      icon: "icon-fi-rs-following",
    },
  ];
  const [activeIndex, setActiveIndex] = useState();

  // eslint-disable-next-line
  const CardWithClick = useCallback(
    (props) => <Card {...props} verifiedUser />,
    []
  );
  //TODO Responsive
  return (
    <main className={"flex justify-center items-center"}>
      <div className={"py-10 flex justify-center w-full px-7"}>
        {/* <Card verifiedUser video/> */}
        <div className={"h-full w-3/12"}>
          <div className={"flex flex-col items-start"}>
            {feedType.map(({ icon, active, type, id }) => {
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
                    <div className={"w-5 mr-4"}>
                      <i
                        className={`${icon}${
                          id === activeIndex ? "" : "-o"
                        } text-20px `}
                      />
                    </div>
                  }
                >
                  {type}
                </Button>
              );
            })}
          </div>
<<<<<<< Updated upstream
=======
          <div className="2xl:grid-cols-3 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 gap-c11 mt-b4 ph:mt-0 mb-b4">
            {
              data.map((data, index) => {
                return(
                  <Card key={index} className="ph:mb-4 sm:mb-4 btn:mb-4"/>
                )
              })
            }
          </div>
>>>>>>> Stashed changes
        </div>
        <div
          className={"flex flex-row justify-center items-center w-9/12 px-4"}
        >
          {/* <CardRecommend/> */}
          {/*TODO useMasonry to fix attribute warnings*/}
          <Masonry
            // className={"flex flex-row justify-center items-center w-8/12"}
            items={items}
            columnGutter={16}
            columnWidth={400}
            overscanBy={2}
            render={Card}
          />
        </div>

        {/*<div className={"md:block hidden bg-red-100 h-full w-2/12"}/>*/}
      </div>
    </main>
  );
};

export default Feed;
