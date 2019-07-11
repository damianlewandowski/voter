import React from "react";
import { RadioGroup } from "@material-ui/core";

const RenderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
  />
);

export default RenderRadioGroup;
