import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Paper, Box, Typography, Grid } from "@mui/material";

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
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const customerSearchFilter =
    SearchFieldParameters.fromUrlSearchParams(search);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

  // return items.length ? (
  //   // <Box className="page-wrapper">
  //   //   <Box className="aside-menu">
  //   //     <AsideMenu />
  //   //   </Box>
  //   //   <Box className="product-list">
  //   //     <Paper>
  //   //       <ItemsList items={items} />
  //   //       <Pagination itemsCount={itemsCount} pagination={pagination} />
  //   //     </Paper>
  //   //   </Box>
  //   // </Box>
  // );

  return (
    <Grid container>
      <Grid item xs={3} md={3}>
        <AsideMenu
          category={category}
          price={price}
          maxPrice={maxPrice}
          availableBrands={availableBrands}
          defaultBrandsFilter={brandsFilter}
        />
      </Grid>
      <Grid item xs={9} md={9}>
        <Box className="items-list-wrapper">
          <TopToolsBar customerSearchFilter={customerSearchFilter} />
          {items.length ? (
            <Paper>
              <ItemsList items={items} />
              <Pagination itemsCount={itemsCount} pagination={pagination} />
            </Paper>
          ) : (
            <p>No items for sale</p>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
