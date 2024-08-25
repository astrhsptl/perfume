'use client';

import {
  Brand,
  PerfumeType,
  ProductCreateData,
  VolumeInputType,
} from '@/entities';
import { FormBaseLayout, productCreate } from '@/features';
import { useModal } from '@/features/use-modal';
import {
  CustomSelect,
  DefaultButton,
  DefaultInput,
  PerfumeModify,
  ProductStyle,
} from '@/shared';
import { AddVolume, ImageInput } from '@/widgets';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { SexChoose } from './ui';
import { VolumePicker } from './ui/volume-picker';

interface PerfumeCreateProps {
  brands: Brand[];
  perfumeTypes: PerfumeType[];
}

export default function PerfumeCreateForm({
  brands,
  perfumeTypes,
}: PerfumeCreateProps) {
  const methods = useForm<ProductCreateData>({
    defaultValues: {
      volumes: [],
    },
  });
  const volumeControl = useController<ProductCreateData>({
    name: 'volumes',
    control: methods.control,
  });

  const { child, toggle, modalPromise } = useModal<VolumeInputType>(
    <AddVolume />
  );

  const router = useRouter();

  useEffect(() => {
    modalPromise
      ?.catch(() => null)
      .then((data) => {
        if (!data) return;

        volumeControl.field.onChange([...methods.getValues('volumes'), data]);
      });
  }, [modalPromise]);

  return (
    <>
      <FormBaseLayout
        key={1}
        methods={methods}
        onSub={(data: ProductCreateData) => productCreate(data, router)}
        className={clsx(ProductStyle.productPayloadContainer)}
      >
        <div className={PerfumeModify.imageInputContainer}>
          <ImageInput />
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
                options={
                  !perfumeTypes
                    ? []
                    : perfumeTypes.map(({ id, name }) => ({
                        value: id as string,
                        label: name,
                      }))
                }
                onChange={({ value }) => onChange(value)}
              />
            )}
          />

          <VolumePicker toggle={toggle} />

          <Controller
            name='brand_id'
            render={({ field: { onChange } }) => (
              <CustomSelect
                placeholder='Бренд'
                options={
                  !brands
                    ? []
                    : brands.map(({ id, title }) => ({
                        value: id as string,
                        label: title,
                      }))
                }
                onChange={({ value }) => onChange(value)}
              />
            )}
          />

          <DefaultButton type='submit'>Создать</DefaultButton>
        </div>
      </FormBaseLayout>
      {child}
    </>
  );
}
