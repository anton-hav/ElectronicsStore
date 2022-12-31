import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents a complex search parameters for requesting max price of goods through API.
 * Don't use this class for generate url search string for URl.
 */
export default class MaxGoodsPriceRequestModel extends UrlSearchParameters {
  /**
   * @property {CategoryParameters} - category parameters.
   */
  category = null;

  constructor(category) {
    super();
    this.category = category;
  }

  /**
   * Mapping from instance of GoodsParameters to MaxGoodsPriceRequestModel object.
   * @param {*} goodsParameters - GoodsParameters object
   * @returns new instance of MaxGoodsPriceRequestModel
   */
  static fromGoodsParameters(goodsParameters) {
    return new MaxGoodsPriceRequestModel(goodsParameters.category);
  }
}
