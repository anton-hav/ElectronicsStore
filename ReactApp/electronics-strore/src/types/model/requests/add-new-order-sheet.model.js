// Import custom types and utils
import OrderStatuses from "../../../utils/order-statuses";

/**
 * Represents parameters for add new order sheet to storage through API.
 */
export default class AddNewOrderSheetModel {
  /**
   * @property {Date} dateTimeOfCreate - datetime of the creating order sheet.
   */
  dateTimeOfCreate = null;
  /**
   * @property {string} userId - an unique identifier of the user.
   */
  userId = null;

  constructor(userId) {
    let dateTime = new Date();

    this.dateTimeOfCreate = dateTime.toISOString();
    this.userId = userId;
  }
}
