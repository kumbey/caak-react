export default function PendingPostMenu({ edit }) {
  return (
    <div className="bg-white">
      <div
        style={{ paddingInlineEnd: "21px" }}
        onClick={edit}
        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-edit ml-b4 mr-b2 text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          Постыг засах
        </p>
      </div>
      <div
        style={{ paddingInlineEnd: "21px" }}
        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-delete ml-b4 mr-b2 text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          Постыг устгах
        </p>
      </div>
    </div>
  );
}
