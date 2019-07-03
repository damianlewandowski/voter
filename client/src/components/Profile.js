import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  centerLoader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  }
}));

const Profile = ({ user, isLoading }) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.centerLoader}>
        <CircularProgress />
      </div>
    );
  }
  const { name, email, date, profileImageUrl, bio } = user;
  return (
    <div>
      <h1>Profile</h1>
      <h4>{name}</h4>
      <p>{email}</p>
      <p>{date}</p>
      <img src={profileImageUrl} alt="profile-img" />
      <p>{bio}</p>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(Profile);
