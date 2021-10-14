import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "../../graphql-custom/user/mutation";

import { getFileUrl } from "../../Utility/Util";
import Dummy from "dummyjs";

export default function Informations({ currentUser }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState({});
  const [data, setData] = useState();
  const [firstName, setFirstName] = useState("");
  const [about, setAbout] = useState("");

  const [currentIndex, setCurrentIndex] = useState();

  const settings = [
    {
      id: 0,
      text: "Нэр",
      name: "firstname",
      placeholder: currentUser.firstname,
      type: "text",
      value: currentUser.firstname,
      isReadOnly: false,
    },
    {
      id: 1,
      text: "Хэрэглэгчийн ID",
      name: "user_id",
      placeholder: currentUser.username.id_name,
      type: "text",
      value: currentUser.username.id_name,
      isReadOnly: true,
    },
    {
      id: 2,
      text: "Тухай",
      name: "about",
      placeholder: currentUser.about,
      type: "text",
      value: currentUser.about,
      isReadOnly: false,
    },

    // {
    //   id: 4,
    // text: "Цахим хаяг",
    //   name: "email",
    //   placeholder: "Цахим хаяг",
    //   type: "text",
    //   value: currentUser.id,isReadOnly: false,
    // },
    // {
    //   id: 5,
    // text: "Утасны дугаар",
    //   name: "phone_number",
    //   placeholder: "Утасны дугаар",
    //   type: "text",
    //   value: currentUser.id,  isReadOnly: false,
    // },
  ];

  const handleSubmit = async (e) => {
    await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: currentUser.id,
          ...text,
        },
      })
    );
    setText("");
    setShowInput(false);
  };

  const handleClick = (id) => {
    setCurrentIndex(id);
    setShowInput(true);
  };

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{ marginTop: "34px" }}
      className="lg:w-cl md:w-iw sm:w-cb w-80 rounded-lg"
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
            <div key={index} className=" flex">
              <div
                style={{ paddingBlock: "14px" }}
                className="text-14px sm:text-16px flex items-center w-full border-b"
              >
                <p className="my-a4 w-32 font-medium">{setting.text}</p>
                {showInput && index === currentIndex ? (
                  <div className="flex">
                    <input
                      name={setting.name}
                      className="w-full"
                      readOnly={setting.isReadOnly}
                      autoFocus
                      id={setting.id}
                      onChange={handleChange}
                      placeholder={setting.placeholder}
                      type={setting.type}
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
