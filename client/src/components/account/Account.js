import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down("md")]: {
      alignItems: "center"
    }
  },
  title: {
    marginBottom: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      spacing={2}
    >
      <Typography className={classes.title} variant="h2">
        Account
      </Typography>
      <Grid item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/account/change-password"
        >
          Change Password
        </Button>
      </Grid>

      <Grid item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/account/change-email"
        >
          Change Email
        </Button>
      </Grid>
    </Grid>
  );
};

export default Account;
