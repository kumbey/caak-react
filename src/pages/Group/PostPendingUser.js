import { useEffect, useState } from "react";
import { getPostByUser } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import PendingPostItem from "../../components/PendingPost/PendingPostItem";
import { useUser } from "../../context/userContext";

export default function PostPendingUser() {
  const [userPendingPosts, setUserPendingPosts] = useState([]);
  const { user } = useUser();
  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: user.sysUser.id,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 6,
    },
  });

  const [setPostScroll] = useInfiniteScroll(
    userPendingPosts,
    setUserPendingPosts
  );
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);

  // const updatePostStatus = async (id, status) => {
  //   await API.graphql(graphqlOperation(updatePost, { input: { id, status } }));
  // };

  const fetchUserPosts = async (data, setData) => {
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

  useEffect(() => {
    fetchUserPosts(userPendingPosts, setUserPendingPosts);
    setPostScroll(fetchUserPosts());

    // eslint-disable-next-line
  }, []);

  return (
    <div className={"w-full"}>
      <div className="py-b4 flex items-center w-full pr-2 bg-white border-t">
        <div className="text-16px text-caak-generalblack flex items-center w-full">
          <p className="ml-c2 flex justify-start w-1/3">Фостын нэр</p>
          <div className="ph:justify-evenly flex justify-between w-2/3">
            <p>Нийтлэгч</p>
            <p>Хугацаа</p>
            <p className={`2xl:mr-c18 xl:mr-c14 ph:hidden`}>Үйлдэл</p>
          </div>
        </div>
      </div>
      {userPendingPosts.map((data, index) => {
        return (
          <div
            key={index}
            className="hover:shadow hover:bg-caak-liquidnitrogen flex items-center bg-white border-t"
          >
            <div className="flex items-center w-full">
              <PendingPostItem post={data} className="ph:mb-4 sm:mb-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
