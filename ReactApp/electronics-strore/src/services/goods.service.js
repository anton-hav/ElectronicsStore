// Import services
import ApiService from "./api.service";
// Import data transfer objects and utils
import GoodsDto from "../types/dto/goods.dto";
import { environment } from "../environment/environment";

export default class GoodsService {
  constructor() {
    this._endpoint = environment.goodsEndpoint;
    this._apiService = new ApiService();
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

  // CREATE

  // UPDATE

  // DELETE
}
