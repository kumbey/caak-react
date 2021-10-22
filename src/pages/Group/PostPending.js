import { useEffect, useState } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import { useParams } from "react-router-dom";
import PendingPostItem from "../../components/PendingPost/PendingPostItem";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import { checkUser, getReturnData } from "../../Utility/Util";
import { onPostByGroup } from "../../graphql-custom/post/subscription";
import { useUser } from "../../context/userContext";

export default function PostPending() {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const subscriptions = {};
  const [groupPendingPosts, setGroupPendingPosts] = useState([]);
  const [confirmedPost, setConfirmedPost] = useState(null);
  const [pendingPost, setPendingPost] = useState(null);
  const [archivedPost, setArchivedPost] = useState(null);

  const { user } = useUser();
  const { groupId } = useParams();
  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      filter: { group_id: { eq: groupId } },
      sortDirection: "DESC",
      status: "PENDING",
      limit: 6,
    },
  });

  const subscrib = () => {
    let authMode = "AWS_IAM";
    if (checkUser(user)) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }
    subscriptions.onPostByGroupPending = API.graphql({
      query: onPostByGroup,
      variables: { group_id: groupId, status: "PENDING" },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setPendingPost(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
    subscriptions.onPostByGroupConfirmed = API.graphql({
      query: onPostByGroup,
      variables: { group_id: groupId, status: "CONFIRMED" },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setConfirmedPost(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });

    subscriptions.onPostByGroupArchived = API.graphql({
      query: onPostByGroup,
      variables: { group_id: groupId, status: "ARCHIVED" },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setArchivedPost(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (groupPendingPosts) {
      const filtered = groupPendingPosts.filter(
        (item) => item.id !== archivedPost.id
      );
      setGroupPendingPosts([...filtered]);
    }
    // eslint-disable-next-line
  }, [archivedPost]);

  useEffect(() => {
    if (groupPendingPosts) {
      const filtered = groupPendingPosts.filter(
        (item) => item.id !== confirmedPost.id
      );
      setGroupPendingPosts([...filtered]);
    }
    // eslint-disable-next-line
  }, [confirmedPost]);

  useEffect(() => {
    if (pendingPost) {
      if (!groupPendingPosts.find((item) => item.id === pendingPost.id))
        setGroupPendingPosts((prev) => [pendingPost, ...prev]);
    }
    // eslint-disable-next-line
  }, [pendingPost]);

  const [setPostScroll] = useInfiniteScroll(
    groupPendingPosts,
    setGroupPendingPosts
  );
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);

  const updatePostStatus = async (id, status) => {
    await API.graphql(graphqlOperation(updatePost, { input: { id, status } }));
  };

  const onSelectHandler = (e) => {
    isCheck.map((item) => {
      return updatePostStatus(item, e.target.value);
    });
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
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    if (isCheckAll) {
      setIsCheck([]);
    } else {
      setIsCheck();
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (!checked) {
      setIsCheck(isCheck.filter((e) => e !== id));
    } else {
      setIsCheck([...isCheck, id]);
    }
  };
  useEffect(() => {
    if (groupId) subscrib();
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    fetchGroupPosts(groupPendingPosts, setGroupPendingPosts);
    setPostScroll(fetchGroupPosts);

    // eslint-disable-next-line
  }, []);

  return (
    <div className={"w-full"}>
      <div className="py-b4 flex items-center w-full pr-2 bg-white border-t">
        {isCheck.length ? (
          <div className="ml-c34 flex items-center border rounded-lg">
            <Checkbox
              id="selectAll"
              handleClick={handleSelectAll}
              isChecked={isCheck.length}
              className="w-b4 h-b4 ml-px-11 border-caak-darkgray border-2 rounded cursor-pointer"
            />
            <p className="ml-px-11 text-15px text-caak-generalblack font-medium">
              {isCheck.length} пост сонгогдлоо
            </p>
            <select
              onChange={(e) => onSelectHandler(e)}
              className="text-15px text-caak-generalblack font-medium border-0"
            >
              <option hidden className="focus:bg-caak-darkBlue">
                Үйлдэл
              </option>
              <option value={"CONFIRMED"}>Зөвшөөрөх</option>
              <option value={"ARCHIVED"}>Татгалзах</option>
            </select>
          </div>
        ) : (
          <div className="text-16px text-caak-generalblack flex items-center w-full">
            <Checkbox
              id="selectAll"
              handleClick={handleSelectAll}
              isChecked={isCheckAll}
              className="w-b4 h-b4 ml-c34 border-caak-darkgray border-2 rounded cursor-pointer"
            />
            <p className="ml-c2 flex justify-start w-1/3">Фостын нэр</p>
            <div className="ph:justify-evenly flex justify-between w-2/3">
              <p>Нийтлэгч</p>
              <p>Хугацаа</p>
              <p>Үйлдэл</p>
            </div>
          </div>
        )}
      </div>
      {groupPendingPosts.map((data, index) => {
        return (
          <div
            key={index}
            className="hover:shadow hover:bg-caak-liquidnitrogen flex items-center bg-white border-t"
          >
            <div className="flex items-center w-full">
              <div>
                <Checkbox
                  key={data.id}
                  id={data.id}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(data.id)}
                  className="ml-c34 w-b4 h-b4 border-caak-darkgray border-2 rounded cursor-pointer"
                />
              </div>
              <PendingPostItem post={data} className="ph:mb-4 sm:mb-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
