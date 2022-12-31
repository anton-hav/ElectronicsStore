import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Paper, Box, Typography, Grid } from "@mui/material";

// Import custom components
import ItemsList from "../components/items-list/items-list.component";
import Pagination from "../components/pagination/pagination.component";
import AsideMenu from "../components/aside-menu/aside-menu.component";
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

import "./home.page.css";

const _goodsService = new GoodsService();
const _brandService = new BrandService();

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const goodsFilter = GoodsParameters.fromUrlSearchParams(search);
  const items = await _goodsService.getGoodsFromApi(goodsFilter);
  const pagination = goodsFilter.pagination;
  const category = goodsFilter.category;
  const price = goodsFilter.price;
  const goodsCountParameters =
    GoodsCountRequestModel.fromGoodsParameters(goodsFilter);
  const itemsCount = await _goodsService.getGoodsCountFromApi(
    goodsCountParameters
  );
  const maxGoodsPriceParameters =
    MaxGoodsPriceRequestModel.fromGoodsParameters(goodsFilter);
  const maxPrice = await _goodsService.getMaxGoodsPriceFromApi(
    maxGoodsPriceParameters
  );

  const brandsRequestModel =
    BrandsRequestModel.fromGoodsParameters(goodsFilter);
  const brands = await _brandService.getBrandsFromApi(brandsRequestModel);
  return { items, itemsCount, pagination, category, price, maxPrice, brands };
}

export default function Home() {
  const { items, itemsCount, pagination, category, price, maxPrice, brands } =
    useLoaderData();

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
          brands={brands}
        />
      </Grid>
      <Grid item xs={9} md={9}>
        {items.length ? (
          <Paper>
            <ItemsList items={items} />
            <Pagination itemsCount={itemsCount} pagination={pagination} />
          </Paper>
        ) : (
          <p>No items for sale</p>
        )}
      </Grid>
    </Grid>
  );
}
