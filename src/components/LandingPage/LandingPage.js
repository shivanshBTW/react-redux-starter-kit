import React, {Component} from 'react';

import LandingPageStyles from "./LandingPageStyles";
import withStyles from "@material-ui/core/styles/withStyles";

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