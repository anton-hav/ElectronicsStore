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
  const { count, onChangeCount } = props;
  const [value, setValue] = useState(() => (count ? count : 0));

  /**
   * Handles the increase button click.
   */
  const handleIncreaseClick = () => {
    if (value < 999) {
      let newValue = value + 1;
      setValue(newValue);
      onChangeCount(newValue);
    }
  };

  /**
   * Handles the decrease button click.
   */
  const handleDecreaseClick = () => {
    if (value > 1) {
      let newValue = value - 1;
      setValue(newValue);
      onChangeCount(newValue);
    }
  };

  /**
   * Handles the input value change.
   * @param {*} event - React event
   */
  const handleChange = (event) => {
    let newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue !== 0) {
      setValue(newValue);
      onChangeCount(newValue);
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
            maxLength: 3,
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
