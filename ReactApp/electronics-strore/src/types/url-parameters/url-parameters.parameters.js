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
      let search = new URLSearchParams();
      Object.keys(this).forEach((property) => {
        if (typeof this[property] === "object") {
          if (Object.keys(this[property]).length > 0) {
            Object.keys(this[property]).forEach((key) => {
              if (this[property][key] !== null) {
                search.set(`${key}`, this[property][key]);
              }
            });
          }
        } else {
          if (this[property] !== null) {
            search.set(`${property}`, this[property]);
          }
        }
      });
      return search;
    }
  }
}
