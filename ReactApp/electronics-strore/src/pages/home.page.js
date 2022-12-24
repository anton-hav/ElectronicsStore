import React from "react";
import { useLoaderData } from "react-router-dom";
import { Paper, Box, Typography } from "@mui/material";

// Import custom components
import ItemsList from "../components/items-list/items-list.component";
import Pagination from "../components/pagination/pagination.component";
// Import services
import GoodsService from "../services/goods.service";
// Import custom object types and utils
import PaginationParameters from "../types/url-parameters/pagination.parameters";

const _goodsService = new GoodsService();

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const pagination = PaginationParameters.fromUrlSearchParams(search);
  const items = await _goodsService.getGoodsFromApi(pagination);
  const itemsCount = await _goodsService.getGoodsCountFromApi();
  return { items, itemsCount, pagination };
}

export default function Home() {
  const { items, itemsCount, pagination } = useLoaderData();

  return items.length ? (
    <Box>
      <Paper>
        <ItemsList items={items} />
        <Pagination itemsCount={itemsCount} pagination={pagination} />
      </Paper>
    </Box>
  ) : (
    <p>No items for sale</p>
  );
}
