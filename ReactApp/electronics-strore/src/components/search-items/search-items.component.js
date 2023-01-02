import React, { useState } from "react";
import Box from "@mui/material/Box";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

import "./search-items.component.css";

export default function SearchItemsBar(props) {
  const { onChangeSearchValue } = props;
  const [currentQueryString, setCurrentQueryString] = useState();

  /**
   * Handles changes to the search input field.
   * @param {*} event - React event
   */
  const handleQueryStringChange = (event) => {
    let queryString = event.target.value;
    setCurrentQueryString(queryString);
  };

  /**
   * Handles the key down event on the search input field.
   * @param {*} event - React event
   */
  const handleKeyDown = (event) => {
    // The Enter key has a key code of 13.
    if (event.keyCode === 13) {
      onChangeSearchValue(currentQueryString);
      setCurrentQueryString("");
    }
  };

  /**
   * Handles a click of the action button.
   * Cleans up the input field.
   */
  const handleActionButtonClick = () => {
    setCurrentQueryString("");
  };

  return (
    <Box className="search-wrapper">
      <Paper className="search-paper">
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <SearchOutlinedIcon />
        </IconButton>
        <Box className="input">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            value={currentQueryString ? currentQueryString : ""}
            onChange={handleQueryStringChange}
            onKeyDown={handleKeyDown}
          />
        </Box>

        <Box className="actions">
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={handleActionButtonClick}
          >
            <BackspaceOutlinedIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
