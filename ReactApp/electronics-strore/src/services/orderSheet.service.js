// Import services
import ApiService from "./api.service";
// Import custom types and utils
import Logger from "../utils/logger";
import { environment } from "../environment/environment";
import UnauthorizedError from "../types/errors/unauthorized.error"

export default class OrderSheetService {
    constructor() {
        this._orderSheetEndpoint = environment.orderSheetEndpoint;
        this._apiService = new ApiService();
        this._logger = new Logger();
    }

    async createNewOrderSheet(token) {
        try {
            let response = await this._apiService.post(this._orderSheetEndpoint, {}, token);
            return response;
        } catch (error) {
            if (error instanceof UnauthorizedError){
                this._logger.warn(error);
                throw error;
            }
            this._logger.error(error);
        }
    }
}