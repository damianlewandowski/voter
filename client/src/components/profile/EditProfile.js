import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import RenderTextField from "../auth/RenderTextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, List, ListItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  field: {
    flexGrow: 1
  },
  list: {
    display: "block",
    width: "100%"
  }
}));

const EditProfile = props => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="name"
          label="Name"
          type="text"
          margin="normal"
          variant="outlined"
          required
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="position"
          label="Position"
          type="text"
          margin="normal"
          variant="outlined"
          required
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="email"
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
          required
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="bio"
          label="Bio"
          type="text"
          margin="normal"
          variant="outlined"
          required
        />
      </ListItem>
    </List>
  );
};

EditProfile.propTypes = {};

export default reduxForm({
  form: "editProfile"
})(EditProfile);
