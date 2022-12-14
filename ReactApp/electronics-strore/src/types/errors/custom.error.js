/**
 * Represents a template for creating custom error classes
 */
export default class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
