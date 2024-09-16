'use client';

import { PerfumeCreate, ProductCreateData } from '@/entities';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import {
  fileAPIBuild,
  perfumeAPIBuild,
  volumeAPIBuild,
} from '../entity-requests';

export const productCreate = async (
  {
    aroma,
    brand_id,
    description,
    images = [],
    name,
    perfume_type_id,
    sex,
    volumes = [],
  }: ProductCreateData,
  router: AppRouterInstance
) => {
  toast('Сохранение...');

  const imageArray = Array.from(images);
  const perfumeAPI = perfumeAPIBuild.clientApi();
  const fileAPI = fileAPIBuild.clientApi();
  const volumeApi = volumeAPIBuild.clientApi();

  const perfumeData: PerfumeCreate = {
    aroma,
    brand_id,
    description,
    name,
    perfume_type_id,
    sex,
  };

  const perfume = await perfumeAPI.create(perfumeData);

  imageArray.map(({ file }) => {
    const data = new FormData();
    data.append('file', file);

    fileAPI.create(data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
      params: {
        perfume_id: perfume.data.id,
      },
    });
  });

  Promise.allSettled(
    volumes.map((volume) => {
      volumeApi.create({ ...volume, perfume_id: perfume.data.id });
    })
  ).then(() => {
    toast.success('Сохранено');
  });

  return router.push(`/products`);
};
