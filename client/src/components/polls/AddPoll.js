import React, { useState } from "react";
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
  },
  submit: {
    marginTop: theme.spacing(2)
  }
}));

let AddPoll = ({ handleSubmit, pristine, submitting, history, dispatch }) => {
  const classes = useStyles();

  const [options, setOptions] = useState([1, 2]);

  const onSubmit = async values => {
    const optionsObjects = options
      .map(o => {
        return {
          optionName: values[`option${o}`]
        };
      })
      .filter(o => o.optionName); // Remove last empty record

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({
      title: values.title,
      options: optionsObjects
    });

    try {
      await axios.post("/api/polls", body, config);

      dispatch(setAlert("Poll has been added succesfully", "success"));

      history.push("/");
    } catch (err) {
      // Extract specific error messages from an array of object errors
      const { title, options } = extractErrors(err.response.data.errors);
      const errMsg = title || options;
      dispatch(setAlert(errMsg, "error"));

      throw new SubmissionError({
        title,
        option1: options
      });
    }
  };

  const handleFieldChange = optionIndex => () => {
    if (optionIndex === options.length) {
      setOptions([...options, optionIndex + 1]);
    }
  };

  return (
    <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" className={classes.title}>
        Add Poll
      </Typography>
      <Field
        component={RenderTextField}
        name="title"
        label="Poll Title"
        margin="normal"
        variant="outlined"
      />

      {options.map(option => (
        <Field
          key={`option-${option}`}
          component={RenderTextField}
          name={`option${option}`}
          label={`Option ${option}`}
          margin="normal"
          variant="outlined"
          onChange={handleFieldChange(option)}
          helperText={
            option === options.length
              ? "Adding text here will create another option"
              : null
          }
        />
      ))}

      <div>
        <Button
          className={classes.submit}
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

AddPoll.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

AddPoll = reduxForm({
  form: "addPoll"
})(AddPoll);

export default AddPoll;
