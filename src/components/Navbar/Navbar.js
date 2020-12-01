import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarStyles from "./NavbarStyles";
import withStyles from "@material-ui/core/styles/withStyles";

const style = NavbarStyles

function Navbar(props) {
   const {classes} = props;

   return (
      <div className={classes.root}>
         <AppBar position="static" >
            <Toolbar variant={'dense'}>
               <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon/>
               </IconButton>
               <Typography variant="h6" className={classes.title}>
                  React Redux Material-UI Starter Code by <a href="https://www.github.com/shivanshBTW" style={{textDecoration:'none','&::hover':{textDecoration:'underline'}}}>@shivanshBTW</a>
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
      </div>
   );
}

export default withStyles(style)(Navbar)