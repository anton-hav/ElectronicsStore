import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import "./brand-filter.component.css";

export default function BrandFilterBar(props) {
  const { brands } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  // let brands = [
  //   {
  //     id: "5020e248-4e50-46d6-881d-49ef9a19f41d",
  //     name: "Brand #1",
  //   },
  //   {
  //     id: "0b0c9950-4ca6-45f4-aa47-aae2fbfe7902",
  //     name: "Brand #2 Retail & Consumer Goods",
  //   },
  //   {
  //     id: "6f65a8e2-b198-4138-b255-d95c237dfb01",
  //     name: "Brand #3",
  //   },
  //   {
  //     id: "f6118ecf-1b6a-4591-8d97-33e094fb5462",
  //     name: "Brand #4",
  //   },
  //   {
  //     id: "e7a3c0e5-bb49-4d28-a7ae-d8a9692ec705",
  //     name: "Brand #5",
  //   },
  //   {
  //     id: "55cff9f8-fee2-4a89-999a-f43108b8fa86",
  //     name: "Brand #6",
  //   },
  // ];

  const handleItemChanged = (event) => {
    let isEnabled = event.target.checked;
    let brandName = event.target.name;
    if (isEnabled) {
      setSelectedItems([...selectedItems, brandName]);
    } else {
      let newSelectedItems = selectedItems.filter((item) => item !== brandName);
      setSelectedItems(newSelectedItems);
    }
    console.log(selectedItems);
  };

  brands.forEach((brand) => {
    console.log(`${brand.name}`);
    console.log(selectedItems.includes(brand.name));
  });

  const items = brands.map((brand) => {
    return (
      <Box className="brand-field-wrapper">
        <FormControlLabel
          key={brand.id}
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
