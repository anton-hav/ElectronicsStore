import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, value) => {
      if (!state.includes(value.payload)) {
        state.push(value.payload);
      }
    },

    // addItems: (state, value) => {
    //   let items = value.payload;
    //   let newItems = items.filter((item) => !state.includes(item));
    //   state.push(...newItems);
    // },

    addItems: {
      reducer(state, value) {
        let items = value.payload;
        let newItems = items.filter((item) =>
          state.find((s) => s.goodsId === item.id) ? false : true
        );
        state.push(...newItems);
      },
      prepare(values) {
        let preparedValues = [];
        values.map((goodsInCartShort) => {
          const id = goodsInCartShort.getId();
          const goodsId = goodsInCartShort.goodsId;
          const count = goodsInCartShort.count;
          preparedValues.push({ id, goodsId, count });
        });

        return {
          payload: [...preparedValues],
        };
      },
    },
    setItems: (state, value) => {
      let items = value.payload;
      state = items;
    },
    removeItem: (state, value) => {
      if (state.includes(value.payload)) {
        let index = state.indexOf(value.payload);
        state.splice(index, 1);
      }
    },

    removeItems: (state, value) => {
      let itemsToRemove = value.payload;
      let stateTemp = state.slice();
      itemsToRemove.forEach((item) => {
        let index = stateTemp.findIndex((s) => s.id === item.id);
        if (index !== -1) {
          stateTemp = [
            ...stateTemp.slice(0, index),
            ...stateTemp.slice(index + 1),
          ];
        }
      });
      console.log(stateTemp);
      return stateTemp;
    },

    clearCart: (state) => {
      throw new Error("Not implemented");
    },

    updateItems: (state, value) => {
      let itemsForUpdate = value.payload;
      let stateTemp = state.slice();
      itemsForUpdate.forEach((item) => {
        let index = stateTemp.findIndex((s) => s.id === item.id);
        if (index !== -1) {
          stateTemp = [
            ...stateTemp.slice(0, index),
            item,
            ...stateTemp.slice(index + 1),
          ];
        }
      });
      return stateTemp;
    },
  },
});

export const {
  addItem,
  addItems,
  setItems,
  removeItem,
  removeItems,
  clearCart,
  updateItems,
} = cartSlice.actions;

export default cartSlice.reducer;
