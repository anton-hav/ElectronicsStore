import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Paper, Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Import custom components
import ItemsList from "../components/items-list/items-list.component";
import Pagination from "../components/pagination/pagination.component";
import AsideMenu from "../components/aside-menu/aside-menu.component";
import TopToolsBar from "../components/top-tools-bar/top-tools-bar.component";

// Import services
import GoodsService from "../services/goods.service";
import BrandService from "../services/brand.service";
// Import custom object types and utils
import PaginationParameters from "../types/url-parameters/pagination.parameters";
import CategoryParameters from "../types/url-parameters/category-filter.parameters";
import GoodsParameters from "../types/url-parameters/goods-filter.parameters";
import GoodsCountRequestModel from "../types/model/requests/goods-count-request.model";
import MaxGoodsPriceRequestModel from "../types/model/requests/max-goods-price-request.model";
import BrandsRequestModel from "../types/model/requests/brands-request.model";
import BrandParameters from "../types/url-parameters/brand-filter.parameters";
import SearchFieldParameters from "../types/url-parameters/search-field.parameters";
import PriceParameters from "../types/url-parameters/price-filter.parameters";

import "./home.page.css";

const _goodsService = new GoodsService();
const _brandService = new BrandService();

export async function loader({ request }) {
  /**
   * Get a count of goods specified by search parameters.
   * @param {GoodsParameters} goodsFilter - complex search parameters for retrieving items.
   * @returns the number of goods that match the search parameters.
   */
  const getGoodsCount = async (goodsFilter) => {
    const goodsCountParameters =
      GoodsCountRequestModel.fromGoodsParameters(goodsFilter);
    const itemsCount = await _goodsService.getGoodsCountFromApi(
      goodsCountParameters
    );
    return itemsCount;
  };

  /**
   * Get maximum price of goods specified by search parameters.
   * @param {GoodsParameters} goodsFilter - complex search parameters for retrieving items.
   * @returns a maximum price of goods that match the search parameters.
   */
  const getMaxGoodsPrice = async (goodsFilter) => {
    const maxGoodsPriceParameters =
      MaxGoodsPriceRequestModel.fromGoodsParameters(goodsFilter);
    const maxPrice = await _goodsService.getMaxGoodsPriceFromApi(
      maxGoodsPriceParameters
    );
    return maxPrice;
  };

  /**
   * Get a list of brands specified by search parameters.
   * @param {GoodsParameters} goodsFilter - complex search parameters for retrieving items.
   * @returns brands that match the search parameters.
   */
  const getAvailableBrands = async (goodsFilter) => {
    const brandsRequestModel =
      BrandsRequestModel.fromGoodsParameters(goodsFilter);
    const availableBrands = await _brandService.getBrandsFromApi(
      brandsRequestModel
    );
    return availableBrands;
  };

  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  // Get parameters from query string
  const goodsFilter = GoodsParameters.fromUrlSearchParams(search);
  const items = await _goodsService.getGoodsFromApi(goodsFilter);
  const pagination = goodsFilter.pagination;
  const category = goodsFilter.category;
  const price = goodsFilter.price;
  const brandsFilter = goodsFilter.brands;
  const customerSearchFilter = goodsFilter.userSearches;

  // Get count of goods for current search parameters.
  const itemsCount = await getGoodsCount(goodsFilter);
  // Get maximum price for current search parameters.
  const maxPrice = await getMaxGoodsPrice(goodsFilter);
  // Get list of brands for current search parameters.
  const availableBrands = await getAvailableBrands(goodsFilter);

  return {
    items,
    itemsCount,
    pagination,
    category,
    price,
    maxPrice,
    availableBrands,
    brandsFilter,
    customerSearchFilter,
  };
}

export default function Home() {
  const {
    items,
    itemsCount,
    pagination,
    category,
    price,
    maxPrice,
    availableBrands,
    brandsFilter,
    customerSearchFilter,
  } = useLoaderData();

  const navigate = useNavigate();

  /**
   * Get the relative path to the current webpage
   * with filters parameters as URL search parameters.
   * @returns relative path to the current webpage with search parameters.
   */
  const generateUrlPath = (...filters) => {
    /**
     * Get URLSearchParams object from the current url.
     * @param {URL} url - current URL
     * @returns new URLSearchParams object
     */
    const getSearchParamsFromUrl = (url) => {
      return new URLSearchParams(url.search);
    };

    /**
     * Get the filter as an instance of the class specified in the parameters
     * @param {URLSearchParams} search - URLSearchParams object
     * @param {array} args - array of filters
     * @param {class} filterClass - the filter class.
     * @returns instance of the class specified in the parameters
     */
    const getFilter = (search, args, filterClass) => {
      let categoryFilter =
        args.find((arg) => arg instanceof filterClass) ||
        filterClass.fromUrlSearchParams(search);

      return categoryFilter;
    };

    /**
     * Get pagination parameters.
     * @param {array} args - array of filters
     * @returns new PaginationParameters object or null if args doesn't contains pagination parameters.
     */
    const getPaginationParameters = (args) => {
      let paginationParameters =
        args.find((arg) => arg instanceof PaginationParameters) || null;

      return paginationParameters;
    };

    /**
     * Set only category filter parameters to destination URLSearchParams object.
     * @param {URLSearchParams} sourceSearch - source URLSearchParams object which can be used to generate filters.
     * @param {URLSearchParams} destinationSearch - destination URLSearchParams object.
     * @param {array} args - array of a URL search parameters.
     */
    const setOnlyCategoryParametersToUrlSearchParams = (
      sourceSearch,
      destinationSearch,
      args
    ) => {
      // Create filter objects from current URLSearchParams or args.
      let categoryFilter = getFilter(sourceSearch, args, CategoryParameters);
      // Set filters parameters to new URLSearchParams object.
      if (categoryFilter.categoryId !== null) {
        categoryFilter.setParametersToUrl(destinationSearch);
      }
    };

    /**
     * Set filters parameters to destination URLSearchParams object.
     * @param {URLSearchParams} sourceSearch - source URLSearchParams object which can be used to generate filters.
     * @param {URLSearchParams} destinationSearch - destination URLSearchParams object.
     * @param {array} args - array of a URL search parameters.
     */
    const setAllSearchParametersToUrlSearchParams = (
      sourceSearch,
      destinationSearch,
      args
    ) => {
      // Create filter objects from current URLSearchParams or args.
      let categoryFilter = getFilter(sourceSearch, args, CategoryParameters);
      let brandFilter = getFilter(sourceSearch, args, BrandParameters);
      let priceFilter = getFilter(sourceSearch, args, PriceParameters);
      let searchFilter = getFilter(sourceSearch, args, SearchFieldParameters);

      let paginationParameters = getPaginationParameters(args);
      // Set filters parameters to new URLSearchParams object.
      if (categoryFilter.categoryId !== null) {
        categoryFilter.setParametersToUrl(destinationSearch);
      }
      if (brandFilter.brands.length > 0) {
        brandFilter.setParametersToUrl(destinationSearch);
      }
      if (priceFilter.from !== null || priceFilter.to !== null) {
        priceFilter.setParametersToUrl(destinationSearch);
      }
      if (searchFilter.finds.length > 0) {
        searchFilter.setParametersToUrl(destinationSearch);
      }
      if (paginationParameters !== null) {
        paginationParameters.setParametersToUrl(destinationSearch);
      }
    };

    // Get current URLSearchParams object
    let url = new URL(window.location.href);
    let search = getSearchParamsFromUrl(url);

    // Create new empty URLSearchParams object.
    // It is required to remove unnecessary attributes (e.g. pagination).
    let newSearchParams = new URLSearchParams();

    let isFiltersContainsCategoryParameters = filters.find(
      (filter) => filter instanceof CategoryParameters
    )
      ? true
      : false;

    if (isFiltersContainsCategoryParameters) {
      setOnlyCategoryParametersToUrlSearchParams(
        search,
        newSearchParams,
        filters
      );
    } else {
      setAllSearchParametersToUrlSearchParams(search, newSearchParams, filters);
    }

    // Generate new relative path with filters parameters.
    url.search = newSearchParams;
    let relativePath = url.pathname + url.search;
    return relativePath;
  };

  /**
   * Get the relative path to the current webpage
   * with pagination parameters as URL search parameters.
   * @param {PaginationParameters} paginationParameters - pagination parameters
   * @returns relative path to the current webpage with pagination parameters
   */
  const generateUrlPathPagination = (paginationParameters) => {
    let url = new URL(window.location.href);
    let search = new URLSearchParams(url.search);
    url.search = paginationParameters.setParametersToUrl(search);
    let relativePath = url.pathname + url.search;
    return relativePath;
  };

  const handleSearchFilterChange = (searchFilter) => {
    console.log(searchFilter);
    // let relativePath = generateUrlPathSearch(searchFilter);
    let relativePath = generateUrlPath(searchFilter);
    navigate(relativePath);
  };

  const handleAsideMenuFiltersChange = (priceFilter, brandFilter) => {
    console.log("Filters changed");
    // let relativePath = generateUrlPathAside(priceFilter, brandFilter);
    let relativePath = generateUrlPath(priceFilter, brandFilter);
    navigate(relativePath);
  };

  /**
   * Handles the changes of the category tree values.
   * @param {CategoryParameters} categoryFilter - category filter parameters.
   */
  const handleCategoryChange = (categoryFilter) => {
    // let relativePath = generateUrlPathCategory(categoryFilter);
    let relativePath = generateUrlPath(categoryFilter);
    navigate(relativePath);
  };

  const handlePaginationChange = (paginationParameters) => {
    // let relativePath = generateUrlPathPagination(paginationParameters);
    let relativePath = generateUrlPath(paginationParameters);
    navigate(relativePath);
  };

  return (
    <Grid container>
      <Grid item xs={3} md={3}>
        <AsideMenu
          category={category}
          price={price}
          maxPrice={maxPrice}
          availableBrands={availableBrands}
          defaultBrandsFilter={brandsFilter}
          onFiltersChange={handleAsideMenuFiltersChange}
          onCategoryChange={handleCategoryChange}
        />
      </Grid>
      <Grid item xs={9} md={9}>
        <Box className="items-list-wrapper">
          <TopToolsBar
            customerSearchFilter={customerSearchFilter}
            onSearchFilterChange={handleSearchFilterChange}
          />
          {items.length ? (
            <Paper>
              <ItemsList items={items} />
              <Pagination
                itemsCount={itemsCount}
                pagination={pagination}
                onChange={handlePaginationChange}
              />
            </Paper>
          ) : (
            <p>No items for sale</p>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
