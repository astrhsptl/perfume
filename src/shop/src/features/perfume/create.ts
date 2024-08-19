'use client';

import { PerfumeCreate, ProductCreateData } from '@/entities';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  fileAPIBuild,
  perfumeAPIBuild,
  volumeAPIBuild,
} from '../entity-requests';

export const productCreate: SubmitHandler<ProductCreateData> = async ({
  aroma,
  brand_id,
  description,
  images = [],
  name,
  perfume_type_id,
  sex,
  volumes = [],
}) => {
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

  imageArray.map((img) => {
    const data = new FormData();
    data.append('file', img);

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

  volumes.map((volume) => {
    volumeApi.create({ ...volume, perfume_id: perfume.data.id });
  });

  toast.success('Сохранено');
};
