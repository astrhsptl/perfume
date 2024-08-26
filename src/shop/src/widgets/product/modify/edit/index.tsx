'use client';

import {
  Brand,
  Perfume,
  PerfumeType,
  ProductUpdateData,
  VolumeInputType,
} from '@/entities';
import { editPerfume, FormBaseLayout } from '@/features';
import { useModal } from '@/features/use-modal';
import {
  CustomSelect,
  DefaultButton,
  DefaultInput,
  PerfumeModify,
  ProductStyle,
} from '@/shared';
import { AddVolume } from '@/widgets';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
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
  const methods = useForm<ProductUpdateData>({
    values: perfume,
  });
  const { child, toggle, modalPromise } = useModal<VolumeInputType>(
    <AddVolume />
  );
  const router = useRouter();

  const perfumeTypeMap = !perfumeTypes
    ? []
    : perfumeTypes.map(({ id, name }) => ({
        value: id as string,
        label: name,
      }));
  const brandMap = !brands
    ? []
    : brands.map(({ id, title }) => ({
        value: id as string,
        label: title,
      }));
  const initialPerfumeType = perfumeTypeMap.find(
    (item) => item.value === perfume.perfume_type_id
  );
  const initialBrand = brandMap.find((item) => item.value === perfume.brand_id);

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
                onChange={({ value }) => onChange(value)}
              />
            )}
          />

          <DefaultButton type='submit'>Сохранить</DefaultButton>
        </div>
      </FormBaseLayout>
      {child}
    </>
  );
}
