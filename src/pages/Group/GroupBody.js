import Button from "../../components/button";
import Card from "../../components/card";
import Loader from "../../components/loader";

const GroupBody = ({ groupPosts, loading }) => {
  return (
    <div>
      {/* navigator */}
      <div className="mt-c2 flex items-center justify-between">
        <div className="flex">
          <Button className="text-15px w-c31 h-c32 text-caak-primary mr-a1 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold bg-white rounded-lg shadow">
            Трэнд
          </Button>
          <Button className="text-15px w-c7 h-c32 text-caak-generalblack mr-a1 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold bg-transparent rounded-lg">
            Шинэ
          </Button>
          <Button className="text-15px w-c7 h-c32 text-caak-generalblack hover:bg-caak-titaniumwhite flex items-center justify-center font-bold bg-transparent rounded-lg">
            Шилдэг
          </Button>
        </div>
      </div>

      {/* contents */}
      <div>
        <div
          style={{ marginTop: "15px" }}
          className="md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 grid justify-center grid-cols-1 gap-5"
        >
          {groupPosts.map((data, index) => {
            return (
              <Card
                key={index}
                video={data.items.items[0].file.type.startsWith("video")}
                post={data}
                className="ph:mb-4 sm:mb-4"
              />
            );
          })}
        </div>
        <Loader
          className={`bg-caak-primary ${loading ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
};

export default GroupBody;
