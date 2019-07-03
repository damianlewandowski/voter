import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { GooglePlusBox, GithubBox } from "mdi-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { deepOrange, blueGrey } from "@material-ui/core/colors";
import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../../actions/types";
import RenderTextField from "./RenderTextField";
import { setAlert } from "../../actions/alert";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto"
  },
  oauth: {
    marginBottom: theme.spacing(4)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  googleButton: {
    marginRight: theme.spacing(1),
    background: deepOrange[800],
    "&:hover": {
      background: deepOrange[900]
    }
  },
  githubButton: {
    marginRight: theme.spacing(1),
    background: blueGrey[800],
    "&:hover": {
      background: blueGrey[900]
    }
  }
}));

const Login = ({ handleSubmit, pristine, submitting, history, dispatch }) => {
  const classes = useStyles();

  const handleGithubSignIn = async () => {
    window.open("http://localhost:5000/api/auth/github", "_self");
  };

  const handleLocalSingIn = async ({ email, password }) => {
    const body = { email, password };
    try {
      const res = await axios.post("/api/auth/local", body);
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert("You've succesfully logged in.", "success"));
      history.push("/profile");
    } catch (err) {
      console.dir(err);
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.response.data
      });
      dispatch(setAlert("Login failed.", "error", 3000));
    }
  };

  const handleGoogleSignIn = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (
    <Fragment>
      <h1>Login</h1>

      <div className={classes.oauth}>
        <h3>Connect with a social network</h3>
        <Button
          className={classes.googleButton}
          variant="contained"
          color="primary"
          onClick={handleGoogleSignIn}
        >
          <GooglePlusBox className={classes.leftIcon} />
          Google
        </Button>
        <Button
          onClick={handleGithubSignIn}
          className={classes.githubButton}
          variant="contained"
          color="secondary"
        >
          <GithubBox className={classes.leftIcon} />
          Github
        </Button>
      </div>
      <form
        className={classes.container}
        onSubmit={handleSubmit(handleLocalSingIn)}
      >
        <Field
          component={RenderTextField}
          name="email"
          label="Email"
          type="email"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          required
        />
        <Field
          component={RenderTextField}
          name="password"
          label="Password"
          type="password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          required
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
    </Fragment>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default reduxForm({
  form: "login"
})(Login);
