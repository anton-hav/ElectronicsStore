// Import custom object types and utils
import UrlSearchParameters from "./url-parameters.parameters";

/**
 * Represents the parameters of a search that user can enter into the search toolbar.
 */
export default class SearchFieldParameters extends UrlSearchParameters {
  /**
   * @property {array} finds - the array of search parameters that user input in the search field.
   */
  finds = [];

  constructor(finds) {
    super();
    if (Array.isArray(finds)) {
      this.finds = finds;
    }
  }

  /**
   * Mapping from URLSearchParams to SearchFieldParameters object
   * @param {URLSearchParams} params - URLSearchParams object
   * @returns new instance of SearchFieldParameters
   */
  static fromUrlSearchParams(params) {
    let finds = [];
    if (params instanceof URLSearchParams) {
      if (params.has("finds")) {
        finds = params.getAll("finds");
      }
    }
    return new SearchFieldParameters(finds);
  }

  /**
   * Set search field filter parameters to the URLSearchParameters object.
   * @param {*} search - URLSearchParams object.
   */
  setParametersToUrl(search) {
    if (search instanceof URLSearchParams) {
      if (this.finds.length > 0) {
        this.finds.forEach((find) => search.append("finds", find));
      }
    }
  }
}
