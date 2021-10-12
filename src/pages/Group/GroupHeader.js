import Button from "../../components/button";
import { generateFileUrl } from "../../Utility/Util";
import React, { useState } from "react";
import GroupInformationDrop from "../../components/PendingPost/GroupInformationDrop";
import { useHistory } from "react-router-dom";
import { useUser } from "../../context/userContext";

export default function GroupHeader({ group }) {
  const [groupOptionsMenu, setGroupOptionsMenu] = useState(false);
  const { user } = useUser();
  const history = useHistory();
  const totalMembers = () => {
    //return parseInt(group.totals.admin) + parseInt(group.totals.moderator) + parseInt(group.totals.moderator);
  };
  return (
    <div className="h-c18 relative flex justify-center bg-white">
      <img
        alt="cover"
        src={generateFileUrl(group.cover)}
        className="h-c17 ph:h-c31 object-cover w-full"
      />

      {/* menu */}
      <div className="xl:bottom-c6 bottom-a1 2xl:px-cf xl:px-ch lg:px-c12 md:px-c30 absolute flex justify-between w-full">
        <div className="ph:grid mx-c6 flex items-center w-full">
          <img
            alt=""
            src={generateFileUrl(group.profile)}
            className="w-c19 h-c19 border-4 border-white rounded-lg"
          />
          <div className="ml-c6 ph:ml-0">
            <div className="flex items-center">
              <p className="text-26px ph:text-22px font-bold">{group.name}</p>
              <span className="icon-fi-rs-back text-12px ml-b3 ph:block hidden transform rotate-180" />
            </div>
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
          <div className="ph:block hidden w-full">
            <Button className="bg-caak-bleudefrance flex items-center w-full">
              <span className="icon-fi-rs-add-group-f text-20px" />
              <p className="text-16px ml-b3 font-medium">
                {group.followed ? `Нэгдсэн` : `Нэгдэх`}
              </p>
            </Button>
          </div>
        </div>
        <div className="ph:hidden flex items-end">
          <Button className="ph:mb-b1 h-c13 text-15px bg-caak-titaniumwhite text-caak-generalblack rounded rounded-lg">
            <span className="icon-fi-rs-check text-12px mr-a1" />
            {group.followed ? `Нэгдсэн` : `Нэгдэх`}
          </Button>
          {/* <Button className="h-c13 text-15px bg-caak-generalblack ml-b1 rounded rounded-lg"> 
                        <span className="icon-fi-rs-link text-15px mr-a1"/>
                        Найзаа урих
                    </Button> */}
          <div className="flex">
            <div className="ml-b1 bg-white rounded rounded-lg cursor-pointer">
              <span className="icon-fi-rs-notification text-caak-generalblack text-18px px-b4 py-b1 flex rounded rounded-lg shadow" />
            </div>
            {group.founder_id === user.sysUser.id && (
              <div
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
                          Архивлагдсан фостууд
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
