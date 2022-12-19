import { NIL as NIL_UUID } from "uuid";

export default class TokenDto {
  accessToken = "";
  role = "";
  userId = NIL_UUID;
  tokenExpiration = null;
  refreshToken = NIL_UUID;

  constructor(accessToken, role, userId, tokenExpiration, refreshToken) {
    this.accessToken = accessToken;
    this.role = role;
    this.userId = userId;
    this.tokenExpiration = tokenExpiration;
    this.refreshToken = refreshToken;
  }

  static fromResponse(response) {
    return new TokenDto(
      response.accessToken,
      response.role,
      response.userId,
      response.tokenExpiration,
      response.refreshToken
    );
  }
}
