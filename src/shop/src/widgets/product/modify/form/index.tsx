'use client';

import { Brand, PerfumeType, ProductCreateData } from '@/entities';
import { FormBaseLayout, productCreate } from '@/features';
import {
  CustomSelect,
  DefaultButton,
  DefaultInput,
  PerfumeModify,
  ProductStyle,
} from '@/shared';
import { ImageInput } from '@/widgets';
import clsx from 'clsx';
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
