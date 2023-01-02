export default class BrandDto {
  id = null;
  name = "";

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static fromResponse(response) {
    return new BrandDto(response.id, response.name);
  }
}
