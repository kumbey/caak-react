import { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import { createPortal } from "react-dom";
import { useUser } from "../../context/userContext";
import { checkUser, getReturnData } from "../../Utility/Util";
import { useListPager } from "../../Utility/ApiHelper";
import {
  getNotification,
  listNotificationByUser,
} from "../../graphql-custom/notification/queries";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { onNoficationAdded } from "../../graphql-custom/notification/subscription";
import { updateNotification } from "../../graphql-custom/notification/mutation";
import { useHistory, useLocation } from "react-router";
import { getPostItems } from "../../graphql-custom/postItems/queries";
import { getComment } from "../../graphql-custom/comment/queries";
import Loader from "../loader";
import useInfiniteScroll from "../../pages/Home/useFetch";

const NotificationDropDown = ({ isOpen }) => {
  const [domReady, setDomReady] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [subscripNotifcation, setSubscripNotification] = useState();
  const subscriptions = {};
  const history = useHistory();
  const location = useLocation();
  let localNotifications = notifications;
  const notificationRef = useRef();

  const [nextNotification] = useListPager({
    query: listNotificationByUser,
    variables: {
      to: user.sysUser.id,
      sortDirection: "DESC",
      limit: 20,
    },
  });

  const [setNotificationScroll] = useInfiniteScroll(
    notifications,
    setNotifications,
    notificationRef
  );

  const fetchNotifications = async (data, setData) => {
    try {
      if (!loading) {
        setLoading(true);

        let resp = await nextNotification();

        if (resp) {
          setData([...data, ...resp]);
        }
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchNotification = async (id) => {
    try {
      let resp = await API.graphql(
        graphqlOperation(getNotification, { id: id })
      );
      resp = getReturnData(resp);

      setNotifications([resp, ...notifications]);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleAllNotifications = () => {
    notifications.map(async (item, index) => {
      if (item.seen === "FALSE") {
        localNotifications[index].seen = "TRUE";
        try {
          await API.graphql(
            graphqlOperation(updateNotification, {
              input: {
                id: item.id,
                seen: "TRUE",
                expectedVersion: item.version,
              },
            })
          );
        } catch (ex) {
          if (
            ex.errors[0].errorType ===
            "DynamoDB:ConditionalCheckFailedException"
          ) {
            console.log("ALREADY UPDATED");
          } else console.log(ex);
        }
      }
      return null;
    });
  };

  const handleNotificationClick = async (item, index) => {
    try {
      const item = notifications[index];

      await API.graphql(
        graphqlOperation(updateNotification, {
          input: {
            id: item.id,
            seen: "TRUE",
            expectedVersion: item.version,
          },
        })
      );
      if (item.seen === "FALSE") localNotifications[index].seen = "TRUE";

      if (item.action === "POST_CONFIRMED" || item.action === "REACTION_POST") {
        history.push({
          pathname: `/post/view/${item.item_id}`,
          state: { background: location },
        });
      } else if (
        item.action === "POST_PENDING" ||
        item.action === "POST_ARCHIVED"
      ) {
        history.push({
          pathname: `/post/view/pending/${item.item_id}`,
          state: { background: location },
        });
      } else if (item.action === "REACTION_POST_ITEM") {
        let resp = await API.graphql(
          graphqlOperation(getPostItems, { id: item.item_id })
        );
        resp = getReturnData(resp);
        history.push({
          pathname: `/post/view/${resp.post_id}`,
          state: { background: location },
        });
      } else if (item.action === "COMMENT_WRITED") {
        let resp = await API.graphql(
          graphqlOperation(getComment, { id: item.item_id })
        );
        resp = getReturnData(resp);
        resp = await API.graphql(
          graphqlOperation(getPostItems, { id: resp.post_item_id })
        );
        resp = getReturnData(resp);
        history.push({
          pathname: `/post/view/${resp.post_id}`,
          state: { background: location },
        });
      } else if (item.action === "USER_FOLLOWED") {
        history.push({
          pathname: `/user/${item.item_id}/profile`,
        });
      }
    } catch (ex) {
      if (
        ex.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
      ) {
        console.log("ALREADY UPDATED");
        localNotifications[index].seen = "TRUE";
      } else console.log(ex);
    }
  };

  const subscrip = async () => {
    subscriptions.onNoficationAdded = await API.graphql({
      query: onNoficationAdded,
      variables: {
        section: "USER",
        to: user.sysUser.id,
      },
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscripNotification(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (domReady && checkUser(user)) {
      fetchNotifications(notifications, setNotifications);
      setNotificationScroll(fetchNotifications);
    }
    // eslint-disable-next-line
  }, [domReady]);

  useEffect(() => {
    if (checkUser(user)) {
      subscrip();
    }

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (subscripNotifcation) {
      fetchNotification(subscripNotifcation.id);
    }
    // eslint-disable-next-line
  }, [subscripNotifcation]);

  useEffect(() => {
    setDomReady(true);
  }, []);

  return (
    domReady &&
    createPortal(
      <div
        id={"notificationDropdown"}
        // onClick={(e) => e.stopPropagation()}
        className={`${
          !isOpen && "hidden"
        } notificationMobile dropdown overflow-y-scroll pb-c20 absolute md:fixed sm:absolute z-2 mt-0 md:z-50 top-0 right-0 w-full md:mb-2 lg:mb-2 md:bottom-0 md:h-auto md:w-px360 md:top-14 md:right-10 md:py-2 md:top-10 md:right-10 md:my-2 flex flex-col bg-white shadow-dropdown w-px360 cursor-auto  `}
      >
        <div
          className={
            "flex flex-row items-center justify-between w-full px-5 pb-2 pt-3 border-b border-t md:border-t-0"
          }
        >
          <span
            className={
              "text-caak-generalblack font-medium text-20px md:text-16px"
            }
          >
            Мэдэгдэл
          </span>
          <span
            onClick={() => handleAllNotifications()}
            className={
              "text-caak-bleudefrance cursor-pointer text-14px font-medium"
            }
          >
            Бүгдийг харсан
          </span>
        </div>
        <div className={"notification_body flex flex-col bg-caak-washme p-0"}>
          <span
            className={"font-medium text-caak-darkBlue text-14px px-3.5 py-1.5"}
          >
            Шинэ
          </span>
          {localNotifications.map((item, index) => {
            return (
              <Notification
                onClick={() => handleNotificationClick(item, index)}
                key={index}
                item={item}
              />
            );
          })}
          {/* <span
            className={"font-medium text-caak-darkBlue text-14px px-3.5 py-1.5"}
          >
            Сүүлд ирсэн
          </span> */}
          {/* <Notification type={"caak"} />
          <Notification type={"comment"} />
          <Notification type={"request"} />
          <Notification type={"request"} />
          <Notification type={"request"} />
          <Notification type={"request"} />
          <Notification type={"request"} /> */}
        </div>
        <div
          ref={notificationRef}
          className={"flex justify-center items-center"}
        >
          <Loader
            className={`${
              loading ? "opacity-100" : "opacity-0"
            } bg-caak-primary `}
          />
        </div>
      </div>,
      document.getElementById("root")
    )
  );
};

export default NotificationDropDown;
