import { group_data } from "./groupData";
import { useState } from "react";
import Settings from "./Settings";

export default function Infromation() {
  const [selected, setSelected] = useState();

  const handleColor = (row) => {
    setSelected(row.title);
  };

  return (
    <div style={{ marginTop: "36px", marginInline: "500px" }} className="grid">
      <div className="flex items-center justify-start">
        <span
          style={{ paddingBlock: "15px", paddingInline: "19px" }}
          className="icon-fi-rs-back bg-caak-titaniumwhite rounded-full"
        />
        <img
          alt=""
          style={{
            height: "52px",
            width: "52px",
            marginInlineStart: "20px",
            marginInlineEnd: "8px",
          }}
          className="bg-caak-red rounded-lg"
        />
        <p className="text-24px text-caak-generalblack font-medium">
          Монгол өв уламжлал
        </p>
      </div>
      <div style={{ marginTop: "34px" }} className="flex">
        <div style={{ height: "170px" }} className="pr-c13 bg-white rounded-lg">
          {group_data.map((list) => (
            <div
              className={`flex items-center cursor-pointer py-px-6 rounded-lg ${
                list.title === selected
                  ? "text-caak-primary"
                  : "text-caak-generalblack"
              }`}
              key={list.title}
              onClick={() => handleColor(list)}
            >
              {list.icon}
              <p className="text-17px font-medium">{list.title}</p>
            </div>
          ))}
        </div>
        <div
          style={{ width: "608px", marginInlineStart: "19px" }}
          className="bg-white rounded-lg"
        >
          <Settings />
        </div>
      </div>
    </div>
  );
}
