import CustomError from "./custom.error";

/**
 * Custom error class represent BadRequest error from API server.
 */
export default class BadRequestError extends CustomError {
  constructor(message) {
    super("The API response contains status code 400. " + message);
  }
}
