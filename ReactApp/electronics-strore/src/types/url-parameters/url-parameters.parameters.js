/**
 * Base class for all Url parameters classes.
 */
export default class UrlSearchParameters {
  /**
   * Convert instance of UrlSearchParameters to URLSearchParams object
   * @returns new instance of URLSearchParams object
   */
  toURLSearchParams() {
    const setArrayToSearch = (search, actor, property) => {
      if (actor[property].length > 0) {
        actor[property].forEach((value) => search.append(`${property}`, value));
      }
      return search;
    };

    /**
     * Set the primitive property value to the URLSearchParams
     * @param {URLSearchParams} search - URLSearchParams instance.
     * @param {object} actor - object that contains a primitive property.
     * @param {string} property - primitive property name.
     * @returns new instance of URLSearchParams object that contains search property.
     */
    const setPrimitivePropertyToSearch = (search, actor, property) => {
      if (actor[property] !== null) {
        search.set(`${property}`, actor[property]);
      }
      return search;
    };

    /**
     * Set complex property values to the URLSearchParams
     * @param {URLSearchParams} search - URLSearchParams instance.
     * @param {object} actor - object that contains a complex property.
     * @param {string} property - complex property name.
     * @returns new instance of URLSearchParams object that contains search property.
     */
    const setComplexPropertyToSearch = (search, actor, property) => {
      if (Object.keys(actor[property]).length > 0) {
        Object.keys(actor[property]).forEach((key) => {
          if (Array.isArray(actor[property][key])) {
            setArrayToSearch(search, actor[property], key);
          } else {
            setPrimitivePropertyToSearch(search, actor[property], key);
          }
        });
      }

      return search;
    };

    if (Object.keys(this).length > 0) {
      let search = new URLSearchParams();
      Object.keys(this).forEach((property) => {
        if (typeof this[property] === "object") {
          setComplexPropertyToSearch(search, this, property);
        } else if (Array.isArray(this[property])) {
          setArrayToSearch(search, this, property);
        } else {
          setPrimitivePropertyToSearch(search, this, property);
        }
      });
      return search;
    }
  }
}
