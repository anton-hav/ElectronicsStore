import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import TagFacesIcon from "@mui/icons-material/TagFaces";

import "./search-chips-pool.component.css";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SearchChipsPool(props) {
  const { items, onDelete } = props;
  const [chipData, setChipData] = useState([]);

  /**
   * Handles the change of items from props.
   * It performs if component take new value from search input field.
   */
  useEffect(() => {
    const newItems = items.map((item) => {
      return { key: crypto.randomUUID(), label: item };
    });
    setChipData(newItems);
  }, [items]);

  /**
   * Handles the delete of the item.
   */
  const handleDelete = (chipToDelete) => () => {
    const newChips = chipData.filter((chip) => chip.key !== chipToDelete.key);
    setChipData(newChips);
    onDelete(chipToDelete.label);
  };

  return (
    <Box className="search-chips-pool">
      {chipData.length > 0 ? (
        <List className="chips-list">
          {chipData.map((data) => {
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
