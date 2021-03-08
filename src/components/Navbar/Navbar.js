import { ButtonBase, ListItem, Typography } from '@material-ui/core';
import { NavLink, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import { AccountCircle } from '@material-ui/icons';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import AppBar from '@material-ui/core/AppBar';
import BurstModeTwoToneIcon from '@material-ui/icons/BurstModeTwoTone';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CssBaseline from '@material-ui/core/CssBaseline';
import DarkStylesConfig from '../../lib/StyleConfigs/ColorsConfig/DarkStylesConfig';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import GenUtil from '../../util/GenUtil';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LightStylesConfig from '../../lib/StyleConfigs/ColorsConfig/LightStylesConfig';
import List from '@material-ui/core/List';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NavbarStyles from './NavbarStyles';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import Paper from '@material-ui/core/Paper';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import Popper from '@material-ui/core/Popper';
import RoutePath from '../../lib/RoutePath';
import SettingsApplicationsTwoToneIcon from '@material-ui/icons/SettingsApplicationsTwoTone';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import UserActions from '../../redux/actions/UserActions';
import { capitalizeFirstLetter } from '../../util/CommonUtils';
import clsx from 'clsx';
import { connect } from 'react-redux';
// import { isMobile } from 'mobile-device-detect';
import { toast } from 'material-react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';

const styles = NavbarStyles;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      newRegistrationModalOpenFlag: false,
      accountMenuAnchorEl: null,
      addEngineModalOpenFlag: false,
      // addEngineModalOpenFlag: true,
    };
  }

  handleLogout = () => {
    //  this.handleMenuClose();
    this.props.logoutUser();
    GenUtil.removeAccessToken();
    toast.success('Logged Out Successfully!!!');
    RoutePath.navigateTo(this.props, RoutePath.loginPath);
  };

  handleDrawerToggle = () => {
    let { drawerOpen } = this.state;
    this.setState({ drawerOpen: !drawerOpen });
  };

  handleNewRegistrationModalOpen = () => {
    this.setState({ newRegistrationModalOpenFlag: true });
  };

  handleNewRegistrationModalClose = () => {
    this.setState({ newRegistrationModalOpenFlag: false });
  };

  setAccountMenuAnchorEl = (accountMenuAnchorEl) => {
    this.setState({ accountMenuAnchorEl });
  };

  handleAccountMenuOpen = (event) => {
    this.setAccountMenuAnchorEl(event.currentTarget);
  };

  handleAccountMenuClose = () => {
    this.setAccountMenuAnchorEl(null);
  };

  handleOpenAddEngineModal = () => {
    this.setState({ addEngineModalOpenFlag: true });
  };

  handleCloseAddEngineModal = () => {
    this.setState({ addEngineModalOpenFlag: false });
  };

  render() {
    let {
      classes,
      width,
      isDarkMode,
      children,
      loggedUser,
    } = this.props;
    const {
      drawerOpen,
      accountMenuAnchorEl,
      addEngineModalOpenFlag,
    } = this.state;
    const isAccountMenuOpen = Boolean(accountMenuAnchorEl);

    // let md = new MobileDetect();
    //  console.log('isMobile', isMobile);
    // const isMobileBrowser = false;
    const isMobileBrowser = width === 'xs';

    const { appBarVariant } = NavbarConfig;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <NavbarAppBar width={width} />

        {isMobileBrowser ? (
          <>
            <CssBaseline />
            <AppBar
              position="fixed"
              color="primary"
              className={classes.mobileAppBar}
            >
              <Toolbar>
                <Grid container direction="row" justify="space-around">
                  <Grid item>
                    <ButtonBase
                      component={NavLink}
                      exact
                      to={RoutePath.landingPagePath}
                      className={classes.mobileNavLink}
                      activeClassName={
                        isDarkMode
                          ? classes.activeNavLinkDarkMode
                          : classes.activeNavLink
                      }
                    >
                      <ListAltTwoToneIcon fontSize={'inherit'} />
                    </ButtonBase>
                  </Grid>

                  <Grid item>
                    <ButtonBase
                      component={NavLink}
                      exact
                      to={RoutePath.settingsPath}
                      className={classes.mobileNavLink}
                      activeClassName={
                        isDarkMode
                          ? classes.activeNavLinkDarkMode
                          : classes.activeNavLink
                      }
                    >
                      <SettingsApplicationsTwoToneIcon fontSize={'inherit'} />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </>
        ) : (
          <ThemeProvider theme={true ? DarkStylesConfig : LightStylesConfig}>
            {/*<ThemeProvider theme={!isDarkMode ? darkTheme : lightTheme}>*/}
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
              })}
              classes={{
                paper: clsx(classes.drawerBackground, {
                  [classes.drawerOpen]: drawerOpen,
                  [classes.drawerClose]: !drawerOpen,
                }),
              }}
            >
              <div
                className={
                  classes['toolbar' + capitalizeFirstLetter(appBarVariant)]
                }
              />
              <Divider />
              <List>
                <NavLink
                  exact
                  to={RoutePath.landingPagePath}
                  className={classes.drawerTab}
                  activeClassName={
                    isDarkMode
                      ? classes.activeDrawerTabDarkMode
                      : classes.activeDrawerTab
                  }
                >
                  <ListItem
                    button
                    variant={'contained'}
                    className={classes.drawerItem}
                  >
                    <ListItemIcon className={classes.drawerIcon}>
                      <ListAltTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText>Landing Page</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink
                  exact
                  to={RoutePath.settingsPath}
                  className={classes.drawerTab}
                  activeClassName={
                    isDarkMode
                      ? classes.activeDrawerTabDarkMode
                      : classes.activeDrawerTab
                  }
                >
                  <ListItem
                    button
                    variant={'contained'}
                    className={classes.drawerItem}
                  >
                    <ListItemIcon className={classes.drawerIcon}>
                      <SettingsApplicationsTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </ListItem>
                </NavLink>
              </List>
            </Drawer>
          </ThemeProvider>
        )}
        <main className={classes.content}>
          <div
            className={
              classes['toolbar' + capitalizeFirstLetter(appBarVariant)]
            }
          />
          {children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.UserReducer.loggedIn,
    loggedUser: state.UserReducer.loggedUser,
    isDarkMode: state.SettingsReducer.isDarkMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(UserActions.logoutUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWidth()(withStyles(styles, { withTheme: true })(Navbar))));
