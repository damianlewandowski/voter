import React, { useEffect, useCallback, Fragment } from "react";
import { connect } from "react-redux";
import { getPoll, clearPoll, vote } from "../../actions/polls";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import ArrowBack from "@material-ui/icons/ArrowBackOutlined";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
import RenderRadioGroup from "../field-components/RenderRadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  centerLoader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  },
  title: {
    marginBottom: theme.spacing(4)
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
  }
}));

let Poll = ({
  isLoading,
  poll,
  getPoll,
  match,
  clearPoll,
  handleSubmit,
  vote
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

  console.log(poll);

  return (
    <Grid container alignItems="center" direction="column">
      <Grid container>
        <Button
          className={classes.goBack}
          component={Link}
          to="/"
          variant="contained"
        >
          <ArrowBack />
          Go Back
        </Button>
      </Grid>
      <Typography className={classes.title} variant="h2">
        {poll.title}
      </Typography>

      <Grid className={classes.item} item md={8} xs={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <strong>{po.votes.length}</strong>
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
    </Grid>
  );
};

Poll = reduxForm({
  form: "poll"
})(Poll);

const mapStateToProps = (state, ownProps) => {
  return {
    poll: state.polls.poll,
    isLoading: state.polls.isLoading || !state.polls.poll
  };
};

const mapDispatchToProps = { getPoll, clearPoll, vote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
