import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents complex search parameters for requesting brands through API.
 * Don't use this class for generate url search string for URL.
 */
export default class BrandsRequestModel extends UrlSearchParameters {
  /**
   * @property {CategoryParameters} - category parameters.
   */
  category = null;

  /**
   * @property {string} - price filter parameters.
   */
  price = null;

  constructor(category, price) {
    super();
    this.category = category;
    this.price = price;
  }

  /**
   * Mapping from instance of GoodsParameters to BrandsRequestModel object.
   * @param {*} goodsParameters - GoodsParameters object
   * @returns new instance of BrandsRequestModel
   */
  static fromGoodsParameters(goodsParameters) {
    let categoryParameters = goodsParameters.category;
    let priceFilterParameters = goodsParameters.price;
    return new BrandsRequestModel(categoryParameters, priceFilterParameters);
  }
}
