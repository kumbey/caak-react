import Confirmation from "../pages/Register/Confirmation";

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
    path: "/sanjaa",
    exact: true,
    page: () => <Confirmation />,
  },
];

export default Routes;
