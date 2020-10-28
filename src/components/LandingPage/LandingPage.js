import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import LandingPageStyles from "./LandingPageStyles";

let styles = LandingPageStyles;

class LandingPage extends Component {
   render() {
      let {classes} = this.props;
      return (
         <div className={classes.root}>
            LandingPage
         </div>
      );
   }
}

export default withStyles(styles)(LandingPage);