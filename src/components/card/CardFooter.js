import useCountComments from "../../Utility/useCountComments";

const CardFooter = ({ title, reactions, comments }) => {
  const totalComments = useCountComments(comments);

  return (
    <div className="w-96 max-w-8xl flex flex-col justify-between h-full px-4 py-2 pb-4">
      <p className="text-generalblack text-17px font-bold leading-5 break-words">
        {title}
      </p>
      <div
        className={
          "flex flex row justify-between text-blue-primary text-14px mt-3"
        }
      >
        <div className={"flex flex-row"}>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fr-rs-caak text-16px mr-1.5"} />
            <span>{reactions}</span>
          </div>
          <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
            <i className={"icon-fi-rs-comment text-16px mr-1.5"} />
            <span>{totalComments}</span>
          </div>
        </div>
        <div className={"flex flex-row items-center cursor-pointer"}>
          <i className={"icon-fi-rs-share text-15px mr-1.5"} />

          <span>Хуваалцах</span>
        </div>
      </div>
    </div>
  );
};

export default CardFooter;
