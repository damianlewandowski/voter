import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm, SubmissionError } from "redux-form";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { extractErrors } from "../../utils/error";
import { setAlert } from "../../actions/alert";
import RenderTextField from "../field-components/RenderTextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto"
  },
  title: {
    marginBottom: theme.spacing(4)
  }
}));

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
      <Typography variant="h3" className={classes.title}>
        Register
      </Typography>
      <Field
        component={RenderTextField}
        name="name"
        label="Name"
        margin="normal"
        variant="outlined"
      />
      <Field
        component={RenderTextField}
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        type="email"
        margin="normal"
        variant="outlined"
      />
      <Field
        component={RenderTextField}
        name="password"
        label="Password"
        type="password"
        margin="normal"
        variant="outlined"
      />
      <Field
        component={RenderTextField}
        name="password2"
        label="Password Confirmation"
        type="password"
        margin="normal"
        variant="outlined"
      />
      <Field
        component={RenderTextField}
        name="bio"
        label="Bio"
        placeholder="Say something about yourself"
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
