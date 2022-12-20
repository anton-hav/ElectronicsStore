import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, value) => {
      if (!state.items.includes(value.payload)){
        state.items.push(value.payload);
      }      
    },
    addItems: (state, value) => {
      let items = value.payload;
      let newItems = items.filter(item => !state.items.includes(item));
      state.items.push(...newItems);
    },
    setItems: (state, value) => {
      let items = value.payload;
      state.items = items;
    },
    removeItem: (state, value) => {      
      if (state.items.includes(value.payload)){
        let index = state.items.indexOf(value.payload);
        state.items.splice(index, 1);
      }
    },
    removeItems: (state, value) => {
      let itemsToRemove = value.payload;      
      let newItems = state.items.slice();
      itemsToRemove.forEach(item => newItems.splice(newItems.indexOf(item), 1));
      state.items = newItems;
    },
    clearCart: (state) => {
      throw new Error("Not implemented");
    },
  },
});

export const { addItem, addItems, setItems, removeItem, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;