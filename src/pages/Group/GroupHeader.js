import Button from "../../components/button";
import {
  checkUser,
  generateFileUrl,
  useClickOutSide,
} from "../../Utility/Util";
import React, { useState } from "react";
import GroupInformationDrop from "../../components/PendingPost/GroupInformationDrop";
import { useHistory } from "react-router-dom";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createGroupUsers } from "../../graphql-custom/GroupUsers/mutation";
import { useUser } from "../../context/userContext";

export default function GroupHeader({ group }) {
  const [groupOptionsMenu, setGroupOptionsMenu] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const history = useHistory();
  const groupAdminRef = useClickOutSide(() => {
    setGroupOptionsMenu(false);
  });
  const { user } = useUser();

  const totalMembers = () => {
    if (group.totals) {
      return (
        parseInt(group.totals.admin) +
        parseInt(group.totals.moderator) +
        parseInt(group.totals.member)
      );
    }
  };

  const followGroup = async () => {
    try {
      if (checkUser(user)) {
        await API.graphql(
          graphqlOperation(createGroupUsers, {
            input: {
              group_id: group.id,
              user_id: user.sysUser.id,
              role: "MEMBER",
            },
          })
        );
        group.followed = true;
        group.totals.member += 1;
        setForceRender(forceRender + 1);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="h-c18 relative bg-white">
      <img
        alt="cover"
        src={generateFileUrl(group.cover)}
        className="h-c17 ph:h-c31 object-cover w-full"
      />

      {/* menu */}
      <div className="xl:bottom-c6 bottom-a1 sm:justify-around absolute flex justify-center w-full">
        <div className="ph:grid mx-c6 flex items-end">
          <img
            alt=""
            src={generateFileUrl(group.profile)}
            className="w-c19 h-c19 object-cover border-4 border-white rounded-lg"
          />
          <div className="ml-c6 ph:ml-0">
            <p className="text-26px ph:text-22px font-bold">{group.name}</p>
            <div className="ph:grid flex items-center">
              <div className="flex items-center">
                <span className="icon-fi-rs-world text-16px text-caak-darkBlue flex" />
                <p className="text-15px ml-a1 text-caak-darkBlue">
                  Нээлттэй бүлэг
                </p>
              </div>
              <p className="mx-a1 ph:hidden">·</p>
              <p className="text-15px text-caak-darkBlue">
                {totalMembers()}
                {` гишүүнтэй`}
              </p>
            </div>
          </div>
        </div>
        <div className="ph:flex-col ph:justify-evenly flex items-end">
          <Button
            className="h-c13 text-15px rounded rounded-lg"
            disabled={group.followed}
            onClick={followGroup}
          >
            {group.followed ? (
              <span className="icon-fi-rs-check text-12px mr-a1" />
            ) : null}
            {group.followed ? `Нэгдсэн` : `Нэгдэх`}
          </Button>
          {/* <Button className="h-c13 text-15px bg-caak-generalblack ml-b1 rounded rounded-lg"> 
                        <span className="icon-fi-rs-link text-15px mr-a1"/>
                        Найзаа урих
                    </Button> */}
          <div className="h-c13 flex items-center w-full">
            <div className="ml-b1 bg-white rounded rounded-lg cursor-pointer">
              <span className="icon-fi-rs-notification text-caak-generalblack text-18px px-b4 py-b1 flex rounded rounded-lg shadow" />
            </div>
            {group.role_on_group === "ADMIN" ||
            group.role_on_group === "MODERATOR" ? (
              <div
                ref={groupAdminRef}
                onClick={() => setGroupOptionsMenu(!groupOptionsMenu)}
                className="ml-b1 relative bg-white rounded rounded-lg cursor-pointer"
              >
                <span className="icon-fi-rs-settings text-caak-generalblack text-18px px-b4 py-b1 flex rounded rounded-lg shadow" />
                <GroupInformationDrop
                  className="shadow-dropdown top-8 absolute right-0"
                  shadow
                  content={
                    <div
                      className={`bg-white ${!groupOptionsMenu && "hidden"}`}
                    >
                      <div
                        onClick={() =>
                          history.push({
                            pathname: `/group/${group.id}/pending`,
                          })
                        }
                        style={{ paddingInlineEnd: "21px" }}
                        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
                      >
                        <span
                          className={
                            " icon-fi-rs-pending ml-b4 mr-b2 text-16px"
                          }
                        />
                        <p className="text-14px text-caak-extraBlack font-roboto">
                          Хүлээгдэж буй постууд
                        </p>
                      </div>
                      <div
                        style={{ paddingInlineEnd: "21px" }}
                        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
                      >
                        <span
                          className={"icon-fi-rs-archive ml-b4 mr-b2 text-16px"}
                        />
                        <p className="text-14px text-caak-extraBlack font-roboto">
                          Архивлагдсан постууд
                        </p>
                      </div>
                      <div
                        style={{ paddingInlineEnd: "21px" }}
                        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
                      >
                        <span
                          className={"icon-fi-rs-stats ml-b4 mr-b2 text-16px"}
                        />
                        <p className="text-14px text-caak-extraBlack font-roboto">
                          Статистик
                        </p>
                      </div>
                      <div
                        style={{ paddingInlineEnd: "21px" }}
                        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
                      >
                        <span
                          className={
                            "icon-fi-rs-settings ml-b4 mr-b2 text-16px"
                          }
                        />
                        <p className="text-14px text-caak-extraBlack font-roboto">
                          Тохиргоо
                        </p>
                      </div>
                    </div>
                  }
                  open={groupOptionsMenu}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
