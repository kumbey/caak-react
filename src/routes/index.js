import LoginRegsiter from "../pages/Login";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/UserInformation";
import Logout from "../pages/Logout";
import AddPost from "../pages/Blog/AddPost";
import Confirmation from "../pages/Register/Confirmation";
import Group from "../pages/Group/index";
import Completed from "../pages/Register/Completed";
import FederatedLogin from "../pages/Login/FederatedLogin";
import PendingPostAdmin from "../pages/Group/PendingPostAdmin";
import Profile from "../pages/Profile/index";
import Activities from "../pages/Profile/Activities";
import Feed from "../pages/Home/Feed";
import SettingsProfile from "../pages/Profile/Settings";
import ViewPost from "../pages/Blog/ViewPost";
import Check from "../pages/Group/Check";
import Interests from "../pages/Register/Interests";
import ForgotPassword from "../pages/ForgotPassword";
import PassConfirmation from "../pages/ForgotPassword/PassConfirmation";

const Routes = [
  {
    path: "/",
    exact: true,
    page: () => <Feed />,
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
    page: () => <Interests />,
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
    page: () => <Logout />,
  },
  {
    path: "/login",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <LoginRegsiter type="signIn" />,
  },
  {
    path: "/register",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <LoginRegsiter type="signUp" />,
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
    unAuth: false,
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
    path: "/forgotpassword",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <ForgotPassword />,
  },
  {
    path: "/forgotpassword/confirmation",
    exact: true,
    background: true,
    unAuth: true,
    page: () => <PassConfirmation />,
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
    path: "/post/add/new",
    exact: true,
    background: true,
    auth: true,
    page: () => <AddPost />,
  },
  {
    path: "/post/add/group/:groupId",
    exact: true,
    background: true,
    auth: true,
    page: () => <AddPost />,
  },
  {
    path: "/post/edit/:postId",
    exact: true,
    background: true,
    auth: true,
    page: () => <AddPost />,
  },
  {
    path: "/post/view/:postId",
    exact: true,
    background: true,
    auth: false,
    page: () => <ViewPost />,
  },
  {
    path: "/group/:groupId",
    exact: true,
    background: true,
    page: () => <Group />,
  },
  {
    path: "/group/:groupId/pending",
    exact: true,
    background: true,
    auth: true,
    page: () => <PendingPostAdmin />,
  },
  {
    path: "/pending/view/:postId",
    exact: true,
    background: true,
    page: () => <Check />,
  },
  {
    path: "/post/view/pending/:postId",
    exact: true,
    background: true,
    page: () => <ViewPost pending={true} />,
  },
  {
    path: "/user/:userId/profile",
    exact: true,
    background: true,
    page: () => <Profile />,
  },
  {
    path: "/profile/active",
    exact: true,
    background: true,
    page: () => <Activities />,
  },
  {
    path: "/user/:userId/settings",
    exact: true,
    background: true,
    page: () => <SettingsProfile />,
  },
];

export default Routes;
