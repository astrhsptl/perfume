import { Favorite } from '@/entities';
import { PaginatedResult } from '@/shared';
import { API_SERVER_URL } from '@/shared/config';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { checkAuthServer } from '../auth';

type DataResponse = {
  willUpdateCredentials: boolean;
  data: PaginatedResult<Favorite>;
};

export const fetchFavorites = async (accessToken: string) => {
  return axios.get<PaginatedResult<Favorite>>(
    `${API_SERVER_URL}/v1/favourite/user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const fetchFavoritesData = async (
  accessToken: string,
  willUpdateCredentials: boolean = false
): Promise<DataResponse | null> => {
  const data = await fetchFavorites(accessToken).catch(
    async ({ response }: AxiosError) => {
      if (response?.status === 401) {
        const user = await checkAuthServer().catch(() => null);

        if (user === null) {
          return redirect('/sign-in');
        }

        willUpdateCredentials = true;
        return fetchFavorites(user as string);
      }

      return null;
    }
  );

  if (!data?.data) return null;

  return {
    willUpdateCredentials,
    data: data.data,
  };
};
