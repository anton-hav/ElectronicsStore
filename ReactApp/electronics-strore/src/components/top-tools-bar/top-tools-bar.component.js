import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

// Import custom components
import SearchItemsBar from "../search-items/search-items.component";
import SearchChipsPool from "../search-chips-pool/search-chips-pool.component";
// Import custom types and utils
import SearchFieldParameters from "../../types/url-parameters/search-field.parameters";

import "./top-tools-bar.component.css";

export default function TopToolsBar(props) {
  const { customerSearchFilter, onSearchFilterChange } = props;
  const [searchChips, setSearchChips] = useState(customerSearchFilter.finds);

  /**
   * Handles the change of the search filter parameters.
   * It performs if component take new value from the URL or the parrent component.
   */
  useEffect(() => {
    if (customerSearchFilter !== undefined) {
      setSearchChips([...customerSearchFilter.finds]);
    }
  }, [customerSearchFilter]);

  /**
   * Handles the change of the search chips pool.
   */
  useEffect(() => {
    let existingChips = [...searchChips];
    let chipsFromProps = [...customerSearchFilter.finds];
    if (existingChips.sort().toString() !== chipsFromProps.sort().toString()) {
      const newSearchFilter = new SearchFieldParameters(searchChips);
      onSearchFilterChange(newSearchFilter);
    }
  }, [searchChips]);

  /**
   * Handles the input of the search string in the search input field.
   * @param {string} value - search string value.
   */
  const handleSearchValueChange = (value) => {
    if (value !== "" && !searchChips.includes(value)) {
      setSearchChips([...searchChips, value]);
    }
  };

  /**
   * Handles the change of the search items bar value.
   * @param {string} value - search string value.
   */
  const handleDeleteItemFromSearchChipsPool = (value) => {
    const newChips = searchChips.filter((chip) => chip !== value);
    setSearchChips(newChips);
  };

  return (
    <Box className="top-tools-bar-wrapper">
      <SearchItemsBar onChange={handleSearchValueChange} />
      <SearchChipsPool
        items={searchChips}
        onDelete={handleDeleteItemFromSearchChipsPool}
      />
    </Box>
  );
}
