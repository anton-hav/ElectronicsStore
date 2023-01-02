// Import custom object types and utils
import UrlSearchParameters from "./url-parameters.parameters";

/**
 * Represents a price filter parameters.
 */
export default class PriceParameters extends UrlSearchParameters {
  /**
   * @property {number} from - price filter parameter
   * that represents the start price for the search.
   */
  from = null;
  /**
   * @property {number} to - price filter parameter
   * that represents the end price for the search.
   */
  to = null;

  constructor(from, to) {
    super();
    if (from !== null) {
      let fromValue = Number(from);
      this.from = fromValue !== NaN ? fromValue : null;
    }
    if (to !== null) {
      let toValue = Number(to);
      this.to = toValue !== NaN ? toValue : null;
    }
  }

  /**
   * Mapping from URLSearchParams to PriceParameters object
   * @param {URLSearchParams} params - URLSearchParams object
   * @returns new instance of PriceParameters
   */
  static fromUrlSearchParams(params) {
    let from = null;
    let to = null;
    if (params instanceof URLSearchParams) {
      if (params.has("from")) {
        from = params.get("from");
      }
      if (params.has("to")) {
        to = params.get("to");
      }
    }
    return new PriceParameters(from, to);
  }

  /**
   * Set price filter parameters to the URLSearchParameters object.
   * @param {*} search - URLSearchParams object.
   * @returns URLSearchParams object with updated parameters.
   */
  setParametersToUrl(search) {
    if (search instanceof URLSearchParams) {
      if (this.from !== null) search.set("from", this.from);
      if (this.to !== null) search.set("to", this.to);
    }
    return search;
  }
}
