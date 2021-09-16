import Home from "../pages/Home"
import Confirmation from "../pages/Register/Confirmation";


const Routes = [
    {
        path: "/",
        exact: true,
        page: () => <Home/>,
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
        page: () => <Confirmation email="bayarmagnai@caak.mn"/>,
    }
]

export default Routes;
