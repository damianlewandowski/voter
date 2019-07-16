import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getPolls, deletePoll } from "../../actions/polls";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Polls from "./Polls";

const useStyles = makeStyles(theme => ({
  centerLoader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  },
  title: {
    marginBottom: theme.spacing(8)
  }
}));

const PublicPolls = ({ isLoading, polls, getPolls, deletePoll }) => {
  const classes = useStyles();

  useEffect(() => {
    getPolls();
  }, [getPolls]);

  if (isLoading) {
    return (
      <div className={classes.centerLoader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Fragment>
      <Typography className={classes.title} variant="h2">
        Public Polls
      </Typography>
      <Polls polls={polls} deletePoll={deletePoll} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  polls: state.polls.polls,
  isLoading: state.polls.isLoading
});

const mapDispatchToProps = { getPolls, deletePoll };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicPolls);
