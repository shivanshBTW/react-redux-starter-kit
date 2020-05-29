import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const styles = theme => {
   console.log(theme);
   return (
      {
         root: {
            margin: theme.spacing(0)
         }
      }
   )
}

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