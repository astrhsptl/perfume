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
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { SexChoose } from './ui';

interface PerfumeCreateProps {
  brands: Brand[];
  perfumeTypes: PerfumeType[];
}

export default function PerfumeCreateForm({
  brands,
  perfumeTypes,
}: PerfumeCreateProps) {
  const { child, toggle } = useModal<VolumeInputType>(<AddVolume />);
  const methods = useForm<ProductCreateData>();

  return (
    <>
      <FormBaseLayout
        methods={methods}
        onSub={productCreate}
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
            onChange={({ value }) => {
              methods.setValue('perfume_type_id', value);
            }}
          />

          <div>
            <p style={{ marginBottom: 10 }}>Объем</p>
            {methods.getValues('volumes')?.map((volume, index) => {
              return (
                <span key={index} className={clsx(ProductStyle.volumePoint)}>
                  {volume.volume}
                </span>
              );
            })}
            <span
              style={{
                display: 'block',
                height: 40,
                width: 40,
                position: 'relative',
              }}
              onClick={() =>
                toggle()
                  ?.catch()
                  .then((data) => {
                    console.log(data);

                    const volumes = methods.getValues('volumes') ?? [];
                    methods.setValue('volumes', [...volumes, data]);
                  })
              }
            >
              <Image
                src={'/volume-input.svg'}
                alt='Добавить объем'
                fill={true}
              />
              {child}
            </span>
          </div>

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
            onChange={({ value }) => {
              methods.setValue('brand_id', value);
            }}
          />

          <DefaultButton type='submit'>Создать</DefaultButton>
        </div>
      </FormBaseLayout>
    </>
  );
}
