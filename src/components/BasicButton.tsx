import * as React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const BasicButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" onClick={props.onClick}>
      {props.label}
    </Button>
  );
};

export default BasicButton;
