import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import custom components
import CartView from "../components/cart/cart.component";

// Import services
import GoodsService from "../services/goods.service";
import OrderSheetService from "../services/orderSheet.service";
import UserService from "../services/user.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken";
import useCartItems from "../utils/hooks/use-cart-item.hook";
import UnauthorizedError from "../types/errors/unauthorized.error";
import GoodsInCartDto from "../types/dto/goods-in-cart.dto";

const _goodsService = new GoodsService();
const _orderSheetService = new OrderSheetService();
const _userService = new UserService();

export default function Cart() {
  const { cartItems, setCartItems } = useCartItems();
  const { token, setToken } = useToken();
  const [items, setItems] = React.useState([]);
  const [message, setMessage] = React.useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function setDataToItems(cartItems) {
      const data = await Promise.all(
        cartItems.map(async (cartItem) => {
          let goodsDto = await _goodsService.getItemByIdFromApi(
            cartItem.goodsId
          );
          console.log(cartItem.count);
          return new GoodsInCartDto(goodsDto, cartItem.count);
        })
      );
      setItems(data);
    }
    if (
      cartItems.find(
        (cartItem) => !items.some((item) => item.goods.id === cartItem.goodsId)
      )
    ) {
      setDataToItems(cartItems);
    }
  });

  const handlePurchaseClick = async () => {
    const goCheckout = async (accessToken) => {
      let result = await _orderSheetService.createNewOrderSheet(accessToken);
      setCartItems([]);
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
   * and removes corresponding item from the store.
   * @param {GoodsDto} item - item to remove from cart
   */
  const handleRemoveItemClick = (item) => {
    let index = items.findIndex((i) => i.goods.id === item.id);
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);

    index = cartItems.indexOf(cartItems.find((i) => i.goodsId === item.id));
    const newIds = cartItems.slice();
    newIds.splice(index, 1);
    setCartItems(newIds);
  };

  const handleChangeCount = (id, count) => {
    // Set changes to the local state
    let index = items.findIndex((i) => i.goods.id === id);
    let item = items[index];
    item.count = count;
    const newItems = [
      ...items.slice(0, index),
      item,
      ...items.slice(index + 1),
    ];
    setItems(newItems);

    // Set changes to the Redux store
    index = cartItems.findIndex((i) => i.goodsId === id);
    let cartItem = { ...cartItems[index], count };

    const newCartItems = [
      ...cartItems.slice(0, index),
      cartItem,
      ...cartItems.slice(index + 1),
    ];
    setCartItems(newCartItems);
  };

  return cartItems.length || message !== undefined ? (
    <div>
      <CartView
        items={items}
        message={message}
        handlePurchaseClick={handlePurchaseClick}
        handleRemoveItemClick={handleRemoveItemClick}
        onChangeCount={handleChangeCount}
      />
    </div>
  ) : (
    <p>No items in your cart</p>
  );
}
