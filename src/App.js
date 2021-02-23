import 'material-react-toastify/dist/ReactToastify.css';
import './assets/fonts/material-fonts/material-fonts.css';
import './assets/fonts/montserrat/montserrat.css';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'material-react-toastify';

import AppContainer from './components/AppContainer/AppContainer';
import AppStyles from './AppStyles';
import { CssBaseline } from '@material-ui/core';
import DarkStylesConfig from './lib/StyleConfigs/ColorsConfig/DarkStylesConfig';
import GenUtil from './util/GenUtil';
import LightStylesConfig from './lib/StyleConfigs/ColorsConfig/LightStylesConfig';
import LoginContainer from './components/LoginContainer/LoginContainer';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import RoutePath from './lib/RoutePath';
import SettingsActions from './redux/actions/SettingsActions';
import { ThemeProvider } from '@material-ui/styles';
import UserActions from './redux/actions/UserActions';
import { connect } from 'react-redux';
import moment from 'moment';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = AppStyles;

const toastConfiguration = {
  autoClose: 2000,
  // draggable: true,
  // pauseOnHover: true
  //etc you get the idea
};

let PrivateRoute = (props) => {
  let { component: Component, authorized, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props) =>
        authorized ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: RoutePath.loginPath,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: 'left',
      loggedIn: undefined,
    };
  }

  componentDidMount = () => {
    moment.locale('en-in');
    // console.log(this.props.loggedUser);
    this.getLocalStorageConfigSettings();
    let token = GenUtil.getAccessToken();
    // console.log(token);
    if (token) {
      let tokenObj = JSON.parse(window.atob(token.split('.')[1]));
      // console.log(tokenObj);
      if (new Date().getTime() > tokenObj.exp * 1000) {
        // console.log('expired');
        localStorage.removeItem('token');
        toast.error('Token Expired!!! Login Again');
      } else {
        this.props.loginUser({ token, userObj: tokenObj });
        // console.log('login');
      }
    }
    this.setState({ loggedIn: this.props.loggedIn });
  };

  getLocalStorageConfigSettings = () => {
    let config = JSON.parse(localStorage.getItem('config'));
    // console.log(config);
    // config && this.props.setTouchlessMode(!!config.isTouchlessMode)
    // this.props.setDarkMode(true);
    this.props.setDarkMode(!!config?.isDarkMode);
    // config && this.setState({prefersDarkTheme: !!config.isDarkMode})
  };

  render() {
    const { classes, isDarkMode } = this.props;
    if (this.state.loggedIn === undefined) {
      return <></>;
    } else {
      return (
        <>
          <ThemeProvider
            theme={isDarkMode ? DarkStylesConfig : LightStylesConfig}
          >
            <div className={classes.root}>
              <CssBaseline />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <BrowserRouter>
                  <Switch>
                    {/*<Route exact path='/product' component={PresentationPage}/>*/}
                    {/*<Route exact path="/blog/:slug" component={BlogDetailView}/>*/}
                    {/*<PrivateRoute authed={localStorage.getItem('access_token')} path="/my" component={Routes}/>*/}
                    <Route
                      exact
                      path={RoutePath.loginPath}
                      component={LoginContainer}
                    />
                    {/* <Route
                      exact
                      path={RoutePath.signupPath}
                      authorized={this.props.loggedIn}
                      component={SignupContainer}
                    /> */}
                    <PrivateRoute
                      // exact
                      path={RoutePath.homePath}
                      authorized={this.props.loggedIn}
                      component={AppContainer}
                    />
                    {/* <Route
                      component={AppContainer}
                    /> */}
                  </Switch>
                </BrowserRouter>
              </MuiPickersUtilsProvider>
            </div>
          </ThemeProvider>
          <ToastContainer {...toastConfiguration} style={{ marginTop: 40 }} />
        </>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    loggedIn: true,
    // loggedIn: state.UserReducer.loggedIn,
    loggedUser: state.UserReducer.loggedUser,
    isDarkMode: state.SettingsReducer.isDarkMode,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (data) => dispatch(UserActions.loginUser(data)),
    setDarkMode: (value) => dispatch(SettingsActions.setDarkMode(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
