import { useState } from "react";
import GroupInformationDrop from "../../components/PendingPost/GroupInformationDrop";
const settings = [
  {
    name: "Нэр",
    contents: <input placeholder="name" type="text" />,
  },
  {
    name: "Хэрэглэгчийн ID",
    contents: <input placeholder="id" type="text" />,
  },
  {
    name: "Тухай",
    contents: <input placeholder="about" type="text" />,
  },
  {
    name: "Хөрөг зураг",

    contents: <input placeholder="name" type="" />,
  },
  {
    name: "Имайл хаяг",
    contents: <input placeholder="purwee@gmail.com" type="email" />,
  },
  {
    name: "Утасны дугаар",
    contents: <input placeholder="95290429" type="number" />,
  },
];

export default function Informations() {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      style={{ marginTop: "34px" }}
      className="lg:w-cl md:w-iw sm:w-cb ph:w-72 rounded-lg"
    >
      <p
        className="font-medium"
        style={{ marginLeft: "30px", marginTop: "30px", fontSize: "24px" }}
      >
        Хувийн мэдээлэл
      </p>
      <div style={{ marginTop: "21px" }} className="mx-c3">
        {settings.map(({ name, contents }) => (
          <div key={name}>
            <div
              style={{ paddingBlock: "14px" }}
              className="flex items-center justify-between w-full border-b"
            >
              <p className="text-16px font-medium">{name}</p>
              <span
                onClick={toggleMenu}
                className="icon-fi-rs-pencil text-caak-darkBlue cursor-pointer"
              />
            </div>
            <GroupInformationDrop
              className="relative w-full"
              shadow
              content={contents}
              open={isMenuOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
