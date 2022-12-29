import UrlSearchParameters from "../url-parameters/url-parameters.parameters";

/**
 * Represents a category parameters for requesting category through API.
 * Don't use this class for generate url search string for URL.
 */
export default class CategoryRequestModel extends UrlSearchParameters {
  /**
   * @property {number} parentCategoryId - an unique identifier of the parent for current category.
   */
  parentCategoryId = "";

  constructor(parentCategoryId) {
    super();
    if (parentCategoryId !== undefined) {
      this.parentCategoryId = parentCategoryId;
    }
  }
}
