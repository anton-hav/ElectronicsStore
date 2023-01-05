/**
 * Represents the request model for creating a new purchase through the API.
 */
export default class AddNewPurchaseRequestModel {
  /**
   * @property {number} - The count of the item.
   */
  count = null;
  /**
   * @property {number} - Cost of goods at the time of purchase.
   */
  cost = null;
  /**
   * @property {string} - an unique identifier of the order.
   */
  orderId = null;
  /**
   * @property {string} - an unique identifier of the product.
   */
  itemId = null;

  constructor(count, cost, orderId, itemId) {
    this.count = count;
    this.cost = cost;
    this.orderId = orderId;
    this.itemId = itemId;
  }
}
