import React, { useEffect, useCallback, Fragment } from "react";
import { connect } from "react-redux";
import { getPoll, clearPoll, vote, deletePoll } from "../../actions/polls";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import ArrowBack from "@material-ui/icons/ArrowBackOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
import RenderRadioGroup from "../field-components/RenderRadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PollChart from "./PollChart";

const useStyles = makeStyles(theme => ({
  centerLoader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  },
  title: {
    marginBottom: theme.spacing(8)
  },
  item: {
    width: "100%"
  },
  box: {
    marginBottom: theme.spacing(2),
    width: "100%"
  },
  formControl: {
    width: "100%"
  },
  goBack: {
    marginBottom: theme.spacing(2)
  },
  formContainer: {
    display: "flex",
    alignItems: "center"
  },
  form: {
    flexGrow: 1
  }
}));

let Poll = ({
  isLoading,
  poll,
  match,
  vote,
  auth,
  getPoll,
  clearPoll,
  handleSubmit,
  deletePoll,
  history
}) => {
  const classes = useStyles();

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

  if (isLoading) {
    return (
      <div className={classes.centerLoader}>
        <CircularProgress />
      </div>
    );
  }

  const onSubmit = option => {
    vote(poll._id, option.optionName);
  };

  return (
    <Grid container alignItems="center" direction="column">
      <Grid container justify="space-between">
        <Button
          className={classes.goBack}
          component={Link}
          to="/"
          variant="contained"
        >
          <ArrowBack />
          Go Back
        </Button>
        {auth.isAuthenticated && auth.user._id === poll.owner && (
          <Button
            className={classes.goBack}
            variant="contained"
            color="secondary"
            onClick={() => deletePoll(poll._id, history)}
          >
            <DeleteIcon />
            remove this poll
          </Button>
        )}
      </Grid>
      <Typography className={classes.title} variant="h2">
        {poll.title}
      </Typography>

      <Grid className={classes.item} item md={12}>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={12} md={6} className={classes.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <FormControl component="fieldset" className={classes.formControl}>
                <Box
                  className={classes.box}
                  border={1}
                  borderColor="primary.main"
                  borderRadius={5}
                  p={2}
                >
                  <Field name="optionName" component={RenderRadioGroup}>
                    {poll.options.map(po => (
                      <Fragment key={`optionName-${po.optionName}`}>
                        <FormControlLabel
                          value={po.optionName}
                          label={po.optionName}
                          control={<Radio />}
                        />
                      </Fragment>
                    ))}
                  </Field>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Vote
                </Button>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} md={5}>
            <PollChart poll={poll} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Poll = reduxForm({
  form: "poll"
})(Poll);

const mapStateToProps = (state, ownProps) => {
  return {
    poll: state.polls.poll,
    isLoading: state.polls.isLoading || !state.polls.poll,
    auth: state.auth
  };
};

const mapDispatchToProps = { getPoll, clearPoll, vote, deletePoll };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
