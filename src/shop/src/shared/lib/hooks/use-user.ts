import { User } from '@/entities';
import { AuthApiCore } from '@/shared';
import { AxiosResponse } from 'axios';

type ReturnType = string | AxiosResponse<User, any> | undefined;

export const useUser = async (
  access?: string,
  refresh?: string
): Promise<ReturnType | undefined> => {
  if (!access) return undefined;

  let user = await AuthApiCore.userByToken(access).catch(() => undefined);

  if (!user && refresh) {
    const newAccess = await AuthApiCore.refresh(refresh);

    return newAccess?.data.access_token;
  }

  return user;
};
