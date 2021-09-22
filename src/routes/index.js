import LoginRegsiter from "../pages/Login";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/UserInformation"
import Logout from "../pages/Logout";

const Routes = [
  {
    path: "/",
    exact: true,
    page: () => <h2>Home page</h2>,
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
    page: () => <LoginRegsiter type="signIn"/>,
  },
  {
    path: "/register",
    exact: true,
    background: true,
    page: () => <LoginRegsiter type="signUp"/>,
  },
  {
    path: "/login/main",
    exact: true,
    background: true,
    page: () => <Login />,
  },
  {
    path: "/register/main",
    exact: true,
    background: true,
    page: () => <Register />,
  },
];

export default Routes;
