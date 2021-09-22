import DropZone from "./DropZone";

const DropZoneWithCaption = ({ onChangeText, textCount, onSelected }) => {
  return (
    <div>
      <div className={"relative flex flex-row mt-2  items-center px-7"}>
        <textarea
          rows={1}
          onChange={(e) => onChangeText(e.target.value.length)}
          maxLength={"60"}
          placeholder={"Нийтлэлийн тайлбар оруулах..."}
          className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded resize"
        />
        <span className={"absolute right-8 text-14px text-caak-generalblack"}>
          {textCount}/60
        </span>
      </div>
      <div
        className={
          "border-caak-titaniumwhite  border border-dashed rounded-square p-1 mx-7"
        }
      >
        <DropZone onSelected={onSelected} />
      </div>
    </div>
  );
};

export default DropZoneWithCaption;
