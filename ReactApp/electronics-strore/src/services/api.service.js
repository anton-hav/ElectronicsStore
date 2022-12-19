// Import data transfer objects and utils
import { environment } from "../environment/environment";
import Logger from "../utils/logger";

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

  async post(url, data) {
    try {
      let fullUrl = new URL(`${this._getFullUrl(url)}`);

      let response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200 || response.status === 201){
        return response.json();
      }
      
      return null;
    } catch (error) {
      this._logger.error(error.message);
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
