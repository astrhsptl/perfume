import { CredentialStorage, EntityId } from '@/shared';
import { API_SERVER_URL } from '@/shared/config';
import axios, { AxiosError } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import { checkAuth } from '../auth';

export interface CreationData {
  data: 'Entity created' | 'Entity deleted';
}

export const createRequest = async (perfumeId: EntityId) => {
  const accessToken = CredentialStorage.get('access');
  return await axios.post<CreationData>(
    `${API_SERVER_URL}/v1/favourite/check/toggle`,
    {
      perfume_id: perfumeId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const create = async (
  perfumeId: EntityId,
  router: AppRouterInstance
) => {
  const creationData = await createRequest(perfumeId).catch(
    async ({ response }: AxiosError) => {
      if (response?.status === 401) {
        const user = await checkAuth().catch(() => null);
        if (!user) {
          return router.push('/sign-in');
        }

        return await createRequest(perfumeId);
      }

      toast.error('Неизвестная ошибка. Попробуйте еще раз');
      return null;
    }
  );

  if (!creationData?.data) return;

  if (creationData?.data.data === 'Entity created') {
    return toast.success('Товар добавлен в избраное');
  }

  return toast.success('Товар удален из избраного');
};
