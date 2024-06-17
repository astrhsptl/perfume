import { WrongResponse } from '@/shared/model';
import { AxiosError } from 'axios';

export class BaseAPICore {
  retry = async <ResponseType>(
    cb: (tries: number) => ResponseType,
    { response }: AxiosError<WrongResponse>,
    tries: number
  ) => {
    if (response?.status && response.status >= 500) {
      throw new Error('Somethings wrong... Try later');
    }

    if (response?.status && response.status === 401) {
      throw new Error(response?.data.detail);
    }

    if (tries === 0) {
      throw new Error(response?.data.detail);
    }

    return cb.bind(this)(tries - 1);
  };
}
