import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
// Import custom components
import SearchItemsBar from "../search-items/search-items.component";
import SearchChipsPool from "../search-chips-pool/search-chips-pool.component";
// Import custom types and utils
import SearchFieldParameters from "../../types/url-parameters/search-field.parameters";
import PriceParameters from "../../types/url-parameters/price-filter.parameters";
import CategoryParameters from "../../types/url-parameters/category-filter.parameters";
import BrandParameters from "../../types/url-parameters/brand-filter.parameters";

import "./top-tools-bar.component.css";

export default function TopToolsBar(props) {
  const { customerSearchFilter } = props;
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState(customerSearchFilter);

  const navigate = useNavigate();

  /**
   * Get the relative path to the current webpage
   * with filters parameters as URL search parameters.
   * @returns relative path to the current webpage with user search parameters.
   */
  const generateUrlPath = () => {
    // Get current URLSearchParams object
    let url = new URL(window.location.href);
    let search = new URLSearchParams(url.search);
    // Create filters objects from current URLSearchParams
    let categoryFilter = CategoryParameters.fromUrlSearchParams(search);
    let brandFilter = BrandParameters.fromUrlSearchParams(search);
    let priceFilter = PriceParameters.fromUrlSearchParams(search);
    // Create new empty URLSearchParams object.
    // It is required to remove unnecessary attributes (e.g. pagination).
    let newSearchParams = new URLSearchParams();
    // Set filters parameters to new URLSearchParams object.
    if (categoryFilter.categoryId !== null) {
      newSearchParams = categoryFilter.setParametersToUrl(newSearchParams);
    }
    if (brandFilter.brands.length > 0) {
      newSearchParams = brandFilter.setParametersToUrl(newSearchParams);
    }
    if (priceFilter.from !== null || priceFilter.to !== null) {
      newSearchParams = priceFilter.setParametersToUrl(newSearchParams);
    }
    if (searchFilter.finds.length > 0) {
      newSearchParams = searchFilter.setParametersToUrl(newSearchParams);
    }
    // Generate new relative path with filters parameters.
    url.search = newSearchParams;
    let relativePath = url.pathname + url.search;
    return relativePath;
  };

  useEffect(() => {
    let relativePath = generateUrlPath();
    navigate(relativePath);
  }, [searchFilter]);

  /**
   * Handles the input of the search string in the search input field.
   * @param {string} value - search string value.
   */
  const handleSearchValueChange = (value) => {
    if (value !== "" && value !== searchValue) {
      let filter = new SearchFieldParameters([...searchFilter.finds, value]);
      setSearchFilter(filter);
      // setSearchValue(value);
    }
  };

  const handleSearchChipsPoolChange = (values) => {
    let filter = new SearchFieldParameters(values);
    setSearchFilter(filter);
  };

  return (
    <Box className="top-tools-bar-wrapper">
      <SearchItemsBar onChangeSearchValue={handleSearchValueChange} />
      <SearchChipsPool
        values={searchFilter.finds}
        // newSearchValue={searchValue ? searchValue : ""}
        onSearchChipsPoolChange={handleSearchChipsPoolChange}
      />
    </Box>
  );
}
