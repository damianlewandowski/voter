import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Navbar from "../layout/nav/Navbar";
import Alert from "../layout/Alert";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../profile/Profile";
import { makeStyles } from "@material-ui/core";
import NotFound from "../layout/NotFound";
import EditProfile from "../profile/EditProfile";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
}));

const Routes = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Route
        path="/"
        render={({ location, ...rest }) => (
          <Navbar location={location} {...rest} />
        )}
      />
      <Container maxWidth="md" className={classes.container}>
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/profile" component={Profile} /> */}
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Routes;
