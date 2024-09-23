'use client';

import {
  Brand,
  BrandCreate,
  Perfume,
  PerfumeCreate,
  PerfumeType,
  ProductUpdateData,
  VolumeInputType,
} from '@/entities';
import {
  editPerfume,
  FormBaseLayout,
  useBrandModalSubscribe,
  usePerfumeTypeModalSubscribe,
} from '@/features';
import { useModal } from '@/features/use-modal';
import {
  CustomSelect,
  DefaultButton,
  DefaultInput,
  PerfumeModify,
  ProductStyle,
} from '@/shared';
import { AddBrand, AddPerfumeType, AddVolume } from '@/widgets';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SexChoose } from '../form/ui';
import { ImageEdit, VolumeEdit } from './ui';

interface PerfumeEditProps {
  perfume: Perfume;
  brands: Brand[];
  perfumeTypes: PerfumeType[];
}

export function PerfumeEditForm({
  perfume,
  brands,
  perfumeTypes,
}: PerfumeEditProps) {
  const router = useRouter();
  const [brandList, setBrandList] = useState<Brand[]>(brands ?? []);
  const [perfumeTypeList, setPerfumeTypeList] = useState<PerfumeType[]>(
    perfumeTypes ?? []
  );
  const methods = useForm<ProductUpdateData>({
    values: perfume,
  });
  const { child, toggle, modalPromise } = useModal<VolumeInputType>(
    <AddVolume />
  );
  const {
    child: childType,
    toggle: toggleType,
    modalPromise: promiseType,
  } = useModal<PerfumeCreate>(<AddPerfumeType />);
  const {
    child: childBrand,
    toggle: toggleBrand,
    modalPromise: promiseBrand,
  } = useModal<BrandCreate>(<AddBrand />);

  const { initialPerfumeType, perfumeTypeMap } = useMemo(() => {
    const perfumeTypeMap = perfumeTypeList.map(({ id, name }) => ({
      value: id as string,
      label: name,
    }));
    const initialPerfumeType = perfumeTypeMap.find(
      (item) => item.value === perfume.perfume_type_id
    );
    return { perfumeTypeMap, initialPerfumeType };
  }, [perfumeTypeList]);

  const { brandMap, initialBrand } = useMemo(() => {
    const brandMap = brandList.map(({ id, title }) => ({
      value: id as string,
      label: title,
    }));
    const initialBrand = brandMap.find(
      (item) => item.value === perfume.brand_id
    );
    return { brandMap, initialBrand };
  }, [brandList]);

  useBrandModalSubscribe(promiseBrand, setBrandList);
  usePerfumeTypeModalSubscribe(promiseType, setPerfumeTypeList);

  return (
    <>
      <FormBaseLayout
        key={1}
        methods={methods}
        onSub={(data: ProductUpdateData) =>
          editPerfume(perfume.id, data, router)
        }
        className={clsx(ProductStyle.productPayloadContainer)}
      >
        <div className={PerfumeModify.imageInputContainer}>
          <ImageEdit perfume={perfume} />
        </div>
        <div className={PerfumeModify.dataInputContainer}>
          <DefaultInput
            placeholder='Наименование'
            name='name'
            registerOptions={{
              required: {
                message: 'Укажите имя',
                value: true,
              },
            }}
          />

          <DefaultInput
            placeholder='Аромат'
            name='aroma'
            registerOptions={{
              required: {
                message: 'Укажите аромат',
                value: true,
              },
            }}
          />

          <SexChoose />

          <Controller
            name='perfume_type_id'
            render={({ field: { onChange } }) => (
              <CustomSelect
                placeholder='Тип'
                options={perfumeTypeMap}
                value={initialPerfumeType}
                modifyHandler={toggleType}
                onChange={({ value }) => onChange(value)}
              />
            )}
          />

          <VolumeEdit
            perfumeId={perfume.id}
            toggle={toggle}
            modal={modalPromise}
          />

          <Controller
            name='brand_id'
            render={({ field: { onChange } }) => (
              <CustomSelect
                placeholder='Бренд'
                options={brandMap}
                value={initialBrand}
                modifyHandler={toggleBrand}
                onChange={({ value }) => onChange(value)}
              />
            )}
          />

          <DefaultButton type='submit'>Сохранить</DefaultButton>
        </div>
      </FormBaseLayout>
      {child}
      {childBrand}
      {childType}
    </>
  );
}
