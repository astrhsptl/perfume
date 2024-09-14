'use server';

import { AuthApiCore } from '@/shared';

export const checkAuthServer = async (access?: string, refresh?: string) => {
  const user = await AuthApiCore.userByToken(access)
    .then((user) => {
      if (!user) null;

      return user.data;
    })
    .catch(() => null);

  if (user) return user;

  if ((!access && !refresh) || !refresh) {
    return null;
  }

  if (!access) {
    const newAccess = await AuthApiCore.refresh(refresh).catch(() => null);

    if (newAccess === null) {
      return null;
    }

    return newAccess.data.access_token;
  }
};
