import CardVideoContainer from "./CardVideoContainer";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardImageContainer from "./CardImageContainer"; // es6

const Card = ({ video, verifiedUser, ...data }) => {
  return (
    <div className="rounded-xl shadow-card mx-auto transition bg-white">
      <CardHeader verifiedUser />
      {video ? (
        <CardVideoContainer data={["1", "2"]} />
      ) : (
        <CardImageContainer data={["1", "2"]} />
      )}
      <CardFooter data={data.data}/>
    </div>
  );
};

export default Card;
