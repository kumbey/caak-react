import React from "react";
import Notification from "./Notification";

const NotificationDropDown = ({ onToggle, isOpen }) => {
  return (
    <div
      onClick={onToggle}
      className={`dropdown flex flex-col bg-white shadow-dropdown w-96 cursor-auto top-10 -right-4 ${
        !isOpen && "hidden"
      }`}
    >
      <div
        className={
          "notification_header flex flex-row items-center justify-between w-full px-5 pb-2 pt-3 border-b"
        }
      >
        <span className={"text-caak-generalblack font-medium"}>
          Сонордуулга
        </span>
        <span className={"text-caak-bleudefrance text-14px font-medium"}>
          Бүгдийг харсан
        </span>
      </div>
      <div className={"notification_body flex flex-col bg-caak-washme p-0"}>
        <span
          className={"font-medium text-caak-darkBlue text-14px px-3.5 py-1.5"}
        >
          Шинэ
        </span>
        <Notification newPost type={"plus"} />
        <Notification newPost type={"success"} />
        <Notification newPost type={"success"} />
        <span
          className={"font-medium text-caak-darkBlue text-14px px-3.5 py-1.5"}
        >
          Сүүлд ирсэн
        </span>
        <Notification type={"caak"} />
        <Notification type={"comment"} />
        <Notification type={"request"} />
      </div>
      <div className={"notification_footer border-t"}>
        <span className={"text-caak-generalblack text-14px text-center py-1"}>
          Бүгдийг харах
        </span>
      </div>
    </div>
  );
};

export default NotificationDropDown;
