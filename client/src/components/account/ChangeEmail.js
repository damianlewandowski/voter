import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, SubmissionError } from "redux-form";
import RenderTextField from "../field-components/RenderTextField";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { extractErrors } from "../../utils/error";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(4)
  }
}));

let ChangeEmail = ({ handleSubmit, dispatch, history }) => {
  const classes = useStyles();

  const onSubmit = async values => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ ...values });
    try {
      await axios.post("/api/users/email", body, config);

      dispatch(setAlert("Email has been succesfully changed.", "success"));

      history.push("/account");
    } catch (err) {
      const { email, email2 } = extractErrors(err.response.data.errors);

      dispatch(setAlert(email || email2, "error"));

      throw new SubmissionError({
        email,
        email2
      });
    }
  };

  return (
    <Fragment>
      <Typography className={classes.title} variant="h2">
        Change Email
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <List>
          <ListItem>
            <Field
              component={RenderTextField}
              name="email"
              label="New Email"
              type="email"
              margin="normal"
              variant="outlined"
              required
              fullWidth
            />
          </ListItem>
          <ListItem>
            <Field
              component={RenderTextField}
              name="email2"
              label="Confirm New Email"
              type="email"
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

ChangeEmail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

ChangeEmail = reduxForm({
  form: "changeEmail"
})(ChangeEmail);

export default ChangeEmail;
