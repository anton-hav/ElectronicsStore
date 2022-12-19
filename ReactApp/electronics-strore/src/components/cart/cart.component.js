import React, { useEffect } from "react";
import { Paper, Grid, Box, Typography, Button } from "@mui/material";

import { useSelector, useDispatch } from 'react-redux';
import { redirect, useNavigate } from "react-router-dom";

// Import custom components
import ItemInCartCard from "./item-in-cart-card.component";
// Import services
import GoodsService from "../../services/goods.service";
// Import data transfer objects and utils
import { formatter } from "../../utils/formatter";
import { removeItem } from "../../storage/slices/cart.slice";
import useToken from "../../utils/hooks/useToken";
import useCartItemIds from "../../utils/hooks/useCartItemIds";
import "./cart.component.css";


const _goodsService = new GoodsService();

export default function CartView() {
  //const { ids } = props;
  const {ids, setIds } = useCartItemIds();
  const {token, setToken} = useToken();
  const [items, setItems] = React.useState([]);

  //const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function setDataToItems(ids) {
      const data = await Promise.all(
        ids.map(async (id) => await _goodsService.getItemByIdFromApi(id))
      );
      setItems(data);
    }

    if (ids.length > 0) {
      setDataToItems(ids);
    }
  }, []);

  const handlePurchaseClick = () => {
    if (token === null || token === undefined) {
      return navigate("/login/");
    }
    console.log("Purchasing done");
  };

  /**
   * Handles the remove button click event.
   * The handler removes the item from the cart 
   * and removes corresponding id from the store.
   * @param {GoodsDto} item - item to remove from cart
   */
  const handleRemoveItemClick = (item) => {    
    let index = items.indexOf(item);
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);
    //dispatch(removeItem(item.id));
    

    index = ids.indexOf(item.id);
    const newIds = ids.slice();
    newIds.splice(index, 1);
    setIds(newIds);
    
  };

  return (
    <Box className="cart">
      <Paper>
        <Box className="cart-paper">
          <Box>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              {items.map((item) => {
                return <ItemInCartCard key={item.id} item={item} handleRemoveItem={handleRemoveItemClick}/>;
              })}
            </Grid>
          </Box>

          <Box className="cart-paper__summary">
            <Box>
              <Typography variant="body1" color="text.secondary">
                {`The cost of the goods in your cart ${formatter.format(
                  items.reduce((sum, item) => sum + item.cost, 0)
                )}`}
              </Typography>
            </Box>
            <Box className="cart-paper__summary-button">
              <Button onClick={handlePurchaseClick} variant="contained">Purchase</Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
