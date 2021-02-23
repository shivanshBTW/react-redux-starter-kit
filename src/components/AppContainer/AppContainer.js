import React, { Component } from 'react';

import AppContainerStyles from './AppContainerStyles';
import LandingPage from '../LandingPage/LandingPage';
import Navbar from '../Navbar/Navbar';
import PrivateRoute from '../../util/PrivateRoute';
import { Redirect } from 'react-router-dom';
import RoutePath from '../../lib/RoutePath';
import { Settings } from '@material-ui/icons';
import SettingsActions from '../../redux/actions/SettingsActions';
import SettingsPage from '../SettingsPage/SettingsPage';
import { Switch } from 'react-router-dom';
import UserActions from '../../redux/actions/UserActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

let styles = AppContainerStyles;

class AppContainer extends Component {
  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <BrowserRouter> */}
        <Navbar>
          <Switch>
            <PrivateRoute
              exact
              path={RoutePath.landingPagePath}
              authorized={this.props.loggedIn}
              component={LandingPage}
            />
            <PrivateRoute
              exact
              path={RoutePath.settingsPath}
              authorized={this.props.loggedIn}
              component={SettingsPage}
            />

            {/* <PrivateRoute
              exact
              path={RoutePath.dataCollectionProfileSelectionPath()}
              authorized={this.props.loggedIn}
              component={PortionSelectionPage}
            /> */}

            <Redirect to={RoutePath.landingPagePath} />
          </Switch>
        </Navbar>
        {/* </BrowserRouter> */}
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  // console.log(state);
  return {
    loggedIn: state.UserReducer.loggedIn,
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
)(withRouter(withStyles(styles)(AppContainer)));
