import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PlusIcon from "@material-ui/icons/AddCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import VoteIcon from "@material-ui/icons/HowToVote";
import { ExitToApp } from "mdi-material-ui";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import { logout } from "../../../actions/auth";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textDecoration: "none",
    marginRight: theme.spacing(2)
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function Navbar({ isAuthenticated, logout, history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const profileMenuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const authLinks = [
    {
      ariaLabel: "Show 4 new mails",
      badge: {
        content: 4,
        color: "secondary",
        icon: <MailIcon />
      },
      text: "Messages",
      to: "/messages",
      onClick: handleMobileMenuClose
    },
    {
      ariaLabel: "Show 17 new notifications",
      badge: {
        content: 17,
        color: "secondary",
        icon: <NotificationsIcon />
      },
      text: "Notifications",
      to: "/notifications",
      onClick: handleMobileMenuClose
    },
    {
      to: "/add-poll",
      text: "Add Poll",
      icon: <PlusIcon />,
      onClick: handleMobileMenuClose
    },
    {
      to: "/polls",
      text: "Polls",
      icon: <VoteIcon />,
      onClick: handleMobileMenuClose
    },
    {
      ariaLabel: "Account of current user",
      icon: <AccountCircle />,
      edge: "end",
      ariaControls: profileMenuId,
      ariaHasPopup: "true",
      onClick: handleProfileMenuOpen,
      text: "Profile"
    }
  ];

  const renderAuthLinks = (
    <div>
      {authLinks.map((authLink, i) => (
        <IconButton
          key={`Nav-auth-link-${i}`}
          edge={authLink.edge}
          aria-label={authLink.ariaLabel}
          aria-controls={authLink.ariaControls}
          aria-haspopup={authLink.ariaHasPopup}
          onClick={authLink.onClick}
          color="inherit"
          component={authLink.to ? Link : IconButton}
          to={authLink.to}
        >
          {authLink.badge && (
            <Badge
              badgeContent={authLink.badge.content}
              color={authLink.badge.color}
            >
              {authLink.badge.icon}
            </Badge>
          )}
          {authLink.icon}
        </IconButton>
      ))}
    </div>
  );

  const guestLinks = [
    {
      to: "/polls",
      text: "Polls",
      icon: <VoteIcon />,
      onClick: handleMobileMenuClose
    },
    {
      to: "/login",
      text: "Login",
      icon: <ExitToApp />,
      onClick: handleMobileMenuClose
    },
    {
      to: "/register",
      text: "Register",
      icon: <AccountCircle />,
      onClick: handleMobileMenuClose
    }
  ];

  const renderGuestLinks = (
    <div>
      {guestLinks.map(guestLink => (
        <Button
          key={guestLink.to}
          color="inherit"
          component={Link}
          to={guestLink.to}
          size="large"
        >
          {guestLink.text}
        </Button>
      ))}
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.brand}
            color="inherit"
            component={Link}
            to="/"
            noWrap
          >
            Voting App
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated ? renderAuthLinks : renderGuestLinks}
          </div>
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
        </Toolbar>
      </AppBar>
      <MobileMenu
        mobileMenuId={mobileMenuId}
        mobileMoreAnchor={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        links={isAuthenticated ? authLinks : guestLinks}
      />
      <ProfileMenu
        anchorEl={anchorEl}
        menuId={profileMenuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        logout={() => {
          logout();
          handleMenuClose();
          history.push("/");
        }}
      />
    </div>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
