import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../../storage/slices/cart.slice";

/**
 * Custom React Hook for storing items ids in the cart.
 * The hook encapsulates the logic of interaction with the Redux store.
 * @returns an object that contains the ids and setIds
 */
export default function useCartItemIds() {
  const [ids, setIds] = useState(useSelector((state) => state.cart.items));

  const dispatch = useDispatch();

  const saveItemIds = (itemsIds) => {
    const newItems = itemsIds.filter(id => !ids.includes(id))
    const itemsForRemove = ids.filter(id => !itemsIds.includes(id));
    if (newItems.length > 0) {
        dispatch(addItems(newItems));
    }    
    if (itemsForRemove.length > 0) {
        dispatch(removeItems(itemsForRemove));
    }
    setIds(itemsIds);
  };

  return {
    setIds: saveItemIds,
    ids
  };
}