import { createSlice } from "@reduxjs/toolkit";
import TokenDto from "../../types/dto/token.dto";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, value) => {
      if (value.payload instanceof TokenDto) {
        state.token = value.payload;
      }
    },
    removeToken: (state, value) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
