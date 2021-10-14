import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Button from "../../components/button";
import Switch from "./Switch";
import Informations from "./Informations";
import BottomTabs from "../Home/BottomTabs";
import { getUser } from "../../graphql-custom/user/queries";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useParams } from "react-router";
import Dummy from "dummyjs";

const data = [
  {
    id: 1,
    icon: <span className="icon-fi-rs-profile text-24px" />,
    title: "Хувийн мэдээлэл",
  },
  {
    id: 2,
    icon: <span className="icon-fi-rs-social text-22px" />,
    title: "Сошиал холболтууд",
  },
  {
    id: 3,
    icon: <span className="icon-fi-rs-settings text-22px" />,
    title: "Сайтын тохиргоо",
  },
  {
    id: 4,
    icon: (
      <span
        style={{ paddingRight: "3px" }}
        className="icon-fi-rs-lock text-24px"
      />
    ),
    title: "Нууцлал",
  },
];

export default function Settings() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    try {
      const getUserById = async (id) => {
        const resp = await API.graphql(graphqlOperation(getUser, { id }));
        setUser(resp.data.getUser);
      };
      getUserById(userId);
    } catch (ex) {
      console.log(ex);
    }
  }, [userId]);

  const [activeIndex, setActiveIndex] = useState(1);

  return user ? (
    <div style={{ marginTop: "36px" }} className="grid justify-center">
      <div className=" flex items-center">
        <span
          onClick={() => history.goBack()}
          className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer"
          style={{ height: "48px", width: "48px" }}
        />
        <img
          className="md:w-c28 w-9 h-9 md:h-c28 rounded-full"
          alt=""
          style={{
            marginLeft: "20px",
            marginRight: "8px",
          }}
          data-dummy="200x200"
          src={Dummy.img("200x200")}
        />
        <div className="sm:flex-row flex flex-col items-center">
          <p
            style={{ marginRight: "8px" }}
            className=" md:text-24px text-18px font-medium"
          >
            {user.firstname}
          </p>
          <p className="text-15px md:text-18px">@{user.nickname}</p>
        </div>
      </div>
      <div className="md:flex-row sm:justify-between md:justify-between lg:justify-between 2xl:justify-start 3xl:justify-center px-auto flex flex-col mx-auto">
        <div
          style={{ marginTop: "34px", height: "217px" }}
          className=" pl-c3 pr-c60 bg-white rounded-lg"
        >
          {data.map(({ icon, title, id }) => (
            <div
              key={id}
              onClick={() => setActiveIndex(id)}
              style={{ marginTop: "24px" }}
              className={`flex items-center cursor-pointer
                                    ${
                                      id === activeIndex
                                        ? "text-caak-primary"
                                        : "text-caak-generalblack"
                                    }`}
            >
              {icon}
              <p className="text-17px ml-b1 font-medium">{title}</p>
            </div>
          ))}
        </div>
        <div
          style={{ marginTop: "34px" }}
          className=" md:ml-c11 bg-white rounded-lg"
        >
          <div
            style={{ paddingBottom: "65px" }}
            className={`${activeIndex === 1 ? "block" : "hidden"}`}
          >
            <Informations currentUser={user} />
          </div>
          <div
            style={{ paddingBottom: "65px" }}
            className={`lg:w-cl md:w-iw sm:w-cb ph:w-72 ${
              activeIndex === 2 ? "block" : "hidden"
            }`}
          >
            <p
              className="font-medium"
              style={{
                marginLeft: "30px",
                marginTop: "30px",
                fontSize: "24px",
              }}
            >
              Сошиал холболтууд
            </p>
            <div style={{ marginTop: "21px" }} className="mx-c3 pb-c60">
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Instagram
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Facebook
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Tiktok
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <div className="flex items-center">
                  <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
                  <p
                    style={{ marginLeft: "22px" }}
                    className="text-16px font-medium"
                  >
                    Twitter
                  </p>
                </div>
                <Button
                  style={{ width: "75px" }}
                  className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
                >
                  Холбох
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{ paddingBottom: "52px" }}
            className={`${activeIndex === 3 ? "block" : "hidden"}`}
          >
            <p
              className="font-medium"
              style={{
                marginLeft: "30px",
                marginTop: "30px",
                fontSize: "24px",
              }}
            >
              Сайтын тохиргоо
            </p>
            <div
              style={{ marginTop: "21px" }}
              className="lg:w-cl md:w-iw sm:w-cb ph:w-72 border-b"
            >
              <div
                style={{ paddingBlock: "14px" }}
                className="px-c3 flex items-center justify-between w-full border-b"
              >
                <p className="text-16px font-medium">
                  Видео бичлэгийг автоматаар тоглуулах
                </p>
                <Switch />
              </div>
            </div>
          </div>
          <div className={`${activeIndex === 4 ? "block" : "hidden"}`}>
            <p
              className="font-medium"
              style={{
                marginLeft: "30px",
                marginTop: "30px",
                fontSize: "24px",
              }}
            >
              Нууцлал
            </p>
            <div
              style={{ marginTop: "21px" }}
              className="lg:w-cl md:w-iw sm:w-cb ph:w-72"
            >
              <div
                style={{ paddingBlock: "14px" }}
                className="px-c3 flex items-center justify-between w-full border-b"
              >
                <p className="text-16px font-medium">
                  Элссэн группуудыг ил харуулах
                </p>
                <Switch />
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="px-c3 flex items-center justify-between w-full border-b"
              >
                <p className="text-16px font-medium">
                  Миний үүсгэсэн группуудыг ил харуулах
                </p>
                <Switch />
              </div>
              <div
                style={{ paddingBlock: "14px" }}
                className="flex items-center justify-between w-full border-b"
              >
                <p className="text-16px px-c3 font-medium">
                  Нууц үгээ шинэчлэх
                </p>
                <span className="px-c3 icon-fi-rs-pencil text-caak-darkBlue cursor-pointer" />
              </div>
              <div
                style={{ marginTop: "60px", paddingBottom: "22px" }}
                className="text-caak-red px-c3 flex items-center justify-end cursor-pointer"
              >
                <span className="icon-fi-rs-delete text-15px" />
                <p className="text-15px ml-a1 font-medium">Бүртгэлээ устгах</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className={` block md:hidden sticky bottom-0 z-10`}>
        <BottomTabs />
      </footer>
    </div>
  ) : null;
}
