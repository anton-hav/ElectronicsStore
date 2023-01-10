// Import services
import ApiService from "./api.service";
// Import custom types and utils
import BrandDto from "../types/dto/brand.dto";
import { environment } from "../environment/environment";
import Logger from "../utils/logger";

export default class BrandService {
  constructor() {
    this._brandEndpoint = environment.brandsEndpoint;
    this._apiService = new ApiService();
    this._logger = new Logger();
  }

  // READ

  /**
   * Get brands specified by search parameters.
   * @param {BrandsRequestModel} parameters - search parameters
   * @returns array of brands that match the search parameters.
   */
  async getBrandsFromApi(parameters) {
    let response = await this._apiService.get(this._brandEndpoint, parameters);
    let brands = response.map((resp) => BrandDto.fromResponse(resp));
    return brands;
  }

  // CREATE

  // UPDATE

  // DELETE
}
