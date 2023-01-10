// Import custom types
import GoodsDto from "./goods.dto";

/**
 * The class represents short information about the item in the shopping cart.
 * It is designed to store information in the Redux store.
 */
export default class GoodsInCartDto {
  /**
   * @property {*} id - an unique identifier of the item.
   */
  _id = null;
  /**
   * @property {GoodsDto} goods - the goods.
   */
  goods = null;
  /**
   * @property {number} count - the count of goods in the cart.
   */
  count = null;

  constructor(goods, count) {
    this._id = crypto.randomUUID();
    if (goods instanceof GoodsDto) {
      this.goods = goods;
    }
    if (typeof count === "number") {
      this.count = count;
    }
  }

  /**
   * Get an unique identifier of the item.
   */
  getId() {
    return this._id;
  }
}
