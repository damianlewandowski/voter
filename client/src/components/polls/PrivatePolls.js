import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getPrivatePolls, deletePoll } from "../../actions/polls";
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

const PrivatePolls = ({ isLoading, polls, getPrivatePolls, deletePoll }) => {
  const classes = useStyles();

  useEffect(() => {
    getPrivatePolls();
  }, [getPrivatePolls]);

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
        Your Polls
      </Typography>
      <Polls polls={polls} deletePoll={deletePoll} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  polls: state.polls.privatePolls,
  isLoading: state.polls.isLoading
});

const mapDispatchToProps = { getPrivatePolls, deletePoll };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivatePolls);
