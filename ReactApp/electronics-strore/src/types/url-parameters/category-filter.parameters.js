import UrlSearchParameters from "./url-parameters.parameters";

/**
 * Represents a category filter parameters for requesting to the storage.
 */
export default class CategoryParameters extends UrlSearchParameters {
  /**
   * @property {number} categoryId - the node unique identifier of the category.
   */
  categoryId = null;

  constructor(categoryId) {
    super();
    if (categoryId !== undefined) {
      this.categoryId = categoryId;
    }
  }

  /**
   * Mapping from URLSearchParams to CategoryParameters object
   * @param {URLSearchParams} params - URLSearchParams object
   * @returns new instance of CategoryParameters
   */
  static fromUrlSearchParams(params) {
    let categoryId;
    if (params instanceof URLSearchParams) {
      if (params.has("node")) {
        categoryId = params.get("node");
      }
    }
    return new CategoryParameters(categoryId);
  }

  /**
   * Set category filter parameters to the URLSearchParameters object.
   * @param {URLSearchParams} search - URLSearchParams object
   * @returns URLSearchParams object with updated parameters.
   */
  setParametersToUrl(search) {
    if (search instanceof URLSearchParams) {
      search.set("node", this.categoryId);
    }
    return search;
  }
}
