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

  constructor(category) {
    super();
    this.category = category;
  }

  /**
   * Mapping from instance of GoodsParameters to GoodsCountRequestModel object.
   * @param {*} goodsParameters - GoodsParameters object
   * @returns new instance of GoodsCountRequestModel
   */
  static fromGoodsParameters(goodsParameters) {
    return new GoodsCountRequestModel(goodsParameters.category);
  }
}
