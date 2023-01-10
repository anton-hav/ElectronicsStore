// Import services
import ApiService from "./api.service";
// Import data transfer objects and utils
import GoodsDto from "../types/dto/goods.dto";
import { environment } from "../environment/environment";
import Logger from "../utils/logger";
import BadRequestError from "../types/errors/bad-request.error";

export default class GoodsService {
  constructor() {
    this._endpoint = environment.goodsEndpoint;
    this._goodsCountEndpoint = environment.goodsCountEndpoint;
    this._maxGoodsPriceEndpoint = environment.maxGoodsPriceEndpoint;
    this._apiService = new ApiService();
    this._logger = new Logger();
  }

  // READ
  async getItemByIdFromApi(id) {
    let response = await this._apiService.getById(this._endpoint, id);
    let item = GoodsDto.fromResponse(response);
    return item;
  }

  async getGoodsFromApi(parameters) {
    let response = await this._apiService.get(this._endpoint, parameters);
    let goods = response.map((resp) => GoodsDto.fromResponse(resp));
    return goods;
  }

  /**
   * Get a count of goods matched search parameters.
   * @param {GoodsCountRequestModel} parameters - search parameters for goods count.
   * @returns a number of goods matching search parameters.
   */
  async getGoodsCountFromApi(parameters) {
    let response = await this._apiService.get(
      this._goodsCountEndpoint,
      parameters
    );
    return response;
  }

  /**
   * Get a maximum price of goods matched search parameters.
   * @param {MaxGoodsPriceRequestModel} parameters - search parameters for maximum price of goods.
   * @returns a maximum price of goods matched search parameters or null if no entries exist.
   */
  async getMaxGoodsPriceFromApi(parameters) {
    try {
      let response = await this._apiService.get(
        this._maxGoodsPriceEndpoint,
        parameters
      );
      return response;
    } catch (error) {
      if (error instanceof BadRequestError) {
        this._logger.warn(
          "No records matching the search conditions were found."
        );
        return null;
      }
    }
  }

  // CREATE

  // UPDATE

  // DELETE
}
