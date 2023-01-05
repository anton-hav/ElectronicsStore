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
   * @property {number} count - the number of the goods in the order sheet.
   */
  count = null;
  /**
   * @property {number} cost - the price of the goods at the time of purchase.
   */
  cost = null;

  constructor(id, goodsId, count, cost) {
    this.id = id;
    this.goodsId = goodsId;
    this.count = count;
    this.cost = cost;
  }

  /**
   * Mapping from GoodsInCartDto to PurchaseDto object.
   * @param {GoodsInCartDto} goodsInCartDto - GoodsInCartDto object.
   * @returns new instance of PurchaseDto
   */
  static fromGoodsInCartDto(goodsInCartDto) {
    let newId = crypto.randomUUID();
    return new PurchaseDto(
      newId,
      goodsInCartDto.goods.id,
      goodsInCartDto.count,
      goodsInCartDto.goods.cost
    );
  }
}
