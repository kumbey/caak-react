import { useHistory } from "react-router";
import { useUser } from "../../context/userContext";
import { checkUser } from "../../Utility/Util";
import PostPendingUser from "./PostPendingUser";

export default function PendingPostUser() {
  const history = useHistory();
  const { user } = useUser();

  return checkUser(user) ? (
    <div>
      <div className="sm:hidden px-c6 py-b3 flex items-center justify-between bg-white border-t border-b">
        <span
          onClick={() => history.goBack()}
          className="icon-fi-rs-back text-20px cursour-pointer"
        />
        <p className="text- font-medium">Грүпп</p>
        <span className="icon-fi-rs-dots text-4px" />
      </div>
      {/*<GroupHeader group={groupData}/>*/}

      {/* body */}
      <div className="flex items-start justify-center w-full">
        <div className={"w-1/5 hidden md:block"} />
        {/*  <Admin />*/}
        {/* post */}
        <div className="mt-c11 md:w-3/5 w-full bg-white rounded-lg">
          {/* navigator */}
          <div className="p-c11 flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-18px text-caak-generalblack font-medium">
                Хүлээгдэж буй постууд
              </p>
              <p
                style={{ marginLeft: "6px" }}
                className="bg-opacity-20 text-13px px-b3 bg-caak-bleudefrance text-caak-bleudefrance rounded-full"
              >
                {/*{groupData.totals?.pending}*/}
              </p>
            </div>
            <select className="text-15px text-caak-generalblack font-medium border-0 rounded-lg shadow cursor-pointer">
              <option>Шинэ постууд</option>
              <option>Тйреырбйыр</option>
              <option>йыөүйзшыбаөүк</option>
            </select>
          </div>

          {/* pending posts */}
          <div>
            <PostPendingUser />
          </div>
        </div>
        <div className={"w-1/5 hidden md:block"} />
      </div>
    </div>
  ) : (
    <div>404</div>
  );
}
