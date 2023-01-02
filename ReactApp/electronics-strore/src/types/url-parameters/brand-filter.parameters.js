// Import custom object types and utils
import UrlSearchParameters from "./url-parameters.parameters";

export default class BrandParameters extends UrlSearchParameters {
  /**
   * @property {array} brands - the array of brand names
   */
  brands = [];

  constructor(brands) {
    super();
    if (Array.isArray(brands)) {
      this.brands = brands;
    }
  }

  /**
   * Mapping from URLSearchParams to BrandParameters object
   * @param {URLSearchParams} params - URLSearchParams object
   * @returns new instance of BrandParameters
   */
  static fromUrlSearchParams(params) {
    let brands = [];
    if (params instanceof URLSearchParams) {
      if (params.has("brands")) {
        brands = params.getAll("brands");
      }
    }
    return new BrandParameters(brands);
  }

  /**
   * Set brands filter parameters to the URLSearchParameters object.
   * @param {*} search - URLSearchParams object.
   * @returns URLSearchParams object with updated parameters.
   */
  setParametersToUrl(search) {
    if (search instanceof URLSearchParams) {
      if (this.brands.length > 0) {
        this.brands.forEach((brand) => search.append("brands", brand));
      }
    }
    return search;
  }
}
