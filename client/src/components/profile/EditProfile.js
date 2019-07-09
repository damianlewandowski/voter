import React from "react";
import { Field } from "redux-form";
import RenderTextField from "../field-components/RenderTextField";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  field: {
    flexGrow: 1,
    marginTop: 0
  },
  list: {
    display: "block",
    width: "100%"
  }
}));

const EditProfile = () => {
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
          autoComplete="off"
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
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="location"
          label="Location"
          type="text"
          margin="normal"
          variant="outlined"
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
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="youtube"
          label="Youtube"
          type="text"
          margin="normal"
          variant="outlined"
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="twitter"
          label="Twitter"
          type="text"
          margin="normal"
          variant="outlined"
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="facebook"
          label="Facebook"
          type="text"
          margin="normal"
          variant="outlined"
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="linkedin"
          label="Linkedin"
          type="text"
          margin="normal"
          variant="outlined"
        />
      </ListItem>
      <ListItem>
        <Field
          className={classes.field}
          component={RenderTextField}
          name="instagram"
          label="Instagram"
          type="text"
          margin="normal"
          variant="outlined"
        />
      </ListItem>
    </List>
  );
};

EditProfile.propTypes = {};

export default EditProfile;
