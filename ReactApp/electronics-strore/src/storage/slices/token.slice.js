import { createSlice } from "@reduxjs/toolkit";
import { NIL as NIL_UUID } from "uuid";
import TokenDto from "../../types/dto/token.dto";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    accessToken: null,
    role: null,
    userId: NIL_UUID,
    tokenExpiration: null,
    refreshToken: NIL_UUID,
  },
  reducers: {
    setToken: (state, value) => {
      if (value.payload instanceof TokenDto) {
        let token = value.payload;
        state.accessToken = token.accessToken;
        state.role = token.role;
        state.userId = token.userId;
        state.tokenExpiration = token.tokenExpiration;
        state.refreshToken = token.refreshToken;
      }
    },
    removeToken: (state, value) => {
      state.accessToken = null;
      state.role = null;
      state.userId = NIL_UUID;
      state.tokenExpiration = null;
      state.refreshToken = NIL_UUID;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
