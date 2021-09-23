import Divider from "../../../components/divider";

const Header = ({ title, iconLeft, iconRight, hideDivider }) => {
  return (
    <div className={"relative header"}>
      {iconLeft}
      <div
        className={
          "text-22px text-center text-caak-generalblack font-bold py-4 leading-7"
        }
      >
        {title}
      </div>
      {iconRight}
      {hideDivider && <Divider />}
    </div>
  );
};

export default Header;
