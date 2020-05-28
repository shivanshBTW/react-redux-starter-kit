import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Navbar from "../Navbar/Navbar";
import Typography from "@material-ui/core/Typography";

let styles = theme => ({
   root: {
      margin: theme.spacing(0)
   }
});

class LandingPage extends Component {
   render() {
      let {classes} = this.props;
      return (
         <div className={classes.root}>
            <Typography>LandingPage</Typography>
         </div>
      );
   }
}

export default withStyles(styles)(LandingPage);