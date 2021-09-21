import Card from "../components/card/";
import Login from "../pages/Register/Completed";
import Feed from "../pages/Home/Feed";
import Register from "../pages/Register";

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
    path: "/user",
    exact: true,
    page: () => <Feed />,
  },
];

export default Routes;
