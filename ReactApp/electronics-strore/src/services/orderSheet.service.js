// Import services
import ApiService from "./api.service";
// Import custom types and utils
import Logger from "../utils/logger";
import { environment } from "../environment/environment";
import UnauthorizedError from "../types/errors/unauthorized.error";
import OrderSheetDto from "../types/dto/order-sheet.dto";

export default class OrderSheetService {
  constructor() {
    this._orderSheetEndpoint = environment.orderSheetEndpoint;
    this._apiService = new ApiService();
    this._logger = new Logger();
  }

  // READ
  async getOrdersFromApi(accessToken, parameters) {
    let response = await this._apiService.get(
      this._orderSheetEndpoint,
      parameters,
      accessToken
    );
    let orders = response.map((resp) => OrderSheetDto.fromResponse(resp));
    return orders;
  }

  // CREATE

  async createNewOrderSheet(accessToken, orderSheet) {
    try {
      let response = await this._apiService.post(
        this._orderSheetEndpoint,
        orderSheet,
        accessToken
      );
      let order = OrderSheetDto.fromResponse(response);
      return order;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this._logger.warn(error);
        throw error;
      }
      this._logger.error(error);
    }
  }

  // UPDATE

  /**
   * Update the order sheet through the API
   * @param {string} accessToken - an access token
   * @param {OrderSheetDto} order - The order sheet
   * @returns a boolean (true if record successfully updated)
   */
  async updateOrderSheet(accessToken, order) {
    let response = await this._apiService.patch(
      this._orderSheetEndpoint,
      order,
      order.id,
      accessToken
    );
    let result = OrderSheetDto.fromResponse(response);
    return result instanceof OrderSheetDto;
  }

  // DELETE
}
