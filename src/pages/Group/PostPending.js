import { useEffect, useState } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import { useListPager } from "../../Utility/ApiHelper";
import useInfiniteScroll from "../Home/useFetch";
import { useParams } from "react-router-dom";
import PendingPostItem from "../../components/PendingPost/PendingPostItem";

export default function PostPending({ settt }) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [groupPendingPosts, setGroupPendingPosts] = useState([]);
  const { groupId } = useParams();
  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      filter: { group_id: { eq: groupId } },
      sortDirection: "DESC",
      status: "PENDING",
      limit: 2,
    },
  });
  const [setPostScroll] = useInfiniteScroll(
    groupPendingPosts,
    setGroupPendingPosts
  );
  //FORCE RENDER STATE
  const [loading, setLoading] = useState(false);

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
  const handleSelectAll = (e) => {
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
              className="w-b4 h-b4 ml-b3 border-caak-darkgray border-2 rounded cursor-pointer"
            />
            <p className="ml-b3 text-15px text-caak-generalblack font-medium">
              {isCheck.length} фост сонгогдлоо
            </p>
            <select className="text-15px text-caak-generalblack font-medium border-0">
              <option className="focus:bg-caak-darkBlue">Үйлдэл</option>
              <option>Үйлдэл</option>
              <option>Үйлдэл</option>
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
              <p
                className={`${
                  settt ? "mr-c24" : "2xl:mr-c18 xl:mr-c14"
                } ph:hidden`}
              >
                Үйлдэл
              </p>
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
