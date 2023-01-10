// Import custom types and utils
import { environment } from "../environment/environment";
import Logger from "../utils/logger";
import UnauthorizedError from "../types/errors/unauthorized.error";
import BadRequestError from "../types/errors/bad-request.error";
import ConflictError from "../types/errors/conflict.error";
import UrlSearchParameters from "../types/url-parameters/url-parameters.parameters";

export default class ApiService {
  constructor() {
    this._logger = new Logger();
  }

  _getFullUrl(url) {
    return environment.apiUrl + url;
  }

  async get(url, parameters = {}, token) {
    let fullUrl = new URL(`${this._getFullUrl(url)}`);
    if (parameters instanceof UrlSearchParameters) {
      let searchParams = parameters.toURLSearchParams();
      fullUrl.search = searchParams.toString();
    }

    const requestHeaders = new Headers();
    if (token) {
      requestHeaders.append("Authorization", `Bearer ${token}`);
    }

    let response = await fetch(fullUrl, {
      method: "GET",
      headers: requestHeaders,
    });
    if (response.status === 400) {
      throw new BadRequestError();
    }
    return response.json();
  }

  async getById(url, id, token) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    const requestHeaders = new Headers();
    if (token) {
      requestHeaders.append("Authorization", `Bearer ${token}`);
    }

    let response = await fetch(fullUrl, {
      method: "GET",
      headers: requestHeaders,
    });
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
    if (response.status === 400) {
      throw new BadRequestError();
    } else if (response.status === 401) {
      throw new UnauthorizedError();
    } else if (response.status === 409) {
      throw new ConflictError();
    }
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
  }

  put() {
    throw new Error("Not implemented");
  }

  async patch(url, data, id, token) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    if (token) {
      requestHeaders.append("Authorization", `Bearer ${token}`);
    }

    let response = await fetch(fullUrl, {
      method: "PATCH",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
    if (response.status === 400) {
      throw new BadRequestError();
    } else if (response.status === 401) {
      throw new UnauthorizedError();
    } else if (response.status === 409) {
      throw new ConflictError();
    }
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
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
