import {
  _CredentialStorage,
  CredentialStorage,
  EntityId,
  PaginatedResult,
  WrongResponse,
} from '@/shared';
import { API_SERVER_URL } from '@/shared/config';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { BaseAPICore } from '../base';

const DefaultTriesCount = 2;

class APICore<FetchType, RequestType> extends BaseAPICore {
  public url;
  public CredentialStorage: _CredentialStorage | ReadonlyRequestCookies | null =
    null;
  constructor(
    url: string,
    cs: _CredentialStorage | ReadonlyRequestCookies | null = null
  ) {
    super();
    this.url = `${API_SERVER_URL}/v1/${url}/`;
    this.CredentialStorage = cs;
  }

  async fetchAll(
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount
  ): Promise<AxiosResponse<PaginatedResult<FetchType>>> {
    const requestConfig = this.setAuthenticationHeader(RequestConfig);

    return await axios
      .get<PaginatedResult<FetchType>>(`${this.url}get_all`, requestConfig)
      .catch((error: AxiosError<WrongResponse>) =>
        this.retry<ReturnType<typeof this.fetchAll>>(
          (tries) => this.fetchAll(requestConfig, tries),
          error,
          tries
        )
      );
  }

  async fetchByID(
    id: EntityId,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount
  ): Promise<AxiosResponse<FetchType>> {
    const url = `${this.url}${id}/`;
    const requestConfig = this.setAuthenticationHeader(RequestConfig);

    return await axios
      .get<FetchType>(url, requestConfig)
      .catch((error: AxiosError<WrongResponse>) =>
        this.retry<ReturnType<typeof this.fetchByID>>(
          (tries) => this.fetchByID(id, requestConfig, tries),
          error,
          tries
        )
      );
  }

  async create(
    data: RequestType,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount
  ): Promise<AxiosResponse<FetchType>> {
    const requestConfig = this.setAuthenticationHeader(RequestConfig);

    const result = await axios
      .post<FetchType>(`${this.url}/create`, data, requestConfig)
      .catch((error: AxiosError<WrongResponse>) =>
        this.retry<ReturnType<typeof this.create>>(
          (tries) => this.create(data, requestConfig, tries),
          error,
          tries
        )
      );

    return result;
  }

  async update(
    id: EntityId,
    data: Partial<RequestType>,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount
  ): Promise<AxiosResponse<FetchType>> {
    const url = `${this.url}${id}/`;
    const requestConfig = this.setAuthenticationHeader(RequestConfig);

    return await axios
      .patch<FetchType>(url, data, requestConfig)
      .catch((error: AxiosError<WrongResponse>) =>
        this.retry<ReturnType<typeof this.update>>(
          (tries) => this.update(id, data, requestConfig, tries),
          error,
          tries
        )
      );
  }

  async remove(
    id: EntityId,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount
  ): Promise<AxiosResponse<FetchType>> {
    const url = `${this.url}${id}/`;
    const requestConfig = this.setAuthenticationHeader(RequestConfig);

    return await axios
      .delete<FetchType>(url, requestConfig)
      .catch((error: AxiosError<WrongResponse>) =>
        this.retry<ReturnType<typeof this.remove>>(
          (tries) => this.remove(id, requestConfig, tries),
          error,
          tries
        )
      );
  }

  setAuthenticationHeader(RequestConfig: AxiosRequestConfig) {
    if (!this.CredentialStorage) {
      return RequestConfig;
    }

    const headerValue = `Bearer ${this.CredentialStorage.get('access')}`;

    if (!RequestConfig.headers) {
      RequestConfig['headers'] = {};
    }

    RequestConfig.headers['Authorization'] = headerValue;

    return RequestConfig;
  }

  public compile() {
    return {
      url: this.url,
      credentialStorage: this.CredentialStorage,
      fetchAll: this.fetchAll,
      fetchByID: this.fetchByID,
      create: this.create,
      update: this.update,
      remove: this.remove,
      setAuthenticationHeader: this.setAuthenticationHeader,
      retry: this.retry,
    };
  }
}

export const getAPICore = <FetchType, RequestType>(url: string) => {
  const apiCore = new APICore<FetchType, RequestType>(url).compile();

  return {
    serverApi: (cookies: ReadonlyRequestCookies | null = null) => {
      apiCore.credentialStorage = cookies;
      return apiCore;
    },
    clientApi: () => {
      apiCore.credentialStorage = CredentialStorage;
      return apiCore;
    },
  };
};
