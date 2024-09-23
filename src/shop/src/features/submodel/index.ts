'use client';

import { Brand, BrandCreate, PerfumeType, PerfumeTypeCreate } from '@/entities';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { brandAPIBuild, perfumeTypeAPIBuild } from '../entity-requests';

export const useBrandModalSubscribe = (
  promiseBrand: Promise<BrandCreate> | null,
  brandListDispatch: React.Dispatch<React.SetStateAction<Brand[]>>
) => {
  const brandApi = brandAPIBuild.clientApi();
  useEffect(() => {
    promiseBrand
      ?.catch(() => null)
      .then(async (formPayload) => {
        if (!formPayload) return;

        toast('Создание бренда');

        const data = await brandApi.create(formPayload).catch(() => null);

        if (!data) {
          return toast.error('Ошибка при создании бренда');
        }

        brandListDispatch((b) => [...b, data.data]);
        return toast.success('Бренд успешно добавлен!');
      });
  }, [promiseBrand]);
};

export const usePerfumeTypeModalSubscribe = (
  promisePerfumeType: Promise<PerfumeTypeCreate> | null,
  perfumeTypeListDispatch: React.Dispatch<React.SetStateAction<PerfumeType[]>>
) => {
  const perfumeTypeApi = perfumeTypeAPIBuild.clientApi();
  useEffect(() => {
    promisePerfumeType
      ?.catch(() => null)
      .then(async (formPayload) => {
        if (!formPayload) return;

        toast('Создание категории');

        const data = await perfumeTypeApi.create(formPayload).catch(() => null);

        if (!data) {
          return toast.error('Ошибка при создании категории');
        }

        perfumeTypeListDispatch((b) => [...b, data.data]);
        return toast.success('Категория успешно добавлена!');
      });
  }, [promisePerfumeType]);
};
