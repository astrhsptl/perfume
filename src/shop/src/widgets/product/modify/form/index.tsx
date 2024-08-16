'use client';

import { Brand, PerfumeType, ProductCreateData } from '@/entities';
import { FormBaseLayout } from '@/features';
import {
  CustomSelect,
  DefaultButton,
  DefaultInput,
  PerfumeModify,
  ProductStyle,
} from '@/shared';
import { ImageInput } from '@/widgets';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  const submit: SubmitHandler<ProductCreateData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <FormBaseLayout
        methods={methods}
        onSub={submit}
        className={clsx(ProductStyle.productPayloadContainer)}
      >
        <section className={PerfumeModify.imageInputContainer}>
          <ImageInput />
        </section>
        <section className={PerfumeModify.dataInputContainer}>
          <DefaultInput placeholder='Наименование' name='name' />

          <DefaultInput placeholder='Аромат' name='aroma' />

          <SexChoose />

          <CustomSelect
            placeholder='Тип'
            options={perfumeTypes.map(({ id, name }) => ({
              value: id as string,
              label: name,
            }))}
            onChange={({ value }) => {
              methods.setValue('perfume_type_id', value);
            }}
          />

          <CustomSelect
            placeholder='Бренд'
            options={brands.map(({ id, title }) => ({
              value: id as string,
              label: title,
            }))}
            onChange={({ value }) => {
              methods.setValue('brand_id', value);
            }}
          />

          <DefaultButton type='submit'>Создать</DefaultButton>
        </section>
      </FormBaseLayout>
    </>
  );
}
