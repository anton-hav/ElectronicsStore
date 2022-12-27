export default class CategoryDto {
  id = null;
  name = "";
  parentId = null;
  children = [];

  constructor(id, name, parentId, children) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
    if (children !== undefined) {
      this.children = children;
    } else {
      this.children = [];
    }
  }

  /**
   * Deep clone
   * @returns clone of the current object
   */
  clone() {
    let id = this.id;
    let name = this.name;
    let parentId = this.parentId;
    let children =
      this.children.length > 0 ? this.children.map((c) => c.clone()) : [];
    return new CategoryDto(id, name, parentId, children);
  }

  /**
   * Mapping from api response (as an json) to CategoryDto.
   * @param {*} response - response object as an JSON.
   * @returns
   */
  static fromResponse(response) {
    return new CategoryDto(
      response.id,
      response.name,
      response.parentCategoryId
      //response.children.map((child) => CategoryDto.fromResponse(child))
    );
  }
}
