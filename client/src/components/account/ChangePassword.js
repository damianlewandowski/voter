import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, SubmissionError } from "redux-form";
import RenderTextField from "../field-components/RenderTextField";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { extractErrors } from "../../utils/error";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "60%"
    }
  },
  title: {
    marginBottom: theme.spacing(4)
  }
}));

let ChangePassword = ({ handleSubmit, dispatch, history }) => {
  const classes = useStyles();

  const onSubmit = async values => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ ...values });
    try {
      await axios.post("/api/users/password", body, config);

      dispatch(setAlert("Password has been succesfully changed.", "success"));

      history.push("/account");
    } catch (err) {
      const { password, password2 } = extractErrors(err.response.data.errors);

      dispatch(setAlert(password || password2, "error"));

      throw new SubmissionError({
        password,
        password2
      });
    }
  };

  return (
    <Fragment>
      <Typography className={classes.title} variant="h2">
        Change Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <List>
          <ListItem>
            <Field
              component={RenderTextField}
              name="password"
              label="New Password"
              type="password"
              margin="normal"
              variant="outlined"
              required
              fullWidth
            />
          </ListItem>
          <ListItem>
            <Field
              component={RenderTextField}
              name="password2"
              label="Confirm Password"
              type="password"
              margin="normal"
              variant="outlined"
              required
              fullWidth
            />
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </ListItem>
        </List>
      </form>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

ChangePassword = reduxForm({
  form: "changePassword"
})(ChangePassword);

export default ChangePassword;
