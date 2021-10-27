import Dummy from "dummyjs";
import { getFileUrl } from "../../Utility/Util";
import { useHistory, useLocation } from "react-router";

const GroupSubHeader = ({param, group}) => {
  const history = useHistory();
  const location = useLocation();
  
  return (
    <div className="sm:flex sm:py-c6 py-px-8 sm:rounded-lg sm:px-c3 px-c6 ph:w-full mt-5 bg-white">
      <div className="flex items-center justify-center w-full">
        <img
          alt=""
          src={param.sysUser.pic ? getFileUrl(param.sysUser.pic) : Dummy.img("200x200")}
          className={
            "w-c28 h-c28 ph:w-c25 ph:h-c25 block object-cover rounded-full"
          }
        />
        <div 
          onClick={() =>
          history.push({
            pathname: "/post/add/new",
            state: { background: location },
            })
          } className="ml-c6 w-ci 2xl:w-cg xl:w-cc md:w-ce">
          <p className="text-15px text-caak-darkBlue h-c30 ph:h-c37 bg-caak-liquidnitrogen pl-px-10 hover:bg-gray-200 flex items-center w-full rounded-lg cursor-pointer">
            Группт пост оруулах
          </p>
        </div>
      </div>
      <div className="mt-px-12 sm:mt-0 flex items-center justify-center">
        <div className="sm:ml-b5 w-c132 flex cursor-pointer">
          <span className="icon-fi-rs-image text-22px text-caak-algalfuel" />
          <p className="text-15px text-caak-blue">Зураг/Видео</p>
        </div>
        {/* <div className="flex items-center cursor-pointer">
          <span className="icon-fi-rs-link pr-px-8 text-20px text-caak-bleudefrance" />
          <p className="text-15px text-caak-blue">Линк</p>
        </div> */}
      </div>
    </div>
  );
};

export default GroupSubHeader;
