import React, { useState, useEffect, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm, SubmissionError } from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import { extractErrors } from "../../utils/error";
import { setAlert } from "../../actions/alert";
import RenderTextField from "../field-components/RenderTextField";
import { connect } from "react-redux";
import { getPoll, clearPoll } from "../../actions/polls";
import ArrowBack from "@material-ui/icons/ArrowBackOutlined";

const useStyles = makeStyles(theme => ({
  goBack: {
    marginBottom: theme.spacing(2)
  },
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

let EditPoll = ({
  poll,
  getPoll,
  clearPoll,
  match,
  handleSubmit,
  history,
  dispatch
}) => {
  const getPollById = useCallback(() => {
    getPoll(match.params.id);
  }, [getPoll, match.params.id]);

  useEffect(() => {
    getPollById();
    return () => {
      // Set poll property in polls reducer to null
      // to prevent showing old values on routing to multiple polls
      clearPoll();
    };
  }, [clearPoll, getPollById]);

  useEffect(() => {
    function initializeOptions() {
      let opts = [];
      if (poll) {
        opts = poll.options.reduce(
          (acc, next, i) => {
            return [...acc, i + 2];
          },
          [1]
        );
      }

      setOptions(opts);
    }
    initializeOptions();
  }, [poll]);

  const [options, setOptions] = useState([1, 2]);

  const classes = useStyles();

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
      await axios.put(`/api/polls/${poll._id}`, body, config);

      dispatch(setAlert("Poll has been updated succesfully", "success"));

      history.goBack();
    } catch (err) {
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
    <Fragment>
      <Button
        className={classes.goBack}
        onClick={() => history.goBack()}
        variant="contained"
      >
        <ArrowBack />
        Go Back
      </Button>
      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" className={classes.title}>
          Edit Poll
        </Typography>
        <Grid item xs={10}>
          <Field
            className={classes.input}
            component={RenderTextField}
            name="title"
            label="Poll Title"
            margin="normal"
            variant="outlined"
          />
        </Grid>

        {options.map(option => (
          <Grid container alignItems="center" key={`option-${option}`}>
            <Grid item xs={10}>
              <Field
                className={classes.input}
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
            </Grid>
            <Grid item xs={2}>
              <Button
                className={classes.btn}
                color="secondary"
                size="small"
                onClick={() => setOptions(options.filter(o => o !== option))}
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        ))}

        <div>
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

EditPoll.propTypes = {
  poll: PropTypes.object,
  getPoll: PropTypes.func.isRequired,
  clearPolll: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

// Extract title and options after which set proper names to options
const initialValuesSelector = ({ polls: { poll } }) => {
  if (poll) {
    let initialValues = {};

    initialValues = poll.options.reduce((acc, next, i) => {
      return {
        ...acc,
        [`option${i + 1}`]: next.optionName
      };
    }, {});

    initialValues.title = poll.title;

    return initialValues;
  }

  return null;
};

const mapStateToProps = state => {
  return {
    poll: state.polls.poll,
    initialValues: initialValuesSelector(state)
  };
};

const mapDispatchToProps = {
  getPoll,
  clearPoll
};

EditPoll = reduxForm({
  form: "editPoll"
})(EditPoll);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPoll);
