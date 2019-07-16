import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileMenu = ({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
  logout
}) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
      Profile
    </MenuItem>
    <MenuItem onClick={handleMenuClose} component={Link} to="/account">
      My account
    </MenuItem>
    <MenuItem onClick={handleMenuClose} component={Link} to="/private-polls">
      My polls
    </MenuItem>
    <MenuItem onClick={logout}>Logout</MenuItem>
  </Menu>
);

ProfileMenu.propTypes = {
  anchorEl: PropTypes.object,
  menuId: PropTypes.string.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default ProfileMenu;
