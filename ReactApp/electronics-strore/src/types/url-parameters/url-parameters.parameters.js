/**
 * Base class for all Url parameters classes.
 */
export default class UrlSearchParameters {
  /**
   * Convert instance of UrlSearchParameters to URLSearchParams object
   * @returns new instance of URLSearchParams object
   */
  toURLSearchParams() {
    if (Object.keys(this).length > 0) {
      let search = new URLSearchParams(Object.entries(this));
      return search;
    }
  }
}
