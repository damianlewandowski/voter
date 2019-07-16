import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/EditOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { deletePoll } from "../../actions/polls";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.h5.fontSize
    }
  },
  linkContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  list: {
    width: "100%"
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}));

const mobileMenuId = "editDeleteMobileMenu";

const Polls = ({ polls, deletePoll }) => {
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const handleDelete = id => {
    handleMobileMenuClose();
    deletePoll(id);
  };

  return (
    <Grid container justify="center">
      <List className={classes.list}>
        {polls.map(p => (
          <ListItem key={p._id} divider>
            <Grid container justify="space-between">
              <Grid className={classes.linkContainer} item xs={9}>
                <Typography
                  className={classes.link}
                  component={Link}
                  to={`/polls/${p._id}`}
                  variant="h3"
                  noWrap
                >
                  {p.title}
                </Typography>
              </Grid>

              {p.isYours && (
                <Fragment>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="Show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                  <Menu
                    id="simple-menu"
                    anchorEl={mobileMoreAnchorEl}
                    keepMounted
                    open={Boolean(mobileMoreAnchorEl)}
                    onClose={handleMobileMenuClose}
                  >
                    <MenuItem
                      onClick={handleMobileMenuClose}
                      component={Link}
                      to={`/polls/${p._id}/edit`}
                    >
                      <EditIcon className={classes.leftIcon} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(p._id)}>
                      <DeleteIcon className={classes.leftIcon} />
                      Delete
                    </MenuItem>
                  </Menu>
                  <Grid className={classes.sectionDesktop} item xs={3}>
                    {p.isYours && (
                      <Fragment>
                        <Button>
                          <EditIcon />
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => deletePoll(p._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Fragment>
                    )}
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

Polls.propTypes = {
  polls: PropTypes.array.isRequired,
  deletePoll: PropTypes.func.isRequired
};

export default Polls;
