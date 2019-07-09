import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Zoom, Tooltip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/EditOutlined";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import BackIcon from "@material-ui/icons/ArrowBackOutlined";
import { getProfile, updateProfile } from "../../actions/profile";
import defaultAvatar from "../../images/default-profile.png";
import { reduxForm, Field } from "redux-form";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import RenderFileInput from "../field-components/RenderFileInput";
import { PROFILE_ERROR } from "../../actions/types";
import ProfileInfo from "./ProfileInfo";

const useStyles = makeStyles(theme => ({
  centerLoader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  },
  avatar: {
    width: 200,
    height: 200,
    background: theme.palette.common.white
  },
  profile: {
    marginTop: theme.spacing(3)
  },
  avatarNameBox: {
    flexGrow: 1,
    position: "relative"
  },
  gridAvatar: {
    marginBottom: theme.spacing(1)
  },
  icon: {
    fontSize: 30,
    marginRight: theme.spacing(1),
    alignSelf: "center"
  },
  fab: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2)
  },
  backFab: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2)
  },
  avatarContainer: {
    position: "relative",
    borderRadius: "50%"
  },
  overlay: {
    position: "absolute",
    left: "50%",
    top: "50%",
    color: "#fff",
    background: "rgba(0,0,0,0.5)",
    zIndex: 201,
    width: "200px",
    height: "200px",
    transform: "translate(-50%,-50%)",
    borderRadius: "50%",
    cursor: "pointer"
  },
  overlayText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  }
}));

let Profile = ({
  isLoading,
  user,
  getProfile,
  profile,
  dispatch,
  handleSubmit,
  updateProfile
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  if (isLoading) {
    return (
      <div className={classes.centerLoader}>
        <CircularProgress />
      </div>
    );
  }

  const onSubmit = async values => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ ...values });

    try {
      const res = await axios.post("/api/profile", body, config);

      updateProfile(res.data);

      dispatch(setAlert("Profile has been succesfully updated", "success"));

      // Go back to Profile view
      handleIsEditClick(isEditable);
    } catch (err) {
      dispatch(setAlert("Something went wrong.", "danger"));
    }
  };

  // Submits image file to the server
  const onFileSubmit = async ({ avatar }) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const res = await axios.post("/api/profile/avatar", formData, config);

      updateProfile(res.data);

      dispatch(
        setAlert("Profile image has been succesfuly changed.", "success")
      );
    } catch (err) {
      console.err(err);

      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data.errors
      });
    }
  };

  const handleIsEditClick = newIsEditable => {
    setIsEditable(!newIsEditable);
  };

  const showAvatarOverlay = () => {
    setIsAvatarHovered(true);
  };

  const hideAvatarOverlay = () => {
    setIsAvatarHovered(false);
  };

  const { email = "noemail@gmail.com", date } = user;
  const {
    name = "Nameless",
    website,
    location,
    avatar,
    bio,
    social,
    position
  } = profile;

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <EditIcon />,
      label: "Edit",
      isEdit: false,
      onClick: () => handleIsEditClick(isEditable)
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <SaveIcon />,
      label: "Save",
      isEdit: true,
      type: "submit"
    },
    {
      color: "secondary",
      className: classes.backFab,
      icon: <BackIcon />,
      label: "Go Back",
      isEdit: true,
      onClick: () => handleIsEditClick(isEditable)
    }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        className={classes.profile}
        container
        spacing={5}
        direction="column"
      >
        <Box
          className={classes.avatarNameBox}
          border={1}
          borderColor="primary.main"
          bgcolor="primary.light"
          color="primary.contrastText"
          p={2}
        >
          {fabs.map((fab, index) => (
            <Zoom
              key={`fab-${index}`}
              in={fab.isEdit === isEditable}
              timeout={500}
            >
              <Tooltip title={fab.label}>
                <Fab
                  className={fab.className}
                  color={fab.color}
                  label={fab.label}
                  onClick={fab.onClick}
                  type={fab.type}
                >
                  {fab.icon}
                </Fab>
              </Tooltip>
            </Zoom>
          ))}

          <Grid className={classes.gridAvatar} container justify="center">
            <div
              className={classes.avatarContainer}
              onMouseEnter={() => showAvatarOverlay()}
              onMouseLeave={() => hideAvatarOverlay()}
            >
              <Field
                component={RenderFileInput}
                name="avatar"
                handleSubmit={handleSubmit}
                onSubmit={onFileSubmit}
                accept="image/*"
              >
                {(isEditable || isAvatarHovered) && (
                  <div className={classes.overlay}>
                    <Typography
                      variant="body2"
                      className={classes.overlayText}
                      align="center"
                    >
                      Click here to change your photo
                    </Typography>
                  </div>
                )}
              </Field>
              <Avatar
                alt="profile-img"
                src={avatar ? avatar : defaultAvatar}
                className={classes.avatar}
              />
            </div>
          </Grid>
          <Grid container justify="center">
            <Typography variant="h3" align="center">
              {name}
            </Typography>
          </Grid>

          {position && (
            <Grid container justify="center">
              <Typography variant="h5" className={classes.name}>
                {position}
              </Typography>
            </Grid>
          )}

          {location && (
            <Grid container justify="center">
              <Typography variant="caption">{location || ""}</Typography>
            </Grid>
          )}
        </Box>

        <ProfileInfo
          email={email}
          date={date}
          website={website}
          bio={bio}
          social={social}
          isEditable={isEditable}
        />
      </Grid>
    </form>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  getProfile: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
  isLoading: state.profile.isLoading || state.auth.isLoading,
  initialValues: state.profile.profile
});

const mapDispatchToProps = {
  getProfile,
  updateProfile
};

Profile = reduxForm({
  form: "profile"
})(Profile);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
