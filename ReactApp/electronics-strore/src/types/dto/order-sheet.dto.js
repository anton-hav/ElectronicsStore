/**
 * Represents information about order sheet.
 */
export default class OrderSheetDto {
  /**
   * @property {string} id - an unique identifier.
   */
  id = null;
  /**
   * @property {Date} dateTimeOfCreate - datetime of the creating order sheet.
   */
  dateTimeOfCreate = null;
  /**
   * @property {string} userId - an unique identifier of the user.
   */
  userId = null;
  /**
   * @property {string} status - status of the order.
   */
  status = null;

  constructor(id, dateTimeOfCreate, userId, status) {
    this.id = id;
    this.dateTimeOfCreate = dateTimeOfCreate;
    this.userId = userId;
    this.status = status;
  }

  /**
   * Mapping from api response (as an json) to OrderSheetDto.
   * @param {*} response - response object as an JSON.
   * @returns new instance of OrderSheetDto
   */
  static fromResponse(response) {
    return new OrderSheetDto(
      response.id,
      new Date(Date.parse(response.dateTimeOfCreate)),
      response.userId,
      response.status
    );
  }
}
