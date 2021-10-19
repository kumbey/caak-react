import { useEffect, useState } from "react";
import { getPostByUser } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import UserPostItem from "../../components/PendingPost/UserPostItem";
export default function PostArchivedUser({ userId }) {
  const [userArchivedPosts, setUserArchivedPosts] = useState([]);
  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: userId,
      sortDirection: "DESC",
      filter: { status: { eq: "ARCHIVED" } },
      limit: 6,
    },
  });

  const [setPostScroll] = useInfiniteScroll(
    userArchivedPosts,
    setUserArchivedPosts
  );
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);

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
    fetchUserPosts(userArchivedPosts, setUserArchivedPosts);
    setPostScroll(fetchUserPosts);

    // eslint-disable-next-line
  }, []);

  return (
    <div className={"w-full"}>
      <div className="py-b4 flex items-center w-full pr-2 bg-white border-t">
        <div className="text-16px text-caak-generalblack flex items-center w-full">
          <p className="ml-c2 flex justify-start w-full">Постын нэр</p>
          <div className=" pr-7 flex justify-between w-full">
            <p>Нийтлэгч</p>
            <p>Хугацаа</p>
          </div>
        </div>
      </div>
      {userArchivedPosts.map((data, index) => {
        return (
          <div
            key={index}
            className="hover:shadow hover:bg-caak-liquidnitrogen flex items-center bg-white border-t"
          >
            <div className="flex items-center w-full">
              <UserPostItem post={data} className="ph:mb-4 sm:mb-4 " />
            </div>
          </div>
        );
      })}
    </div>
  );
}
