// Import services
import ApiService from "./api.service";
// Import custom types and utils
import TokenDto from "../types/dto/token.dto";
import UserDto from "../types/dto/user.dto";
import { environment } from "../environment/environment";
import UnauthorizedError from "../types/errors/unauthorized.error";
import Logger from "../utils/logger";

export default class UserService {
  constructor() {
    this._userEndpoint = environment.userEndpoint;
    this._tokenEndpoints = environment.tokenEndpoints;
    this._apiService = new ApiService();
    this._logger = new Logger();
  }

  /**
   * Get access token for user login data (email, password)
   * @param {string} email - user email address
   * @param {string} password - user password
   * @returns access token or null if authentication failed
   */
  async login(email, password) {
    let response = await this._apiService.post(
      this._tokenEndpoints.createToken,
      {
        email,
        password,
      }
    );
    if (response !== null && response !== undefined) {
      let token = TokenDto.fromResponse(response);
      return token;
    }

    // Todo: rework this code with throw exception instead
    // Null will be returned only if the API is available,
    // but the necessary data could not be found.
    if (response === null) {
      return null;
    }

    throw new Error("Failed to authenticate");
  }

  /**
   * Create new user with specified email and password.
   * @param {*} email - user email address
   * @param {*} password - user password
   * @param {*} passwordConfirmation - user password confirmation
   * @returns access token for new user.
   */
  async register(email, password, passwordConfirmation) {
    let response = await this._apiService.post(this._userEndpoint, {
      email,
      password,
      passwordConfirmation,
    });
    let token = TokenDto.fromResponse(response);
    return token;
  }

  async getTokenByRefreshToken(refreshToken) {
    let response = await this._apiService.post(
      this._tokenEndpoints.refreshToken,
      { refreshToken: refreshToken }
    );
    let token = TokenDto.fromResponse(response);
    return token;
  }

  async revokeRefreshToken(refreshToken) {
    await this._apiService.post(this._tokenEndpoints.revokeToken, {
      refreshToken: refreshToken,
    });
  }

  async validateToken(accessToken) {
    try {
      let response = await this._apiService.post(
        this._tokenEndpoints.validateToken,
        {},
        accessToken
      );
      if (response) return true;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this._logger.warn(error);
        throw error;
      }
      this._logger.error(error);
    }
  }

  /**
   * Get user information by user id.
   * @param {string} accessToken - access token
   * @param {string} userId - user id.
   * @returns an user information as an UserDto object
   */
  async getUserInformationById(accessToken, userId) {
    try {
      let response = await this._apiService.getById(
        this._userEndpoint,
        userId,
        accessToken
      );
      let user = UserDto.fromResponse(response);
      user.id = userId;
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this._logger.warn(error);
        throw error;
      }
      this._logger.error(error);
    }
  }
}
