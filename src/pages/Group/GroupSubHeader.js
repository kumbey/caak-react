import Dummy from "dummyjs";

const GroupSubHeader = () => {
  return (
      <div className="sm:flex sm:py-c6 py-a2 bg-white mt-5 sm:rounded-lg sm:px-c3 px-c6 ph:w-full">
        <div className="flex items-center justify-center w-full">
          <img
            alt=""
            src={Dummy.img("200x200")}
            className={
              "w-c28 h-c28 ph:w-c25 ph:h-c25 block object-cover rounded-full"
            }
          />
          <div className="ml-c6 w-ci 2xl:w-cg xl:w-cc md:w-ce">
            <p className="text-15px text-caak-darkBlue h-c30 ph:h-c37 bg-caak-liquidnitrogen pl-b1 hover:bg-gray-200 flex items-center w-full rounded-lg cursor-pointer">
              Энэ бүлэгт пост нийтлэх...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-b2 sm:mt-0">
          <div className="sm:ml-b5 flex cursor-pointer w-c132">
            <span className="icon-fi-rs-image mr-a2 text-22px text-caak-algalfuel" />
            <p className="text-15px text-caak-blue">Зураг/Видео</p>
          </div>
          <div className="flex items-center cursor-pointer">
            <span className="icon-fi-rs-link pr-a2 text-20px text-caak-bleudefrance" />
            <p className="text-15px text-caak-blue">Линк</p>
          </div>
        </div>
      </div>
  );
};

export default GroupSubHeader;
