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
import Account from "../account/Account";
import ChangeEmail from "../account/ChangeEmail";
import ChangePassword from "../account/ChangePassword";
import AddPoll from "../polls/AddPoll";
import Poll from "../polls/Poll";
import PublicPolls from "../polls/PublicPolls";
import PrivatePolls from "../polls/PrivatePolls";
import EditPoll from "../polls/EditPoll";

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
          <Route exact path="/" component={PublicPolls} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/polls" component={PublicPolls} />
          <Route exact path="/polls/:id" component={Poll} />
          <ProtectedRoute exact path="/add-poll" component={AddPoll} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute
            exact
            path="/private-polls"
            component={PrivatePolls}
          />
          <ProtectedRoute exact path="/polls/:id/edit" component={EditPoll} />
          <ProtectedRoute
            exact
            path="/account/change-password"
            component={ChangePassword}
          />
          <ProtectedRoute
            exact
            path="/account/change-email"
            component={ChangeEmail}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Routes;
