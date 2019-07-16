import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const RenderTextField = ({
  input,
  label,
  meta: { error, warning },
  ...rest
}) => {
  return (
    <TextField
      {...input}
      label={label}
      error={!!error}
      helperText={error}
      warning={warning}
      {...rest}
      fullWidth
    />
  );
};

RenderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default RenderTextField;
