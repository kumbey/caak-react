import {
    Switch,
    Route,
    useLocation,
  } from "react-router-dom";
import { UserProvider } from "../../context/userContext";
import Routes from "../../routes";
import WithAuth from "../auth/WithAuth";
import NavBar from "../navigation/NavBar";
import PrivateRoute from "./PrivateRoute";

const PageSwitch = (props) => {

    let location = useLocation();

    // This piece of state is set when one of the
    // gallery links is clicked. The `background` state
    // is the location that we were at when one of
    // the gallery links was clicked. If it's there,
    // use it as the location for the <Switch> so
    // we show the gallery in the background, behind
    // the modal.
    let background = location.state && location.state.background;
  
    return (
      <UserProvider>
        <NavBar/>
        {/* <WithAuth/> */}
        <Switch location={background || location}>
          {Routes.map((route, index) => {
            if(route.auth){
              return (<PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.page}
                isAuth={props.isAuth}
              />)
            }else{
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.page}
                />
              )
            }
          })}
            <Route path="/post/:id" component={null}/>
            <Route path="/edit/:id" component={null}/>
            <Route component={null} />
        </Switch>
        <Route path="/" component={null}/>
        <Route path="/popupsignin" component={null}/>
        {background && <Route path="/post/:id" component={null}/>}
        {background && <Route path="/spost/:id" component={null}/>}
        {background && <Route path="/edit/:id" component={null}/>}
      </UserProvider>
    );
  }

  export default PageSwitch