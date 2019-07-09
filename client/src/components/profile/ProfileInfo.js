import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/MailOutlined";
import DescriptionIcon from "@material-ui/icons/DescriptionOutlined";
import DateIcon from "@material-ui/icons/DateRangeOutlined";
import WebsiteIcon from "@material-ui/icons/LanguageOutlined";
import Moment from "react-moment";
import moment from "moment";
import clsx from "clsx";
import EditProfile from "./EditProfile";
import SocialIcons from "./SocialIcons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  box: {
    flexGrow: 1,
    position: "relative"
  },
  icon: {
    fontSize: 30,
    marginRight: theme.spacing(1),
    alignSelf: "center"
  },
  displayNone: {
    height: 0
  }
}));

const ProfileInfo = ({ isEditable, email, date, website, bio, social }) => {
  const classes = useStyles();

  return (
    <Box className={classes.box} border={1} borderColor="primary.main" p={1}>
      <Zoom
        in={!isEditable}
        timeout={300}
        className={classes[clsx({ displayNone: isEditable })]}
      >
        <List>
          {email && (
            <ListItem>
              <MailIcon className={classes.icon} />
              <Typography variant="body1">{email}</Typography>
            </ListItem>
          )}

          {date && (
            <ListItem>
              <DateIcon className={classes.icon} />
              <Typography variant="body1">
                <Moment format="DD/MM/YYYY">
                  {date ? moment.utc(date) : ""}
                </Moment>
              </Typography>
            </ListItem>
          )}

          {website && (
            <ListItem>
              <WebsiteIcon className={classes.icon} />
              <Typography variant="body1">{website}</Typography>
            </ListItem>
          )}

          {bio && (
            <ListItem>
              <DescriptionIcon className={classes.icon} />
              <Typography variant="body1" className={classes.bio}>
                {bio}
              </Typography>
            </ListItem>
          )}

          {social && (
            <ListItem>
              <SocialIcons links={social} />
            </ListItem>
          )}
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
  );
};

ProfileInfo.propTypes = {};

export default ProfileInfo;
