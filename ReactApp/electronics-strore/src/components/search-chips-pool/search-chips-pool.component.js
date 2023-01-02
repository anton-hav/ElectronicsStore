import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import TagFacesIcon from "@mui/icons-material/TagFaces";

import "./search-chips-pool.component.css";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SearchChipsPool(props) {
  const { values, newSearchValue, onSearchChipsPoolChange } = props;
  const [chipData, setChipData] = useState([]);

  /**
   * Handles the change of new search value.
   * It performs if component take new value from search input field.
   */
  useEffect(() => {
    if (newSearchValue !== undefined && newSearchValue !== "") {
      let isExist = chipData.find((chip) => chip.label === newSearchValue)
        ? true
        : false;
      if (!isExist) {
        setChipData([
          ...chipData,
          { key: crypto.randomUUID(), label: newSearchValue },
        ]);
      }
    }
  }, [newSearchValue]);

  //   useEffect(() => {
  //     if (values.length > 0) {
  //         let newChips = values.map(() => {});
  //     }
  //     }
  //   }, [newSearchValue]);

  useEffect(() => {
    let userQuery = [];
    if (chipData.length > 0) {
      userQuery = chipData.map((chip) => chip.label);
    }
    onSearchChipsPoolChange(userQuery);
  }, [chipData]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Box className="search-chips-pool">
      {chipData.length > 0 ? (
        <List className="chips-list">
          {chipData.map((data) => {
            let icon;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return (
              <ListItem key={data.key}>
                <Tooltip arrow title={data.label} TransitionComponent={Zoom}>
                  <Chip
                    label={
                      data.label.length < 10
                        ? data.label
                        : `${data.label.slice(0, 10)}...`
                    }
                    size="small"
                    onDelete={handleDelete(data)}
                  />
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </Box>
  );
}
