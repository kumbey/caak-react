import { useEffect, useState } from "react";
import PostPending from "./PostPending";
import { useHistory, useParams } from "react-router";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getGroupView } from "../../graphql-custom/group/queries";
import GroupHeader from "./GroupHeader";

export default function PendingPostAdmin() {
  const history = useHistory();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState([]);

  const getGroupDataById = async () => {
    try {
      let resp = await API.graphql(
        graphqlOperation(getGroupView, { id: groupId })
      );
      setGroupData(resp.data.getGroup);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getGroupDataById();
    // eslint-disable-next-line
  }, []);

  const totalMembers = () => {
    // return (
    //   parseInt(groupData.totals.admin) +
    //   parseInt(groupData.totals.moderator) +
    //   parseInt(groupData.totals.moderator)
    // );
  };

  return (
    groupData && (
      <div>
        <div className="flex justify-between items-center bg-white border-t border-b sm:hidden px-c6 py-b3">
          <span
            onClick={() => history.goBack()}
            className="icon-fi-rs-back text-20px cursour-pointer"
          />
          <p className="font-medium text-">Грүпп</p>
          <span className="icon-fi-rs-dots text-4px" />
        </div>
        <GroupHeader group={groupData} />

        {/* body */}
        <div className="flex justify-center items-start w-full">
          {/*  <Admin />*/}
          {/* post */}
          <div className="bg-white rounded-lg mt-c11">
            {/* navigator */}
            <div className="flex justify-between items-center p-c11">
              <div className="flex items-center">
                <p className="font-medium text-18px text-caak-generalblack">
                  Хүлээгдэж буй фостууд
                </p>
                <p
                  style={{ marginLeft: "6px" }}
                  className="bg-opacity-20 rounded-full text-13px px-b3 bg-caak-bleudefrance text-caak-bleudefrance"
                >
                  {groupData.totals?.pending}
                </p>
              </div>
              <select className="font-medium rounded-lg border-0 shadow cursor-pointer text-15px text-caak-generalblack">
                <option>Шинэ фостууд</option>
                <option>Тйреырбйыр</option>
                <option>йыөүйзшыбаөүк</option>
              </select>
            </div>

            {/* pending posts */}
            <div>
              <PostPending />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
