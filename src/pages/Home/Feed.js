import { useCallback, useState } from "react";
import Card from "../../components/card";
import Button from "../../components/button";
import BottomTabs from "./BottomTabs";

const Feed = () => {

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
    /*{
      id: 3,
      type: "Бүлгүүд",
      icon: "icon-fi-rs-group",
    },
    {
      id: 4,
      type: "Дагасан найзууд",
      icon: "icon-fi-rs-following",
    },*/
  ];
  const [activeIndex, setActiveIndex] = useState();

  const CardWithClick = useCallback(
    (props) => <Card {...props} verifiedUser />,
    []
  );
  //TODO Responsive

  const [data] = useState(new Array(9).fill(""))

  return (
    <div>
    <main>
      <div className={"pt-4 w-full flex justify-center"}>
        {/* <Card verifiedUser video/> */}
        <div className={"h-full "}>
          <div className={"flex justify-center"}>
            {feedType.map(({ icon, active, type, id }) => {
              return (
                <Button
                  key={id}
                  onClick={() => setActiveIndex(id)}
                  className={`h-c32 ph:h-c24 w-c14 ph:w-c38 ${
                    id === activeIndex
                      ? "white shadow-button mb-2"
                      : "transparent mb-2"
                  }`}
                  iconPosition={"left"}
                  icon={
                    <div className={"w-5 mr-4 ph:w-4 ph:mr-2"}>
                      <i
                        className={`${icon}${
                          id === activeIndex ? "" : "-o"
                        } text-19px ph:text-15px`}
                      />
                    </div>
                  }
                >
                  <p className="text-18px ph:text-15px font-medium ">{type}</p>
                </Button>
              );
            })}
          </div>
          <div className="2xl:grid-cols-3 xl:grid xl:grid-cols-3 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 gap-c11 mt-b4 ph:mt-0 mb-b4">
            {
              data.map((data, index) => {
                return(
                  <Card key={index} className="ph:mb-4 sm:mb-4 btn:mb-4"/>
                )
              })
            }
          </div>
        </div>
      </div>
    </main>
    <footer className={`hidden ph:block sticky bottom-0`}>
      <BottomTabs />
    </footer>
  </div>
  );
};

export default Feed;
