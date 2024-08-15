import { User } from '@/entities';
import { ISignIn, ISignUp, TokenPair, WrongResponse } from '@/shared';
import { API_SERVER_URL } from '@/shared/config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { BaseAPICore } from '../base';

const DefaultTriesCount = 2;

class _Auth extends BaseAPICore {
  public url: string;

  constructor() {
    super();
    this.url = `${API_SERVER_URL}/auth`;
  }

  async signIn(
    data: ISignIn,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<TokenPair>> {
    console.log(`${this.url}/sign-in`);
    return await axios
      .post<TokenPair>(`${this.url}/sign-in`, data)
      .catch((error: AxiosError<WrongResponse>) => {
        return this.retry<ReturnType<typeof this.signIn>>(
          (tries) => this.signIn(data, tries),
          error,
          tries
        );
      });
  }

  async signUp(
    data: ISignUp,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<User>> {
    return await axios
      .post<User>(`${this.url}/sign-up`, data)
      .catch((error: AxiosError<WrongResponse>) => {
        return this.retry<ReturnType<typeof this.signUp>>(
          (tries) => this.signUp(data, tries),
          error,
          tries
        );
      });
  }

  async refresh(
    data: string,
    tries = DefaultTriesCount
  ): Promise<
    AxiosResponse<{
      access_token: string;
    }>
  > {
    console.log(`${this.url}/refresh-token`);

    return await axios
      .post<{
        access_token: string;
      }>(`${this.url}/refresh-token`, { refresh_token: data })
      .catch((error: AxiosError<WrongResponse>) => {
        return this.retry<ReturnType<typeof this.refresh>>(
          (tries) => this.refresh(data, tries),
          error,
          tries
        );
      });
  }

  async userByToken(
    token: string,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<User>> {
    return await axios
      .get<User>(`${this.url}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error: AxiosError<WrongResponse>) => {
        return this.retry<ReturnType<typeof this.userByToken>>(
          (tries) => this.userByToken(token, tries),
          error,
          tries
        );
      });
  }
}

export const AuthApiCore = new _Auth();
