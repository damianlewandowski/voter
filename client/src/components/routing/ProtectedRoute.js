import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !isLoading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(ProtectedRoute);
