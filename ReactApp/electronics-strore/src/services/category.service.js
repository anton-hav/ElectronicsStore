// Import services
import ApiService from "./api.service";
// Import custom types and utils
import CategoryDto from "../types/dto/category.dto";
import CategoryRequestModel from "../types/model/categoryReques.model";
import { environment } from "../environment/environment";

export default class CategoryService {
  constructor() {
    this._categoriesEndpoint = environment.categoriesEndpoint;
    this._apiService = new ApiService();
  }

  // READ
  async getCategoryByIdFromApi(id) {
    let response = await this._apiService.getById(this._categoriesEndpoint, id);
    let category = CategoryDto.fromResponse(response);
    return category;
  }

  /**
   * Get child categories for requested parent category id from the API.
   * @param {*} parentId - parent category id.
   * @returns child categories matching the requested parent category id.
   */
  async getCategoriesByParentIdFromApi(parentId) {
    let categoriesRequestModel = new CategoryRequestModel(parentId);
    let response = await this._apiService.get(
      this._categoriesEndpoint,
      categoriesRequestModel
    );
    let categories = response.map((cat) => CategoryDto.fromResponse(cat));
    return categories;
  }

  async getRootCategoryFromApi() {
    let rootCategory = await this.getCategoriesByParentIdFromApi();
    return rootCategory.find((cat) => typeof cat !== "undefined");
  }
}
