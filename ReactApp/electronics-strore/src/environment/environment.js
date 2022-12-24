export const environment = {
  production: false,
  apiUrl: "https://localhost:7099/api/",
  userEndpoint: "User",
  tokenEndpoints: {
    createToken: "Token",
    refreshToken: "Token/Refresh",
    revokeToken: "Token/Revoke",
  },
  goodsEndpoint: "Goods",
  goodsCountEndpoint: "GoodsCount",
  orderSheetEndpoint: "OrderSheet",
};
