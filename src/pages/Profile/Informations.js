import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

export default function Informations({ currentUser }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState();

  const settings = [
    {
      id: 0,
      name: "Нэр",
      placeholder: currentUser.firstname,
      type: "text",
      value: currentUser.firstname,
    },
    {
      id: 1,
      name: "Хэрэглэгчийн ID",
      placeholder: "Хэрэглэгчийн ID",
      type: "text",
      value: currentUser.id,
    },
    {
      id: 2,
      name: "Тухай",
      placeholder: "Тухай",
      type: "text",
      value: currentUser.about,
    },
    {
      id: 3,
      name: "Хөрөг зураг",

      placeholder: "Хөрөг зураг",
      type: "text",
      value: currentUser.id,
    },
    {
      id: 4,
      name: "Имайл хаяг",
      placeholder: "Имайл хаяг",
      type: "text",
      value: currentUser.id,
    },
    {
      id: 5,
      name: "Утасны дугаар",
      placeholder: "Утасны дугаар",
      type: "text",
      value: currentUser.id,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await API.graphql(
      graphqlOperation(updateCategory, { input: data })
    );
    console.log("submit value:", text);
    setShowInput(false);
  };

  const handleClick = (id) => {
    setCurrentIndex(id);
    setShowInput(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
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
        {settings.map((setting, index) => {
          return (
            <div className=" flex">
              <div
                key={index}
                style={{ paddingBlock: "14px" }}
                className="flex items-center w-full border-b"
              >
                <p className="text-16px my-a4 w-32 mr-1 font-medium">
                  {setting.name}
                </p>
                {showInput && index === currentIndex ? (
                  <div className="flex">
                    <input
                      className="w-full"
                      autoFocus
                      id={setting.id}
                      onChange={handleChange}
                      placeholder={setting.placeholder}
                      type="text"
                    />
                    <button
                      onClick={handleSubmit}
                      className="icon-fi-rs-thick-check text-caak-algalfuel ml-4"
                    />
                  </div>
                ) : (
                  <p>{setting.value}</p>
                )}
              </div>
              <div className=" flex items-center">
                <span
                  onClick={() => handleClick(index)}
                  className="icon-fi-rs-pencil text-caak-darkBlue ml-4 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
