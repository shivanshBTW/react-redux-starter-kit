import {
  AppBar,
  ClickAwayListener,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';

import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarAppBarStyles from './NavbarAppBarStyles';
import NavbarConfig from '../NavbarConfig';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';

let styles = NavbarAppBarStyles;

class NavbarAppBar extends Component {
  defaultProps = {
    drawerOpen: false,
    handleDrawerToggle: () => null,
  };
  constructor(props) {
    super(props);
    this.state = {
      accountMenuAnchorEl: null,
    };
  }

  setAccountMenuAnchorEl = (accountMenuAnchorEl) => {
    this.setState({ accountMenuAnchorEl });
  };

  handleAccountMenuOpen = (event) => {
    this.setAccountMenuAnchorEl(event.currentTarget);
  };

  handleAccountMenuClose = () => {
    this.setAccountMenuAnchorEl(null);
  };

  render() {
    let { classes, width, handleDrawerToggle } = this.props;
    let { accountMenuAnchorEl } = this.state;

    const isMobileBrowser = width === 'xs';

    const accountMenuId = 'account-menu';
    const isAccountMenuOpen = Boolean(accountMenuAnchorEl);
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

    const { appBarVariant } = NavbarConfig;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar)}
          color={'primary'}
          //  color={'default'}
        >
          <Toolbar variant={appBarVariant}>
            {isMobileBrowser ? null : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
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
                  // textDecoration: 'none',
                  color: 'white',
                  // '&::hover': { textDecoration: 'underline' },
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
      </div>
    );
  }
}

export default withStyles(styles)(NavbarAppBar);
