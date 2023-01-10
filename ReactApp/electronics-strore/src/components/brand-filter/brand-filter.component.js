import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import "./brand-filter.component.css";

export default function BrandFilterBar(props) {
  const { availableBrands, defaultBrandsFilter, onBrandFilterChange } = props;
  const [selectedItems, setSelectedItems] = useState([]);

  /**
   * Calls the parent event handler onBrandFilterChange
   */
  useEffect(() => {
    onBrandFilterChange(selectedItems);
  }, [selectedItems]);

  /**
   * Handles changes in the default brands filter values.
   * It is performed when setting a new URL in the browser.
   */
  useEffect(() => {
    if (
      defaultBrandsFilter.brands !== null &&
      defaultBrandsFilter.brands.length > 0
    ) {
      setSelectedItems([...defaultBrandsFilter.brands]);
    } else {
      setSelectedItems([]);
    }
  }, [defaultBrandsFilter]);

  /**
   * Handles the change of state of the checkbox.
   * @param {*} event - React event
   */
  const handleItemChanged = (event) => {
    let isEnabled = event.target.checked;
    let brandName = event.target.name;
    if (isEnabled) {
      setSelectedItems([...selectedItems, brandName]);
    } else {
      let newSelectedItems = selectedItems.filter((item) => item !== brandName);
      setSelectedItems(newSelectedItems);
    }
  };

  const items = availableBrands.map((brand) => {
    return (
      <Box className="brand-field-wrapper" key={brand.id}>
        <FormControlLabel
          className="brand-item"
          name={brand.name}
          checked={selectedItems.includes(brand.name)}
          control={<Checkbox size="small" />}
          label={
            <Typography className="brand-item-label">{brand.name}</Typography>
          }
          onChange={handleItemChanged}
        />
      </Box>
    );
  });

  return (
    <Box className="brand-filter-wrapper">
      <Typography variant="h7" component="div">
        Manufactured
      </Typography>
      <Divider variant="middle" />
      <Box className="brand-items-wrapper">
        <FormGroup>{items}</FormGroup>
      </Box>
    </Box>
  );
}
