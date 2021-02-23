import { ButtonBase, Typography } from '@material-ui/core';
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
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NavbarStyles from './NavbarStyles';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import Paper from '@material-ui/core/Paper';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import Popper from '@material-ui/core/Popper';
import RoutePath from '../../lib/RoutePath';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import UserActions from '../../redux/actions/UserActions';
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
      playerVisible,
      playerURL,
      controlsVisible,
      loopVideo,
      autoPlay,
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

    const accountMenuId = 'account-menu';
    const renderAccountMenu = (
      <>
        <Popper
          open={isAccountMenuOpen}
          id={accountMenuId}
          anchorEl={accountMenuAnchorEl}
          placement={'bottom-end'}
          // role={undefined}
          className={classes.dropdownMenuContainer}
        >
          <Paper className={classes.dropdownMenu}>
            <ClickAwayListener onClickAway={this.handleAccountMenuClose}>
              <MenuList>
                <MenuItem onClick={this.handleLogout}>
                  <i className="fas fa-power-off" /> &nbsp;Logout
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar)}
          color={'default'}
        >
          <Toolbar>
            {isMobileBrowser ? null : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                edge="start"
                className={clsx(classes.menuButton)}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              noWrap
              className={clsx(classes.logoText, {
                [classes.logoTextHideOnLogoDisplay]: false,
              })}
            >
              React Redux Material-UI Starter Code by{' '}
              <a
                href="https://www.github.com/shivanshBTW"
                style={{
                  textDecoration: 'none',
                  '&::hover': { textDecoration: 'underline' },
                }}
              >
                @shivanshBTW
              </a>
            </Typography>

            {/* <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.logoImageContainer}
            >
              <Grid item xs={6} sm={2}>
                <img
                  src={require('./../../assets/images/perceptrtx.svg').default}
                  alt="percept"
                  className={classes.logoImage}
                />
              </Grid>
              <Grid item xs={4} sm={2}>
                <img
                  src={
                    require('./../../assets/images/poweredbyawiros.svg').default
                  }
                  alt="percept"
                  className={classes.poweredByAwirosImage}
                />
              </Grid>
            </Grid> */}

            <div className={classes.grow} />

            <div className={classes.buttonsContainer}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={accountMenuId}
                aria-haspopup="true"
                onClick={this.handleAccountMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderAccountMenu}

        {isMobileBrowser ? (
          <>
            <CssBaseline />
            <AppBar
              position="fixed"
              color="primary"
              className={classes.mobileAppBar}
            >
              <Toolbar>
                {/* <Grid container direction="row" justify="space-around">
                  <Grid item>
                    <ButtonBase
                      component={NavLink}
                      exact
                      to={RoutePath.engineList}
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
                </Grid> */}
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
              <div className={classes.toolbar} />
              <Divider />
              <List>
                {/* <NavLink
                  exact
                  to={RoutePath.engineList}
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
                    <ListItemText>Engine List</ListItemText>
                  </ListItem>
                </NavLink> */}
              </List>
            </Drawer>
          </ThemeProvider>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
