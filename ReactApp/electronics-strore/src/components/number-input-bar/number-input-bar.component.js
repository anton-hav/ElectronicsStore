import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./number-input-bar.component.css";

export default function NumberInputBar(props) {
  const [value, setValue] = useState(0);

  /**
   * Handles the increase button click.
   */
  const handleIncreaseClick = () => {
    if (value < 999) {
      setValue((prevValue) => prevValue + 1);
    }
  };

  /**
   * Handles the decrease button click.
   */
  const handleDecreaseClick = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  /**
   * Handles the input value change.
   * @param {*} event - React event
   */
  const handleChange = (event) => {
    let newValue = Number(event.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <Box className="number-input-wrapper">
      <Paper className="paper">
        <IconButton
          type="button"
          className="action-button"
          aria-label="decrease"
          onClick={handleDecreaseClick}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Divider className="divider" orientation="vertical" />
        <InputBase
          className="input-number"
          value={value}
          onChange={handleChange}
          type="numeric"
          inputProps={{
            "aria-label": "input value",
            className: "input",
            maxlength: 3,
          }}
        />
        <Divider className="divider" orientation="vertical" />
        <IconButton
          type="button"
          className="action-button"
          aria-label="increase"
          onClick={handleIncreaseClick}
        >
          <ChevronRightIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
