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
import BrandFilterBar from "../brand-filter/brand-filter.component";
// Import custom types and utils
import PriceParameters from "../../types/url-parameters/price-filter.parameters";
import CategoryParameters from "../../types/url-parameters/category-filter.parameters";
import BrandParameters from "../../types/url-parameters/brand-filter.parameters";

import "./aside-menu.component.css";

export default function AsideMenu(props) {
  const { category, price, maxPrice, availableBrands, defaultBrandsFilter } =
    props;
  const [priceFilter, setPriceFilter] = useState(price);
  const [brandFilter, setBrandFilter] = useState([]);

  const navigate = useNavigate();

  /**
   * Get the relative path to the current webpage
   * with filters parameters as URL search parameters.
   * @returns relative path to the current webpage with pagination parameters.
   */
  const generateUrlPath = () => {
    // Get current URLSearchParams object
    let url = new URL(window.location.href);
    let search = new URLSearchParams(url.search);
    // Create filters object from current URLSearchParams
    let categoryFilter = CategoryParameters.fromUrlSearchParams(search);
    // Create new empty URLSearchParams object.
    // It is required to remove unnecessary attributes (e.g. pagination).
    let newSearchParams = new URLSearchParams();
    // Set filters parameters to new URLSearchParams object.
    newSearchParams = priceFilter.setParametersToUrl(newSearchParams);
    newSearchParams = brandFilter.setParametersToUrl(newSearchParams);
    if (categoryFilter.categoryId !== null) {
      newSearchParams = categoryFilter.setParametersToUrl(newSearchParams);
    }
    // Generate new relative path with filters parameters.
    url.search = newSearchParams;
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
    setPriceFilter(filter);
  };

  const handleApplyFilterButtonClick = () => {
    let relativePath = generateUrlPath();
    navigate(relativePath);
  };

  /**
   * Handles the changes of the brand filter values.
   * @param {*} selectedBrands - array that contains brand names.
   */
  const handleBrandFilterChange = (selectedBrands) => {
    let filter = new BrandParameters(selectedBrands);
    setBrandFilter(filter);

    // brands.forEach((brand) => {
    //   console.log(`${brand.name}`);
    //   console.log(selectedItems.includes(brand.name));
    // });
  };

  const categoriesSection = <CategoriesBar category={category} />;

  const filterSection = (
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
      <PriceFilterBar
        price={price}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
      />
      {availableBrands.length > 0 ? (
        <BrandFilterBar
          availableBrands={availableBrands}
          defaultBrandsFilter={defaultBrandsFilter}
          onBrandFilterChange={handleBrandFilterChange}
        />
      ) : null}
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

      <AsideMenuSection component={filterSection} title={"Filters"} />
    </Box>
  );
}
