import React, { Fragment, useState } from "react";
import {
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Instagram
} from "mdi-material-ui";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { red, indigo, purple, blue } from "@material-ui/core/colors";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  youtube: {
    color: red[800]
  },
  twitter: {
    color: blue[400]
  },
  facebook: {
    color: indigo[800]
  },
  instagram: {
    color: purple[800]
  },
  linkedin: {
    color: blue[800]
  },
  icon: {
    fontSize: 30,
    marginRight: theme.spacing(1),
    alignSelf: "center"
  },
  link: {
    color: theme.palette.text.primary
  }
}));

const SocialIcon = ({ icon: Icon, ...rest }) => {
  return (
    <div>
      <Icon.type {...rest} />
    </div>
  );
};

const SocialIcons = ({ links }) => {
  const classes = useStyles();

  const [hoveredIcon, setHoveredIcon] = useState(null);

  if (!links) {
    return null;
  }

  const socialIcons = [
    {
      to: links.youtube,
      value: "youtube",
      icon: <Youtube />
    },
    {
      to: links.twitter,
      value: "twitter",
      icon: <Twitter />
    },
    {
      to: links.facebook,
      value: "facebook",
      icon: <Facebook />
    },
    {
      to: links.linkedin,
      value: "linkedin",
      icon: <Linkedin />
    },
    {
      to: links.instagram,
      value: "instagram",
      icon: <Instagram />
    }
  ];

  return (
    <Fragment>
      {socialIcons
        .filter(si => si.to) // Filter empty links
        .map((si, i) => (
          <a
            href={si.to}
            className={classes.link}
            rel="noopener noreferrer"
            target="_blank"
            key={si.value}
          >
            <SocialIcon
              icon={si.icon}
              onMouseEnter={() => setHoveredIcon(si.value)}
              onMouseLeave={() => setHoveredIcon(null)}
              className={clsx(classes.icon, {
                [classes[hoveredIcon]]: hoveredIcon === si.value
              })}
            />
          </a>
        ))}
    </Fragment>
  );
};

SocialIcons.propTypes = {
  links: PropTypes.array
};

export default SocialIcons;
