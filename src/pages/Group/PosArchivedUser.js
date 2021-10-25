import React, {useEffect, useRef, useState} from "react";
import { getPostByUser } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import UserPostItem from "../../components/PendingPost/UserPostItem";
import Loader from "../../components/loader";
export default function PostArchivedUser({ userId }) {
  const [userArchivedPosts, setUserArchivedPosts] = useState([]);
  const itemRef = useRef()
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
    setUserArchivedPosts,
      itemRef
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
        <div className="text-16px flex items-center w-full">
          <div className="w-1/2 text-center">
            <p>Постын нэр</p>
          </div>
          <div className="w-1/4">
            <p>Нийтлэгч</p>
          </div>
          <div className="w-1/4">
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
      <div ref={itemRef} className={"flex justify-center items-center"}>
        <Loader
            containerClassName={"self-center"}
            className={`bg-caak-primary ${
                loading ? "opacity-100" : "opacity-0"
            }`}
        />
      </div>
    </div>
  );
}
