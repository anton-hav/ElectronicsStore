// Import custom types and utils
import { environment } from "../environment/environment";
import Logger from "../utils/logger";
import UnauthorizedError from "../types/errors/unauthorized.error"
import BadRequestError from "../types/errors/bad-request.error"

export default class ApiService {
  constructor() {
    this._logger = new Logger();
  }

  _getFullUrl(url) {
    return environment.apiUrl + url;    
  }

  async get(url, data = {}) {
    let fullUrl = new URL(`${this._getFullUrl(url)}`);
    if (Object.keys(data).length > 0) {
      fullUrl.search = new URLSearchParams(Object.entries(data)).toString();
    }

    let response = await fetch(fullUrl);
    return response.json();
  }

  async getById(url, id) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    let response = await fetch(fullUrl);
    return response.json();
  }

  async post(url, data, token) {
    
      let fullUrl = new URL(`${this._getFullUrl(url)}`);

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      if (token) {
        requestHeaders.append("Authorization", `Bearer ${token}`);
      }

      let response = await fetch(fullUrl, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
      if (response.status === 400){
        throw new BadRequestError();
      } else if (response.status === 401){
        throw new UnauthorizedError();
      }
      if (response.status === 200 
        || response.status === 201){
        return response.json();
      }      
  }

  put() {
    throw new Error("Not implemented");
  }

  async patch(url, data, id) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    let response = await fetch(fullUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(url, id) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    let response = await fetch(fullUrl, {
      method: "DELETE",
    });
    if (response.ok) return true;

    throw new Error("Failed to delete");
  }
}
