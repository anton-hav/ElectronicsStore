// Import custom object types and utils
import UrlSearchParameters from "./url-parameters.parameters";
import PaginationParameters from "./pagination.parameters";
import CategoryParameters from "./category-filter.parameters";
import PriceParameters from "./price-filter.parameters";
import BrandParameters from "./brand-filter.parameters";

/**
 * Represents a complex search parameters for requesting goods from the storage.
 */
export default class GoodsParameters extends UrlSearchParameters {
  /**
   * @property {PaginationParameters} - Pagination parameters
   */
  pagination = null;

  /**
   * @property {CategoryParameters} - Category parameters
   */
  category = null;

  /**
   * @property {PriceParameters} - Price parameters
   */
  price = null;

  /**
   * @property {BrandParameters} - Brand parameters.
   */
  brands = null;

  constructor(pagination, category, price, brands) {
    super();
    this.pagination = pagination;
    this.category = category;
    this.price = price;
    this.brands = brands;
  }

  /**
   * Mapping from URLSearchParams to GoodsParameters object
   * @param {*} params - URLSearchParams object
   * @returns new instance of GoodsParameters
   */
  static fromUrlSearchParams(params) {
    let pagination = PaginationParameters.fromUrlSearchParams(params);
    let category = CategoryParameters.fromUrlSearchParams(params);
    let price = PriceParameters.fromUrlSearchParams(params);
    let brands = BrandParameters.fromUrlSearchParams(params);

    return new GoodsParameters(pagination, category, price, brands);
  }
}
