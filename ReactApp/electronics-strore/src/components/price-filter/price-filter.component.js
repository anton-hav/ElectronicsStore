import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import "./price-filter.component.css";

/**
 * Formater for displaying price values on the slider.
 * @param {*} value - value of active thumb
 * @returns formated value
 */
function valuetext(value) {
  return `$${value}`;
}

const minDistance = 10;

export default function PriceFilterBar(props) {
  /**
   * Generate "from" and "to" values from price props.
   * @returns array of values.
   */
  const getPriceValuesFromPriceFilter = (actualSliderMaxValue) => {
    let sliderValue = actualSliderMaxValue
      ? actualSliderMaxValue
      : sliderMaxValue;
    let minValue = price?.from ? price.from : 0;
    let maxValue = price?.to ? price.to : sliderValue;

    if (maxValue < minValue + minDistance) {
      minValue = maxValue - minDistance;
    }

    return [minValue, maxValue];
  };

  /**
   * Generate maximum value for the slider from max price props.
   * @returns a number.
   */
  const getSliderMaxValueFromMaxPrice = () => {
    let result = Math.max(minDistance, Math.ceil(maxPrice));
    return result;
  };

  const { price, maxPrice, onPriceChange } = props;
  const [sliderMaxValue, setSliderMaxValue] = useState(
    getSliderMaxValueFromMaxPrice
  );

  const [value, setValue] = useState(getPriceValuesFromPriceFilter);
  const [textFieldValueTo, setTextFieldValueTo] = useState(
    value[1] ? value[1] : 0
  );

  /**
   * Handles changes in the price or the max price props values.
   */
  useEffect(() => {
    let newSliderMaxValue = getSliderMaxValueFromMaxPrice();
    setSliderMaxValue(newSliderMaxValue);

    let newValues = getPriceValuesFromPriceFilter(newSliderMaxValue);
    setValue(newValues);
    setTextFieldValueTo(newValues[1]);
  }, [price, maxPrice]);

  /**
   * Calls the parent event handler onPriceChange.
   */
  useEffect(() => {
    onPriceChange(value[0], value[1]);
  }, [value]);

  /**
   *
   * @param {*} event - React event
   * @param {*} newValue - Array of new values from the slider
   * @param {*} activeThumb - the number of active thumb (0 for left thumb, 1 for right thumb)
   */
  const handleChange = (event, newValue, activeThumb) => {
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
    if (newValue >= 0) {
      setTextFieldValueTo(newValue);
    }
    if (newValue > sliderMaxValue) newValue = sliderMaxValue;

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
      <Typography variant="h7" component="div">
        Price
      </Typography>
      <Divider variant="middle" />
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
                max: sliderMaxValue,
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
          max={sliderMaxValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          valueLabelFormat={valuetext}
          disableSwap
        />
      </Box>
    </Box>
  );
}
