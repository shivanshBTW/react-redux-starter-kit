import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {withStyles} from '@material-ui/core/styles'
import Navbar from "./components/Navbar/Navbar";
import RoutePath from "./lib/RoutePath";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {connect} from "react-redux";

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
                     : <Redirect to={{pathname: RoutePath.loginPath, state: {from: props.location}}}/>
               }
            />
         )
      };
      return (
         <div className={classes.root}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
               <BrowserRouter>
                  <Navbar/>
                  <Switch>
                     <Route exact path={RoutePath.homePath} component={Navbar}/>
                     {/*<Route exact path='/product' component={PresentationPage}/>*/}
                     {/*<Route exact path="/blog/:slug" component={BlogDetailView}/>*/}
                     {/*<PrivateRoute authed={localStorage.getItem('access_token')} path="/my" component={Routes}/>*/}
                     {/*<Route exact path={RoutePath.loginPath} component={LoginContainer}/>*/}
                     {/*<PrivateRoute exact path={RoutePath.homePath} authed={this.props.loggedIn}*/}
                     {/*              component={LandingPage}/>*/}
                     {/*<PrivateRoute exact path={RoutePath.statsPath} authed={this.props.loggedIn}*/}
                     {/*              component={StatsContainer}/>*/}
                  </Switch>
               </BrowserRouter>
            </MuiPickersUtilsProvider>
            <ToastContainer/>
         </div>
      )
   }
}

let mapStateToProps = (state) => {
   return {
      loggedIn: true
      // loggedIn: state.loggedIn
   }
}

export default connect(mapStateToProps)(withStyles(styles)(App))
