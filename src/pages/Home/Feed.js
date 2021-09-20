import { useCallback, useState } from "react";
import Card from "../../components/card";
import { Masonry } from "masonic";

const Feed = () => {
  let i = 0;
  // const items = Array.from(Array(20), () => ({ id: i++ }));
  const [items] = useState(() =>
    Array.from(Array(10), () => ({
      id: i++,
      src: `https://picsum.photos/id/1/${Math.random(0, 1) > 0.5 ? 800 : 600}/${
        Math.random(0, 1) > 0.5 ? 600 : 800
      }/`,
    }))
  );

  const CardWithClick = useCallback(
    (props) => <Card {...props} video verifiedUser />,
    []
  );
  return (
    <main
      className={
        "max-w-7xl sm:px-6 lg:px-10 px-2 py-1 mx-auto px-2 flex justify-center items-center"
      }
    >
      <div className={"py-10 flex justify-center items-center w-full "}>
        {/*<Card verifiedUser video/>*/}
        <Masonry
          className={"flex justify-center items-center"}
          items={items}
          columnGutter={14}
          columnWidth={325}
          overscanBy={3}
          render={Card}
        />
      </div>
    </main>
  );
};

export default Feed;
