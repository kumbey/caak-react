import Dummy from "dummyjs";

const GroupSubHeader = () => {
  return (
    <div>
      <div className="ph:w-full h-c29 ph:h-c35 sm:rounded-lg ph:flex-col ph:justify-evenly ph:pr-a1 sm:pr-b5 mt-c6 flex justify-between bg-white">
        <div className="flex items-center justify-center">
          <img
            alt=""
            src={Dummy.img("200x200")}
            className={
              "w-c28 h-c28 ph:w-c25 ph:h-c25 block object-cover rounded-full sm:ml-c3 ph:ml-c6"
            }
          />
          <div className="2xl:w-cg xl:w-cc md:w-ci ml-c6">
            <p
              onClick={() => alert("yu ch hiigd bgan")}
              className="text-15px text-caak-darkBlue h-c30 ph:h-c37 bg-caak-liquidnitrogen pl-b1 hover:bg-gray-200 flex items-center w-full rounded-lg cursor-pointer"
            >
              Энэ бүлэгт фост нийтлэх...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="ml-b5 flex cursor-pointer">
            <span className="icon-fi-rs-image mr-a2 text-22px text-caak-algalfuel" />
            <p className="text-15px text-caak-blue">Зураг/Видео</p>
          </div>
          <div className="ml-b5 flex items-center cursor-pointer">
            <span className="icon-fi-rs-link pr-a2 text-20px text-caak-bleudefrance" />
            <p className="text-15px text-caak-blue">Линк</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSubHeader;
