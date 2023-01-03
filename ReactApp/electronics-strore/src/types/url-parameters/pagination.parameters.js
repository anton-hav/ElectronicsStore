import UrlSearchParameters from "./url-parameters.parameters";

/**
 * Represents a pagination parameters for requesting to the storage
 */
export default class PaginationParameters extends UrlSearchParameters {
  /**
   * Items per page by default.
   */
  static defaultPageSize = 5;

  /**
   * @property {number} pageSize - Number of items per page
   */
  pageSize = null;
  /**
   * @property {number} pageNumber - Current page number
   */
  pageNumber = null;

  /**
   * PaginationParameters constructor
   * @param {*} pageSize number of items per page
   * @param {*} pageNumber current page number
   */
  constructor(pageSize, pageNumber) {
    super();
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }

  /**
   * Mapping from URLSearchParams to PaginationParameters object
   * @param {URLSearchParams} params - URLSearchParams object
   * @returns new instance of PaginationParameters
   */
  static fromUrlSearchParams(params) {
    let pageNumber = 1;
    let pageSize = PaginationParameters.defaultPageSize;
    if (params instanceof URLSearchParams) {
      if (params.has("page")) {
        let page = Number(params.get("page"));
        if (typeof page === "number") {
          pageNumber = page;
        }
      }
      if (params.has("size")) {
        let size = Number(params.get("size"));
        if (typeof size === "number") {
          pageSize = size;
        }
      }
    }
    return new PaginationParameters(pageSize, pageNumber);
  }

  /**
   * Set pagination parameters to the URLSearchParams object.
   * @param {URLSearchParams} search - URLSearchParams object
   */
  setParametersToUrl(search) {
    if (search instanceof URLSearchParams) {
      // The Pagination page starts at 1
      // to match the requirement of including the value in the URL
      search.set("page", this.pageNumber + 1);
      search.set("size", this.pageSize);
    }
  }
}
