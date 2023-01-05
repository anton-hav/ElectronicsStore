/**
 * Represents information about the product in the order sheet.
 */
export default class PurchaseDto {
  /**
   * @property {string} id - an unique identifier.
   */
  id = null;
  /**
   * @property {string} goodsId - an unique identifier of the product.
   */
  goodsId = null;
  /**
   * @property {string} orderId - an unique identifier of the order.
   */
  orderId = null;
  /**
   * @property {number} count - the number of the goods in the order sheet.
   */
  count = null;
  /**
   * @property {number} cost - the price of the goods at the time of purchase.
   */
  cost = null;

  constructor(id, goodsId, orderId, count, cost) {
    this.id = id;
    this.goodsId = goodsId;
    this.orderId = orderId;
    this.count = count;
    this.cost = cost;
  }

  /**
   * Mapping from api response (as an json) to PurchaseDto
   * @param {*} response - response object as an JSON.
   * @returns new instance of PurchaseDto
   */
  static fromResponse(response) {
    return new PurchaseDto(
      response.id,
      response.goodsId,
      response.orderId,
      response.count,
      response.cost
    );
  }
}
