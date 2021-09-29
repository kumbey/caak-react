import LoginRegsiter from "../pages/Login";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/UserInformation"
import Logout from "../pages/Logout";
import AddPost from "../pages/Blog/AddPost";
import Confirmation from "../pages/Register/Confirmation"
import Group from "../pages/Group/index"
import Completed from "../pages/Register/Completed";
import FederatedLogin from "../pages/Login/FederatedLogin";
import PendingPostAdmin from "../pages/Group/PendingPostAdmin";
import Check from "../pages/Group/Check";

const Routes = [
  {
    path: "/",
    exact: true,
    page: () => <h3>asd</h3>,
  },
  {
    path: "/sanjaa",
    exact: true,
    background: true,
    page: () => <AddPost />,
  },
  {
    path: "/purwee",
    exact: true,
    background: true,
    page: () => <PendingPostAdmin />,
  },
  {
    path: "/profile/userconfig",
    exact: true,
    auth: true,
    page: () => <h2>User Config page</h2>,
  },
  {
    path: "/logout",
    exact: true,
    background: true,
    page: () => <Logout/>,
  },
  {
    path: "/login",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <LoginRegsiter type="signIn"/>,
  },
  {
    path: "/register",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <LoginRegsiter type="signUp"/>,
  },
  {
    path: "/login/main",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <Login />,
  },
  {
    path: "/register/main",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <Register />,
  },
  {
    path: "/register/confirmation/",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <Confirmation />,
  },
  {
    path: "/register/completed/",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <Completed />,
  },
  {
    path: "/federated/login/:type",
    exact: true,
    unAuth: true,
    page: () => <FederatedLogin />,
  },
  {
    path: "/federated/login/",
    exact: true,
    page: () => <FederatedLogin />,
  },
  {
    path: "/post/add/:postId",
    exact: true,
    background: true,
    auth: true,
    page: () => <AddPost />,
  },
  {
    path: "/group",
    exact: true,
    background: true,
    page: () => <Group />,
  },
  {
    path: "/check",
    exact: true,
    background: true,
    page: () => <Check />,
  },
];

export default Routes;
