import CustomError from "./custom.error";

/**
 * Custom error class represent Conflict error from API server.
 */
export default class ConflictError extends CustomError {
  constructor(message) {
    super("The API response contains a status code 409 Conflict. " + message);
  }
}
