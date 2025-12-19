import { useState, useImperativeHandle } from "react";
import {
  Button,
} from "@mui/material"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggle = () => {
    setVisible(!visible);
  };

  useImperativeHandle(props.ref, () => {
    return { toggle };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggle}>
          {props.buttonText}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="primary"
          onClick={toggle}>
            cancel
        </Button>
      </div>
    </div>
  );
};
export default Togglable;
