/**
 * The class represents short information about the item in the shopping cart.
 * It is designed to store information in the Redux store.
 */
export default class GoodsInCartShort {
  /**
   * @property {*} id - an unique identifier of the item.
   */
  _id = null;
  /**
   * @property {*} goodsId - the unique identifier of the goods.
   */
  goodsId = null;
  /**
   * @property {number} count - the count of goods in the cart.
   */
  count = null;

  constructor(goodsId, count) {
    this._id = crypto.randomUUID();
    this.goodsId = goodsId;
    this.count = count;
  }

  /**
   * Get an unique identifier of the item.
   */
  getId() {
    return this._id;
  }
}
