export const environment = {
  production: false,
  apiUrl: "https://localhost:7099/api/",
  userEndpoint: "User",
  tokenEndpoints: {
    createToken: "Token",
    refreshToken: "Token/Refresh",
    revokeToken: "Token/Revoke",
    validateToken: "Token/Validate",
  },
  goodsEndpoint: "Goods",
  goodsCountEndpoint: "GoodsCount",
  maxGoodsPriceEndpoint: "MaxGoodsPrice",
  orderSheetEndpoint: "Orders",
  categoriesEndpoint: "Categories",
  brandsEndpoint: "Brands",
  purchaseEndpoint: "Purchases",
};
