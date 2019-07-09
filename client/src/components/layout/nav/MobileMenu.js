import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import PropTypes from "prop-types";

const MobileMenu = ({
  mobileMenuId,
  mobileMoreAnchor,
  isMobileMenuOpen,
  handleMobileMenuClose,
  links
}) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchor}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {links.map(link => (
        <MenuItem
          key={`MobileMenu-${link.text}`}
          onClick={link.onClick}
          component={link.to && Link}
          to={link.to}
        >
          <IconButton
            aria-label={link.ariaLabel}
            aria-controls={link.ariaControls}
            aria-haspopup={link.ariaHasPopup}
            color="inherit"
          >
            {link.badge && (
              <Badge badgeContent={link.badge.content} color={link.badge.color}>
                {link.badge.icon}
              </Badge>
            )}
            {link.icon}
          </IconButton>
          <p>{link.text}</p>
        </MenuItem>
      ))}
    </Menu>
  );
};

MobileMenu.propTypes = {
  mobileMenuId: PropTypes.string.isRequired,
  mobileMoreAnchor: PropTypes.object,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  handleMobileMenuClose: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired
};

export default MobileMenu;
