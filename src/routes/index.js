import Home from "../pages/Home"

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
        page: () => <Confirmation email={"sanjasapple@gmail.com"}/>,
    }
]

export default Routes;
