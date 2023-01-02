import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents a complex search parameters for requesting goods count through API.
 * Don't use this class for generate url search string for URL.
 */
export default class GoodsCountRequestModel extends UrlSearchParameters {
  /**
   * @property {CategoryParameters} - category parameters.
   */
  category = null;

  /**
   * @property {PriceParameters} - price filter parameters.
   */
  price = null;

  /**
   * @property {BrandParameters} - price filter parameters.
   */
  brands = null;

  constructor(category, price, brands) {
    super();
    this.category = category;
    this.price = price;
    this.brands = brands;
  }

  /**
   * Mapping from instance of GoodsParameters to GoodsCountRequestModel object.
   * @param {GoodsParameters} goodsParameters - GoodsParameters object
   * @returns new instance of GoodsCountRequestModel
   */
  static fromGoodsParameters(goodsParameters) {
    let categoryParameters = goodsParameters.category;
    let priceFilterParameters = goodsParameters.price;
    let brandsParameters = goodsParameters.brands;
    return new GoodsCountRequestModel(
      categoryParameters,
      priceFilterParameters,
      brandsParameters
    );
  }
}
