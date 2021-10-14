import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import { useHistory, useParams } from "react-router-dom";
import useInfiniteScroll from "../Home/useFetch";
import { getGroupView } from "../../graphql-custom/group/queries";
import GroupHeader from "./GroupHeader";
import { useListPager } from "../../Utility/ApiHelper";
import GroupSubHeader from "./GroupSubHeader";
import GroupBody from "./GroupBody";
import { checkUser } from "../../Utility/Util";
import { useUser } from "../../context/userContext";

export default function Group() {
  const history = useHistory();
  const { user } = useUser();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState({});
  const [groupPosts, setGroupPosts] = useState([]);
  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      filter: { group_id: { eq: groupId } },
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 6,
    },
  });
  const [setPostScroll] = useInfiniteScroll(groupPosts, setGroupPosts);
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);

  const getGroupDataById = async () => {
    try {
      if (checkUser(user)) {
        let resp = await API.graphql(
          graphqlOperation(getGroupView, { id: groupId })
        );
        setGroupData(resp.data.getGroup);
      } else {
        const resp = await API.graphql({
          query: getGroupView,
          authMode: "AWS_IAM",
          variables: { id: groupId },
        });
        setGroupData(resp.data.getGroup);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchGroupPosts = async (data, setData) => {
    try {
      if (!loading) {
        setLoading(true);
        let resp = await nextPosts();
        if (resp) {
          setData([...data, ...resp]);
        }

        setLoading(false);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  // const subscriptions = () => {
  //   API.graphql({
  //     query: onPostStatusUpdate,
  //   }).subscribe({
  //     next: (data) => {
  //       console.log("data: ", data);
  //     },
  //   });
  // };

  useEffect(() => {
    getGroupDataById();

    fetchGroupPosts(groupPosts, setGroupPosts);
    setPostScroll(fetchGroupPosts);

    return () => {
      setPostScroll(null)
    }

    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <div className="sm:hidden px-c6 py-b3 flex items-center justify-between bg-white border-t border-b">
        <span
          onClick={() => history.goBack()}
          className="icon-fi-rs-back text-20px cursour-pointer"
        />
        <p className="text- font-medium">Грүпп</p>
        <span className="icon-fi-rs-dots text-4px" />
      </div>
      <GroupHeader group={groupData} />

      {/* post */}
      <div className="flex flex-col items-center">
        <GroupSubHeader />
        <GroupBody groupPosts={groupPosts} loading={loading} />
      </div>
    </div>
  );
}
