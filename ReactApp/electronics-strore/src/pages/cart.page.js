// import { useSelector } from "react-redux";
// // Import custom components
// import CartView from "../components/cart/cart.component";

// export default function Cart() {
//   const ids = useSelector((state) => state.cart.items);

//   return ids.length ? <CartView ids={ids} /> : <p>No items in your cart</p>;
// }

import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

// Import custom components
import CartView from "../components/cart/cart.component";

// Import services
import GoodsService from "../services/goods.service";
import OrderSheetService from "../services/orderSheet.service";
import UserService from "../services/user.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken";
import useCartItemIds from "../utils/hooks/useCartItemIds";
import UnauthorizedError from "../types/errors/unauthorized.error";

const _goodsService = new GoodsService();
const _orderSheetService = new OrderSheetService();
const _userService = new UserService();

export default function Cart() {
  const { ids, setIds } = useCartItemIds();
  const { token, setToken } = useToken();
  const [items, setItems] = React.useState([]);
  const [message, setMessage] = React.useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function setDataToItems(ids) {
      const data = await Promise.all(
        ids.map(async (id) => await _goodsService.getItemByIdFromApi(id))
      );
      setItems(data);
    }
    if (ids.find((id) => !items.some((item) => item.id === id))) {
      setDataToItems(ids);
    }
    console.log(message);
  });

  const handlePurchaseClick = async () => {
    const goCheckout = async (accessToken) => {
      let result = await _orderSheetService.createNewOrderSheet(accessToken);
      setIds([]);
      setItems([]);
      setMessage(result.message);
    };

    if (token === undefined || token.accessToken === null) {
      return navigate("/login/");
    }
    try {
      await goCheckout(token.accessToken);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        console.log("You are not authorized");
        try {
          let newToken = await _userService.getTokenByRefreshToken(
            token.refreshToken
          );
          setToken(newToken);
          await goCheckout(newToken.accessToken);
        } catch (error) {
          return navigate("/login/");
        }
      }
    }
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

    index = ids.indexOf(item.id);
    const newIds = ids.slice();
    newIds.splice(index, 1);
    setIds(newIds);
  };

  return (ids.length || message !== undefined) ? (
    <CartView
      items={items}
      message={message}
      handlePurchaseClick={handlePurchaseClick}
      handleRemoveItemClick={handleRemoveItemClick}
    />
  ) : (
    <p>No items in your cart</p>
  );
}
