import { NIL as NIL_UUID } from "uuid";

export default class UserDto {
  id = NIL_UUID;
  email = "";
  password = "";

  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
