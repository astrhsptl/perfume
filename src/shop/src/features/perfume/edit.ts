'use client';

import { ProductUpdateData } from '@/entities';
import { EntityId } from '@/shared';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import { perfumeAPIBuild } from '../entity-requests';

export const editPerfume = async (
  perfumeId: EntityId,
  {
    aroma,
    brand_id,
    description,
    name,
    perfume_type_id,
    sex,
  }: ProductUpdateData,
  router: AppRouterInstance
) => {
  const perfumeApi = perfumeAPIBuild.clientApi();
  return perfumeApi
    .update(perfumeId, {
      aroma,
      brand_id,
      description,
      name,
      perfume_type_id,
      sex,
    })
    .then(() => {
      toast.success('Успешно сохранено!');
      router.push(`/products/${perfumeId}`);
    });
};
