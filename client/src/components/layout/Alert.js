import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import Snackbar from "@material-ui/core/Snackbar";
import { amber, green } from "@material-ui/core/colors";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core";
import { removeAlert } from "../../actions/alert";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(7)
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper({
  variant,
  message,
  onClose,
  className,
  ...other
}) {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

const Alert = ({ alerts, removeAlert }) => {
  const classes = useStyles();

  if (alerts && alerts.length) {
    return (
      <div>
        {alerts.map(alert => (
          <Snackbar
            className={classes.root}
            open={true}
            key={alert.id}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MySnackbarContentWrapper
              variant={alert.alertType}
              message={alert.msg}
              key={alert.id}
              onClose={() => removeAlert(alert.id)}
            />
          </Snackbar>
        ))}
      </div>
    );
  }

  return null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

const mapDispatchToProps = {
  removeAlert
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert);
