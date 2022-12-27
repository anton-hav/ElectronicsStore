import UrlSearchParameters from "../url-parameters/url-parameters.parameters";

/**
 * Represents a category parameters for requesting to the storage.
 */
export default class CategoryRequestModel extends UrlSearchParameters {
  /**
   * @property {number} parentCategoryId - .
   */
  parentCategoryId = "";

  constructor(parentCategoryId) {
    super();
    if (parentCategoryId !== undefined) {
      this.parentCategoryId = parentCategoryId;
    }
  }

  /**
   * Mapping from URLSearchParams to CategoryRequestModel object
   * @param {*} params -
   * @returns
   */
  static fromUrlSearchParams(params) {
    throw new Error("Not implemented");
  }
}
