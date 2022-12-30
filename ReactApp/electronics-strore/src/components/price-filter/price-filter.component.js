import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";

import "./price-filter.component.css";

function valuetext(value) {
  return `${value}U`;
}

const minDistance = 10;

export default function PriceFilterBar(props) {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [value, setValue] = useState([0, maxPrice]);
  const [textFieldValueTo, setTextFieldValueTo] = useState(
    value[1] ? value[1] : 0
  );

  /**
   *
   * @param {*} event - React event
   * @param {*} newValue - Array of new values from the slider
   * @param {*} activeThumb - the number of active thumb (0 for left thumb, 1 for right thumb)
   */
  const handleChange = (event, newValue, activeThumb) => {
    // if (!Array.isArray(newValue)) {
    //   return;
    // }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      setTextFieldValueTo(Math.max(newValue[1], value[0] + minDistance));
    }
  };

  /**
   * Handles change in value of "Price from" input field.
   * @param {*} event - Reat event
   */
  const handleChangeTextFieldFrom = (event) => {
    let valueFromEvent = event.target.value;
    let newValue = Math.min(valueFromEvent, value[1] - minDistance);
    setValue([newValue, value[1]]);
  };

  /**
   * Handles change in value of "Price to" input field.
   * @param {*} event - React event
   */
  const handleChangeTextFieldTo = (event) => {
    let newValue = event.target.value;
    setTextFieldValueTo(newValue);
    setValue([value[0], Math.max(newValue, value[0] + minDistance)]);
  };

  /**
   * Handles on blur event for "Price to" input field.
   * @param {*} event - React event
   */
  const handleOnBlurTextFieldTo = (event) => {
    setTextFieldValueTo(value[1]);
  };

  return (
    <Box className="price-filter-wrapper">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Box className="input-field-wrapper">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="input-from">From</InputLabel>
            <MuiInput
              id="input-from"
              value={value[0]}
              size="small"
              fullWidth
              inputProps={{
                step: 1,
                min: 0,
                max: value[1] ? value[1] : null,
                type: "number",
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={handleChangeTextFieldFrom}
            />
          </FormControl>
        </Box>
        <Box className="input-field-wrapper">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="input-to">To</InputLabel>
            <MuiInput
              id="input-to"
              value={textFieldValueTo}
              size="small"
              fullWidth
              inputProps={{
                step: 1,
                min: value[0] ? value[0] : null,
                max: maxPrice,
                type: "number",
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={handleChangeTextFieldTo}
              onBlur={handleOnBlurTextFieldTo}
            />
          </FormControl>
        </Box>
      </Box>

      <Box className="slider-wrapper">
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value}
          min={0}
          max={maxPrice}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
    </Box>
  );
}
