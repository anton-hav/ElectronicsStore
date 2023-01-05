import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import custom components
import CartView from "../components/cart/cart.component";

// Import services
import GoodsService from "../services/goods.service";
import OrderSheetService from "../services/orderSheet.service";
import UserService from "../services/user.service";
import PurchaseService from "../services/purchase.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken";
import useCartItems from "../utils/hooks/use-cart-item.hook";
import UnauthorizedError from "../types/errors/unauthorized.error";
import GoodsInCartDto from "../types/dto/goods-in-cart.dto";
import OrderSheetDto from "../types/dto/order-sheet.dto";
import PurchaseDto from "../types/dto/purchase.dto";
import OrderStatuses from "../utils/order-statuses";
import AddNewOrderSheetModel from "../types/model/requests/add-new-order-sheet.model";
import AddNewPurchaseRequestModel from "../types/model/requests/add-new-purchase-request.model";

const _goodsService = new GoodsService();
const _orderSheetService = new OrderSheetService();
const _userService = new UserService();
const _purchaseService = new PurchaseService();

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

  /**
   * Handles the purchase button click event.
   */
  const handlePurchaseClick = async () => {
    /**
     * Create an array of the purchase for sending to the API server.
     * @param {OrderSheetDto} order - an order object.
     * @returns an array of the purchase as a AddNewPurchaseRequestModel objects.
     */
    const createPurchases = (order) => {
      let purchases = items.map((item) => {
        return new AddNewPurchaseRequestModel(
          item.count,
          item.goods.cost,
          order.id,
          item.goods.id
        );
      });

      return purchases;
    };

    const goCheckout = async (accessToken) => {
      let orderRequestModel = new AddNewOrderSheetModel(token.userId);
      let order = await _orderSheetService.createNewOrderSheet(
        accessToken,
        orderRequestModel
      );
      if (order instanceof OrderSheetDto) {
        let purchaseRequestModels = createPurchases(order);
        let result = await Promise.all(
          purchaseRequestModels.map(async (model) => {
            let purchase = await _purchaseService.createNewPurchase(
              accessToken,
              model
            );
            return purchase;
          })
        );
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // let result = await _purchaseService.createNewPurchase(
        //   purchaseRequestModels[0]
        // );
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        setCartItems([]);
        setItems([]);
        let message = "Thank you for your purchase!";
        setMessage(message);
      }
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

  /**
   * Handles the change count of item in the cart.
   * @param {string} id - an unique identifier of the goods.
   * @param {number} count - new value of the count.
   */
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
