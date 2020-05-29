import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import RoutePath from "./lib/RoutePath";
import LandingPage from "./components/LandingPage/LandingPage";
import MomentUtils from "@date-io/moment";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {connect} from "react-redux";
import UserActions from "./redux/actions/UserActions";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import LightStylesConfig from "./lib/LightStylesConfig";
import DarkStylesConfig from "./lib/DarkStylesConfig";

const lightTheme = createMuiTheme(LightStylesConfig);

const darkTheme = createMuiTheme(DarkStylesConfig);

const styles = theme => {
   console.log(theme);
   return (
      {
         root: {
            flexGrow: 1,
         }
      }
   )
}

const toastConfiguration = {
   autoClose: 2000,
   draggable: true,
   pauseOnHover: true
   //etc you get the idea
}

let PrivateRoute = (props) => {
   let {component: Component, authorized, ...rest} = props;
   return (
      <Route
         {...rest}
         component={
            (props) => authorized
               ? <Component {...props} {...rest} />
               : <Redirect to={{pathname: RoutePath.loginPath, state: {from: props.location}}}/>
         }
      />
   )
};

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loggedIn: true,
         prefersDarkTheme: false
      }
   }

   render() {
      const {classes} = this.props;
      if (this.state.loggedIn === undefined) {
         return (
            <>
            </>
         )
      } else {
         return (
            <>
               <ThemeProvider theme={this.state.prefersDarkTheme ? darkTheme : lightTheme}>
                  <div className={classes.root}>
                     <CssBaseline/>
                     <MuiPickersUtilsProvider utils={MomentUtils}>
                        <BrowserRouter>
                           <Navbar/>
                           <Switch>
                              {/*<Route exact path={RoutePath.loginPath} component={LoginContainer}/>*/}

                              <PrivateRoute exact path={RoutePath.homePath} authorized={this.props.loggedIn}
                                            component={LandingPage}/>
                              {/*<PrivateRoute exact path={RoutePath.detailedList()} authorized={this.props.loggedIn}*/}
                              {/*              component={DetailedList}/>*/}
                           </Switch>
                        </BrowserRouter>
                     </MuiPickersUtilsProvider>
                  </div>
               </ThemeProvider>
               <ToastContainer {...toastConfiguration} style={{marginTop: 40}}/>
            </>
         )
      }
   }
}

let mapStateToProps = (state) => {
   return {
      loggedIn: true,
      // loggedIn: state.loggedIn,
      // loggedUser: state.loggedUser
   }
};

let mapDispatchToProps = (dispatch) => {
   return {
      loginUser: data => dispatch(UserActions.loginUser(data))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
