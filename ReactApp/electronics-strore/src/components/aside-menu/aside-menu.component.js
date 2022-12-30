import React, { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useNavigate } from "react-router-dom";
// Import custom components
import CategoriesBar from "../categories-bar/categories-bar.component";
import PriceFilterBar from "../price-filter/price-filter.component";
import AsideMenuSection from "./aside-menu-section.component";
// Import custom types and utils
import PriceParameters from "../../types/url-parameters/price-filter.parameters";

import "./aside-menu.component.css";

export default function AsideMenu(props) {
  const { category, price } = props;
  const [priceFilter, setPriceFilter] = useState(price);

  const navigate = useNavigate();

  /**
   * Get the relative path to the current webpage
   * with filters parameters as URL search parameters.
   * @returns relative path to the current webpage with pagination parameters.
   */
  const generateUrlPath = () => {
    let url = new URL(window.location.href);
    let search = new URLSearchParams(url.search);
    url.search = priceFilter.setParametersToUrl(search);
    let relativePath = url.pathname + url.search;
    return relativePath;
  };

  /**
   * Handles the changes of the price filter values.
   * @param {*} from - "from" value of the price filter.
   * @param {*} to - "to" value of the price filter.
   */
  const handlePriceChange = (from, to) => {
    let filter = new PriceParameters(from, to);
    console.log("Filter: ", filter);
    setPriceFilter(filter);
  };

  const handleApplyFilterButtonClick = () => {
    let relativePath = generateUrlPath();
    navigate(relativePath);
  };

  const categoriesSection = <CategoriesBar category={category} />;
  const priceFilterSection = (
    <Box>
      <Button
        sx={{ m: 1 }}
        variant="outlined"
        startIcon={<FilterAltOutlinedIcon />}
        onClick={handleApplyFilterButtonClick}
      >
        Apply filters
      </Button>
      <Divider />
      <PriceFilterBar price={price} onPriceChange={handlePriceChange} />
    </Box>
  );

  // return (
  //   <Box>
  //     <Box className="section">
  //       <Typography variant="h6" component="div">
  //         Select category
  //       </Typography>
  //       <Divider variant="middle" />
  //       <CategoriesBar category={category} />
  //     </Box>
  //     <Box className="section">
  //       <PriceFilterBar />
  //     </Box>
  //   </Box>
  // );

  return (
    <Box>
      <AsideMenuSection
        component={categoriesSection}
        title={"Select category"}
      />

      <AsideMenuSection component={priceFilterSection} title={"Filters"} />
    </Box>
  );
}
