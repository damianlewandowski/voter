import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  file: {
    display: "none"
  }
}));

// Submits form on every file input change
const RenderFileInput = ({
  handleSubmit,
  input: { onChange },
  label,
  children,
  onSubmit,
  ...rest
}) => {
  const classes = useStyles();

  const handleChange = e => {
    onChange(e.target.files[0]);

    // redux-form doesn't allow for calling submit synchronously, nor currently there is any other way of doing it.
    // If there is no timeout onSubmit function runs with old state of values (There won't be fileInput field in form state)
    setTimeout(handleSubmit(onSubmit), 500);
  };

  return (
    <div>
      <label htmlFor="file-input">{children}</label>
      <input
        className={classes.file}
        id="file-input"
        type="file"
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

RenderFileInput.propTypes = {};

export default RenderFileInput;
