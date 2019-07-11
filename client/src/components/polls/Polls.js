import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPolls } from "../../actions/polls";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  centerLoader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  }
}));

const Polls = ({ isLoading, polls, getPolls }) => {
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
    <Grid container justify="center">
      <List>
        {polls.map(p => (
          <ListItem key={p._id} component={Link} to={`/polls/${p._id}`}>
            <Typography variant="h2">{p.title}</Typography>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const mapStateToProps = state => ({
  polls: state.polls.polls,
  isLoading: state.polls.isLoading
});

const mapDispatchToProps = { getPolls };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Polls);
