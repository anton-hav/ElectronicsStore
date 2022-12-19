import React from "react";
import { useLoaderData } from "react-router-dom";

// Import custom components
import ItemsList from "../components/items-list/items-list.component";
// Import services
import GoodsService from "../services/goods.service";
// Import data transfer objects and utils

const _goodsService = new GoodsService();

export async function loader() {
  const items = await _goodsService.getGoodsFromApi();
  return { items };
}

export default function Home() {
  const { items } = useLoaderData();

  return items.length ? <ItemsList items={items} /> : <p>No items for sale</p>;
}
