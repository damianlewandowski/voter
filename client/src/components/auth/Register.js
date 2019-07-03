import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Field, reduxForm, SubmissionError } from "redux-form";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { extractErrors } from "../../utils/error";
import { setAlert } from "../../actions/alert";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto"
  }
}));

const renderTextField = ({
  input,
  label,
  meta: { error, warning },
  ...rest
}) => {
  return (
    <TextField
      {...input}
      label={label}
      error={!!error}
      helperText={error}
      warning={warning}
      {...rest}
    />
  );
};

let Register = ({ handleSubmit, pristine, submitting, history, dispatch }) => {
  const classes = useStyles();

  const onSubmit = async values => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ ...values });

    try {
      await axios.post("/api/users", body, config);

      dispatch(setAlert("Registration has been succesful", "success"));

      history.push("/");
    } catch (err) {
      // Extract specific error messages from an array of object errors
      const { name, email, password, password2, bio } = extractErrors(
        err.response.data.errors
      );

      dispatch(setAlert("Registration has not been succesful", "error"));

      throw new SubmissionError({
        name,
        email,
        password,
        password2,
        bio
      });
    }
  };

  return (
    <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <Field
        component={renderTextField}
        name="name"
        label="Name"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <Field
        component={renderTextField}
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        type="email"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <Field
        component={renderTextField}
        name="password"
        label="Password"
        type="password"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <Field
        component={renderTextField}
        name="password2"
        label="Password Confirmation"
        type="password"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <Field
        component={renderTextField}
        name="bio"
        label="Bio"
        placeholder="Say something about yourself"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={pristine || submitting}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

Register = reduxForm({
  form: "register"
})(Register);

export default Register;