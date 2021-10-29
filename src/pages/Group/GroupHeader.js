import Button from "../../components/button";
import {
  checkUser,
  generateFileUrl,
  getReturnData,
  useClickOutSide,
} from "../../Utility/Util";
import React, { useEffect, useState } from "react";
import GroupInformationDrop from "../../components/PendingPost/GroupInformationDrop";
import { useHistory } from "react-router-dom";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../graphql-custom/GroupUsers/mutation";
import { useUser } from "../../context/userContext";
import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";

export default function GroupHeader({ group, setBodyRender }) {
  
  const [groupOptionsMenu, setGroupOptionsMenu] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subscriptionTotal, setSubscriptionTotal] = useState();

  const { user } = useUser();
  const history = useHistory();
  const subscriptions = {};

  const groupAdminRef = useClickOutSide(() => {
    setGroupOptionsMenu(false);
  });

  const subscrip = () => {
    subscriptions.onChangedTotalsBy = API.graphql({
      query: onChangedTotalsBy,
      variables: {
        type: "GroupTotal",
        id: group.id,
      },
      authMode: "AWS_IAM",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionTotal(JSON.parse(onData.totals));
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (subscriptionTotal) {
      group.totals.pending = parseInt(subscriptionTotal.pending);
      setForceRender(forceRender + 1);
      if (setForceRender) {
        setBodyRender((prev) => prev + 1);
      }
    }
    // eslint-disable-next-line
  }, [subscriptionTotal]);

  useEffect(() => {
    subscrip();
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [user]);

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
        setLoading(true);
        if (group.followed) {
          await API.graphql(
            graphqlOperation(deleteGroupUsers, {
              input: {
                group_id: group.id,
                user_id: user.sysUser.id,
              },
            })
          );
          group.followed = false;
          group.totals.member -= 1;
          setForceRender(forceRender + 1);
        } else {
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
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  return (
    <div className="h-c18 relative bg-white">
      <img
        alt=""
        src={generateFileUrl(group.cover)}
        className="h-c17 ph:h-c31 object-cover w-full"
      />

      {/* menu */}
      <div className="xl:bottom-c6 bottom-px-6 sm:justify-around absolute flex justify-center w-full">
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
                <p className="text-15px ml-px-6 text-caak-darkBlue">
                  Нээлттэй бүлэг
                </p>
              </div>
              <p className="mx-px-6 ph:hidden">·</p>
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
            disabled={loading}
            onClick={followGroup}
            skin={group.followed ? "secondary" : "primary"}
          >
            {group.followed ? (
              <span className="icon-fi-rs-check text-12px mr-px-6" />
            ) : null}
            {group.followed ? `Нэгдсэн` : `Нэгдэх`}
          </Button>
          {/* <Button className="h-c13 text-15px bg-caak-generalblack ml-px-10 rounded rounded-lg">
                        <span className="icon-fi-rs-link text-15px mr-px-6"/>
                        Найзаа урих
                    </Button> */}
          <div className="h-c13 flex items-center w-full">
            <div className="ml-px-10 bg-white rounded rounded-lg cursor-pointer">
              <span className="icon-fi-rs-notification text-caak-generalblack text-18px px-b4 py-px-10 flex rounded rounded-lg shadow" />
            </div>
            {group.role_on_group === "ADMIN" ||
            group.role_on_group === "MODERATOR" ? (
              <div
                ref={groupAdminRef}
                onClick={() => setGroupOptionsMenu(!groupOptionsMenu)}
                className="ml-px-10 relative bg-white rounded rounded-lg cursor-pointer"
              >
                <span className="icon-fi-rs-settings text-caak-generalblack text-18px px-b4 py-px-10 flex rounded rounded-lg shadow" />
                {group.totals.pending !== 0 && (
                  <span
                    className={
                      "absolute text-center -top-1 -right-0.5 w-18px h-18px border-1 rounded-full border-white font-medium border border-white bg-caak-primary text-white text-12px"
                    }
                  >
                    {group.totals.pending}
                  </span>
                )}

                <GroupInformationDrop
                  className="top-8 shadow-dropdown absolute right-0"
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
                        style={{ paddingInlineEnd: "11px" }}
                        className="hover:bg-caak-liquidnitrogen h-c25 relative flex items-center justify-between cursor-pointer"
                      >
                        <span
                          className={
                            " icon-fi-rs-pending ml-b4 mr-px-12 text-16px"
                          }
                        />
                        <p className="text-14px text-caak-extraBlack font-roboto">
                          Хүлээгдэж буй постууд
                        </p>
                        {group.totals.pending !== 0 && (
                          <span
                            className={
                              " text-center ml-2 w-18px h-18px border-1 rounded-full border-white font-medium border border-white bg-caak-primary text-white text-12px"
                            }
                          >
                            {group.totals.pending}
                          </span>
                        )}
                      </div>
                      <div
                        style={{ paddingInlineEnd: "21px" }}
                        className="hover:bg-caak-liquidnitrogen h-c25 flex items-center cursor-pointer"
                      >
                        <span
                          className={
                            "icon-fi-rs-stats ml-b4 mr-px-12 text-16px"
                          }
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
                            "icon-fi-rs-settings ml-b4 mr-px-12 text-16px"
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
