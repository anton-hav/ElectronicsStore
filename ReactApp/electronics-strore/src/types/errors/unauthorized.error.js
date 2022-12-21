import CustomError from "./custom.error";

/**
 * Custom error class represent 401 Unauthorized response from API server.
 */
export default class UnauthorizedError extends CustomError {
  constructor(message) {
    super("The API response contains status code 401 Unauthorized. " + message);
  }
}
