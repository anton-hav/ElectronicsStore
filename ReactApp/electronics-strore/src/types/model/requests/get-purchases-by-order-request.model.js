import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents complex search parameters for requesting purchases through API.
 * Don't use this class for generate url search string for URL.
 */
export default class PurchasesByOrderIdRequestModel extends UrlSearchParameters {
  /**
   * @property {string} - order id parameters.
   */
  orderId = null;

  constructor(orderId) {
    super();
    this.orderId = orderId;
  }
}
