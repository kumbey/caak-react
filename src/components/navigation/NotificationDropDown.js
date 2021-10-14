import React, { useState ,useEffect } from "react";
import Notification from "./Notification";
import ReactDOM from "react-dom";
import { useUser } from "../../context/userContext";
import { checkUser, getReturnData } from "../../Utility/Util";
import { useListPager } from "../../Utility/ApiHelper";
import { getNotification, listNotificationByUser } from "../../graphql-custom/notification/queries";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { onNoficationAdded } from "../../graphql-custom/notification/subscription";

const NotificationDropDown = ({ isOpen }) => {

  const [domReady, setDomReady] = React.useState(false);
  const [notifications, setNotifications] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(false);
  const [subscripNotifcation, setSubscripNotification] = useState()
  const subscriptions = {}

  const [nextNotification] = useListPager({
    query: listNotificationByUser,
    variables: {
      to: user.sysUser.id,
      sortDirection: "DESC",
      limit: 50,
    },
  })


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
        let resp = await API.graphql(graphqlOperation(getNotification, {id: id}))
        resp = getReturnData(resp)
        setNotifications([resp, ...notifications])
    } catch (ex) {
      console.log(ex);
    }
  };

  const subscrip = async () => {
    subscriptions.onNoficationAdded = await API.graphql({
      query: onNoficationAdded,
      variables: {
        section: "USER",
        to: user.sysUser.id
      }
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true)
        setSubscripNotification(onData)
      },
      error: error => {
        console.warn(error);
      }
    });
  }

  useEffect(() => {
    if(domReady && checkUser(user)){
      fetchNotifications(notifications, setNotifications)
    }
    // eslint-disable-next-line
  },[domReady, user])

  useEffect(() => {

    if(checkUser(user)){
      subscrip()
    }

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true
      })
    }
    // eslint-disable-next-line
  },[user])

  useEffect(() => {
    if(subscripNotifcation){
        fetchNotification(subscripNotifcation.id)
    }
    // eslint-disable-next-line
  },[subscripNotifcation])

  useEffect(() => {
    setDomReady(true);
  }, []);


  return (
    domReady &&
    ReactDOM.createPortal(
      <div
        onClick={(e) => e.stopPropagation()}
        className={`dropdown overflow-auto pb-c20 fixed z-2 mt-0 md:z-50 top-0 right-0 h-full w-full md:mb-2 lg:mb-2 md:bottom-0 md:h-auto md:w-px360 md:top-14 md:right-10 md:py-2 md:top-10 md:right-10 md:my-2 flex flex-col bg-white shadow-dropdown w-96 cursor-auto  ${
          !isOpen && "hidden"
        }`}
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
            {
              notifications.map((item, index) => {
                return(
                  <Notification key={index} item={item} />
                )
              })
            }
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
        <div className={"notification_footer border-t bg-caak-washme p-0"}>
          <span
            className={"text-caak-generalblack text-16px text-center py-1.5"}
          >
            Илүү ихийг харах
          </span>
        </div>
      </div>,
      document.getElementById("root")
    )
  );
};

export default NotificationDropDown;
