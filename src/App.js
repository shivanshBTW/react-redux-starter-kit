import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {withStyles} from '@material-ui/core/styles'
import {ToastContainer} from 'react-toastify'
import Navbar from "./components/Navbar/Navbar";
import RoutePath from "./lib/RoutePath";

const drawerWidth = 240;

const styles = theme => ({
   root: {
      flexGrow: 1
   }

});

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         anchor: 'left'
      }
   }

   render() {
      const {classes} = this.props;
      const PrivateRoute = ({component: Component, authed, ...rest}) => {
         return (
            <Route
               {...rest}
               render={
                  (props) => authed
                     ? <Component {...rest} />
                     : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
               }
            />
         )
      };
      return (
         <div className={classes.root}>
            <BrowserRouter>
               <Switch>
                  <Route exact path={RoutePath.homePath} component={Navbar}/>
                  {/*<Route exact path='/product' component={PresentationPage}/>*/}
                  {/*<Route exact path="/blog/:slug" component={BlogDetailView}/>*/}
                  {/*<PrivateRoute authed={localStorage.getItem('access_token')} path="/my" component={Routes}/>*/}
               </Switch>
            </BrowserRouter>
            <ToastContainer/>
            {/* <Route path='*' exact={true} component={LandingPage} /> */}
         </div>
      )
   }
}

export default withStyles(styles)(App)
