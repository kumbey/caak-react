import { useEffect, useRef, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useHistory, useParams } from "react-router-dom";
import useInfiniteScroll from "../Home/useFetch";
import { getGroupView } from "../../graphql-custom/group/queries";
import GroupHeader from "./GroupHeader";
import GroupSubHeader from "./GroupSubHeader";
import { checkUser, getReturnData } from "../../Utility/Util";
import { useUser } from "../../context/userContext";
import { onPostByGroup } from "../../graphql-custom/post/subscription";
import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";
import GroupPosts from "./GroupPosts";

export default function Group() {
  const history = useHistory();
  const { user } = useUser();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState({});
  const [groupPosts, setGroupPosts] = useState([]);
  const [subscriptionTotal, setSubscriptionTotal] = useState();
  const [reRender, setReRender] = useState(0);
  const groupFeedRef = useRef();
  const [loading, setLoading] = useState(false);
  const [subscriptionPosts, setSubscriptionPosts] = useState(null);
  const subscriptions = {};

  const [setPostScroll] = useInfiniteScroll(
    groupPosts,
    setGroupPosts,
    groupFeedRef
  );

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

        setLoading(false);  
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const subscrib = () => {
    let authMode = "AWS_IAM";
    if (checkUser(user)) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }
    subscriptions.onPostByGroupConfirmed = API.graphql({
      query: onPostByGroup,
      variables: {
        group_id: groupId,
        status: "CONFIRMED",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPosts(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });

    subscriptions.onPostByGroupPending = API.graphql({
      query: onPostByGroup,
      variables: {
        group_id: groupId,
        status: "PENDING",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPosts(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });

    subscriptions.onChangedTotalsBy = API.graphql({
      query: onChangedTotalsBy,
      variables: {
        type: "GroupTotal",
        id: groupId,
      },
      authMode: "AWS_IAM",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionTotal(JSON.parse(onData.totals));
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (subscriptionPosts) {
      if (subscriptionPosts.status === "CONFIRMED") {
        if (!groupPosts.find((item) => item.id === subscriptionPosts.id))
          setGroupPosts((prev) => [subscriptionPosts, ...prev]);
      } else if (subscriptionPosts.status === "PENDING") {
        const filtered = groupPosts.filter(
          (item) => item.id !== subscriptionPosts.id
        );
        setGroupPosts([...filtered]);
      }
    }
    // eslint-disable-next-line
  }, [subscriptionPosts]);

  useEffect(() => {
    if (subscriptionTotal) {
      groupData.totals.pending = parseInt(subscriptionTotal.pending);
      setReRender(reRender + 1);
    }

    // eslint-disable-next-line
  }, [subscriptionTotal]);

  useEffect(() => {
    if (groupId) {
      getGroupDataById();
      fetchGroupPosts(groupPosts, setGroupPosts);
      setPostScroll(fetchGroupPosts);
      subscrib();
    }
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
      setPostScroll(null);
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <div className="sm:hidden px-c6 py-px-11 flex items-center justify-between bg-white border-t border-b">
        <span
          onClick={() => history.goBack()}
          className="icon-fi-rs-back text-20px cursour-pointer"
        />
        <p className="text- font-medium">??????????</p>
        <span className="icon-fi-rs-dots text-4px" />
      </div>
      <GroupHeader group={groupData} />

      {/* post */}
      <div className="flex flex-col items-center">
        <GroupSubHeader groupId={groupId} param={user} />
        <GroupPosts groupId={groupId} type="CONFIRMED" card/>
      </div>
    </div>
  );
}
