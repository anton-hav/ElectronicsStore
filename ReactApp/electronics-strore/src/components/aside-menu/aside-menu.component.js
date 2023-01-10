import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
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
  const {
    category,
    price,
    maxPrice,
    availableBrands,
    defaultBrandsFilter,
    onFiltersChange,
    onCategoryChange,
  } = props;
  const [priceFilter, setPriceFilter] = useState(price);
  const [brandFilter, setBrandFilter] = useState([]);

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
    onFiltersChange(priceFilter, brandFilter);
  };

  /**
   * Handles the changes of the brand filter values.
   * @param {*} selectedBrands - array that contains brand names.
   */
  const handleBrandFilterChange = (selectedBrands) => {
    let filter = new BrandParameters(selectedBrands);
    setBrandFilter(filter);
  };

  /**
   * Handles the changes of the category tree values.
   * @param {CategoryParameters} categoryFilter - category filter parameters.
   */
  const handleCategoryChange = (categoryFilter) => {
    onCategoryChange(categoryFilter);
  };

  const categoriesSection = (
    <CategoriesBar category={category} onChange={handleCategoryChange} />
  );

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
