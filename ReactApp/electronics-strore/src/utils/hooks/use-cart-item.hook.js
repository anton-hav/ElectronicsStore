import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItems,
  removeItems,
  updateItems,
} from "../../storage/slices/cart.slice";

/**
 * Custom React Hook for storing items in the cart.
 * The hook encapsulates the logic of interaction with the Redux store.
 * @returns an object that contains the cartItems and setCartItems
 */
export default function useCartItems() {
  const [cartItems, setCartItems] = useState(
    useSelector((state) => state.cart)
  );

  const dispatch = useDispatch();

  const saveItems = (items) => {
    const newItems = items.filter((item) =>
      cartItems.find((i) => i.goodsId === item.goodsId) ? false : true
    );

    const itemsForRemove = cartItems.filter((item) =>
      items.find((i) => i.goodsId === item.goodsId) ? false : true
    );
    const itemsForUpdate = items.filter((item) =>
      cartItems.find(
        (i) => i.goodsId === item.goodsId && i.count !== item.count
      )
        ? true
        : false
    );

    if (newItems.length > 0) {
      dispatch(addItems(newItems));
    }
    if (itemsForRemove.length > 0) {
      dispatch(removeItems(itemsForRemove));
    }
    if (itemsForUpdate.length > 0) {
      dispatch(updateItems(itemsForUpdate));
    }
    setCartItems(items);
  };

  return {
    setCartItems: saveItems,
    cartItems,
  };
}
