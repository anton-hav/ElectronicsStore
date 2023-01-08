import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents complex search parameters for requesting orders through API.
 * Don't use this class for generate url search string for URL.
 */
export default class OrdersByUserIdRequestModel extends UrlSearchParameters {
  /**
   * @property {string} - orders owner id.
   */
  userId = null;

  constructor(userId) {
    super();
    this.userId = userId;
  }
}
