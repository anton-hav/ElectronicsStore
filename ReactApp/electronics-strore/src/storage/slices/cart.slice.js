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
      let newItems = items.map(item => !state.items.includes(item));
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
      //let itemsToRemove = state.items.filters(item => !items.includes(item));
      let indexes = itemsToRemove.map(item => state.items.indexOf(item));
      indexes.forEach(index => state.items.splice(index, 1));
    },
    clearCart: (state) => {},
  },
});

export const { addItem, addItems, setItems, removeItem, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;