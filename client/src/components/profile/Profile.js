import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, List, ListItem, Zoom } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import MailIcon from "@material-ui/icons/MailOutlined";
import DescriptionIcon from "@material-ui/icons/DescriptionOutlined";
import DateIcon from "@material-ui/icons/DateRangeOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import Moment from "react-moment";
import moment from "moment";
import clsx from "clsx";
import EditProfile from "./EditProfile";

const useStyles = makeStyles(theme => ({
  centerLoader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  },
  avatar: {
    width: 200,
    height: 200
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
  avatarContainer: {
    position: "relative",
    cursor: "pointer"
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
    borderRadius: "50%"
  },
  overlayText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  },
  displayNone: {
    display: "none"
  }
}));

const Profile = ({ user, isLoading }) => {
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

  const handleValueChange = newIsEditable => {
    setIsEditable(!newIsEditable);
  };

  const showAvatarOverlay = () => {
    setIsAvatarHovered(true);
  };

  const hideAvatarOverlay = () => {
    setIsAvatarHovered(false);
  };

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <EditIcon />,
      label: "Add",
      isEdit: false
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <SaveIcon />,
      label: "Save",
      isEdit: true
    }
  ];

  const transitionStyles = {
    entering: { background: "blue" },
    entered: { background: "red" },
    exiting: { background: "green" },
    exited: { background: "orange" }
  };

  const defaultStyle = {
    background: "pink"
  };

  // const { name, email, date, profileImageUrl, bio } = user;
  return (
    <Fragment>
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
              <Fab
                className={classes.fab}
                color={fab.color}
                label={fab.label}
                onClick={() => handleValueChange(fab.isEdit)}
              >
                {fab.icon}
              </Fab>
            </Zoom>
          ))}

          <Grid className={classes.gridAvatar} container justify="center">
            <div
              className={classes.avatarContainer}
              onMouseEnter={() => showAvatarOverlay()}
              onMouseLeave={() => hideAvatarOverlay()}
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
              <Avatar
                alt="profile-img"
                src="https://avatars1.githubusercontent.com/u/17913606?s=400&u=fc14258392276891979c9dbdd68d8db7867f580b&v=4"
                className={classes.avatar}
              />
            </div>
          </Grid>
          <Grid container justify="center">
            <Typography variant="h3" align="center">
              Damian Lewandowski
            </Typography>
          </Grid>
          <Grid container justify="center">
            <Typography variant="h5" className={classes.name}>
              Fullstack Developer
            </Typography>
          </Grid>
        </Box>

        <Box
          className={classes.avatarNameBox}
          border={1}
          borderColor="primary.main"
          p={1}
        >
          <Zoom
            in={!isEditable}
            timeout={300}
            className={classes[clsx({ displayNone: isEditable })]}
          >
            <List>
              <ListItem>
                <MailIcon className={classes.icon} />
                <Typography variant="body1">
                  damian20lewandowski@gmail.com
                </Typography>
              </ListItem>
              <ListItem>
                <DateIcon className={classes.icon} />
                <Typography variant="body1">
                  <Moment format="DD/MM/YYYY">
                    {moment.utc("2019-07-03T13:18:54.631Z")}
                  </Moment>
                </Typography>
              </ListItem>
              <ListItem>
                <DescriptionIcon className={classes.icon} />
                <Typography variant="body1" className={classes.bio}>
                  Just another guy who is passionate about javascript and web
                  development.
                </Typography>
              </ListItem>
            </List>
          </Zoom>

          <Zoom
            in={isEditable}
            timeout={300}
            className={classes[clsx({ displayNone: !isEditable })]}
          >
            <div>
              <EditProfile />
            </div>
          </Zoom>
        </Box>
      </Grid>
    </Fragment>
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
