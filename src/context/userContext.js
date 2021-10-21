import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Hub } from "aws-amplify";
import { isLogged, signIn } from "../Utility/Authenty";
import SessionStorageUtil from "../Utility/SessionStorageUtil";
import Consts from "../Utility/Consts";
import { onUserUpdateByUser } from "../graphql-custom/user/subscription";
import { checkUser, getReturnData } from "../Utility/Util";
import API from "@aws-amplify/api";

const UserContext = createContext();

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  return context;
}

function UserProvider(props) {
  const [user, setUser] = useState(SessionStorageUtil.get(Consts.SS_UserKey));
  // const [user, setUser] = useState()
  const [updatedUser, setUpdatedUser] = useState();
  const subscriptions = {};

  useEffect(() => {
    isLogged(user, setUser);

    Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signOut":
          setUser(null);
          break;
        case "signIn":
          signIn(setUser);
          break;
        default:
          break;
      }
    });
    return () => {
      setUser(null);
    };
    // eslint-disable-next-line
  }, []);

  const subscrip = () => {
    subscriptions.onUserUpdateByUser = API.graphql({
      query: onUserUpdateByUser,
      variables: {
        id: user.sysUser.id,
      },
    }).subscribe({
      next: (data) => {
        console.log(data);
        const onData = getReturnData(data, true);
        setUpdatedUser(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (user) {
      SessionStorageUtil.set(Consts.SS_UserKey, user);
    } else {
      SessionStorageUtil.remove(Consts.SS_UserKey);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (updatedUser) {
      setUser({ ...user, sysUser: updatedUser });
    }
    // eslint-disable-next-line
  }, [updatedUser]);

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
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value} {...props} />;
}

export { UserProvider, useUser };
