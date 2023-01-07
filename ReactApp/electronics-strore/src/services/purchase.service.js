// Import services
import ApiService from "./api.service";
// Import custom types and utils
import Logger from "../utils/logger";
import { environment } from "../environment/environment";
import UnauthorizedError from "../types/errors/unauthorized.error";
import PurchaseDto from "../types/dto/purchase.dto";
import PurchasesByOrderIdRequestModel from "../types/model/requests/get-purchases-by-order-request.model";

export default class PurchaseService {
  constructor() {
    this._purchaseEnpoint = environment.purchaseEndpoint;
    this._apiService = new ApiService();
    this._logger = new Logger();
  }

  /**
   * Storing a purchase in the storage through API
   * @param {TokenDto} token - access token
   * @param {AddNewPurchaseRequestModel} purchase - purchase request model
   * @returns A newly created purchase as a PurchaseDTO object.
   */
  async createNewPurchase(token, purchase) {
    try {
      let response = await this._apiService.post(
        this._purchaseEnpoint,
        purchase,
        token
      );
      let result = PurchaseDto.fromResponse(response);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this._logger.info(error);
        throw error;
      }
      this._logger.error(error);
    }
  }

  async getPurchasesByOrderId(accessToken, orderId) {
    try {
      let requestModel = new PurchasesByOrderIdRequestModel(orderId);
      let response = await this._apiService.get(
        this._purchaseEnpoint,
        requestModel,
        accessToken
      );
      let result = response.map((resp) => PurchaseDto.fromResponse(resp));
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this._logger.info(error);
        throw error;
      }
      this._logger.error(error);
    }
  }
}
