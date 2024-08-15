'use client';

import { ProductCreateData } from '@/entities';
import { brandAPIBuild, FormBaseLayout, perfumeTypeAPIBuild } from '@/features';
import { BaseStyle, DefaultInput, montserrat, ProductStyle } from '@/shared';
import { brandListKey, perfumeTypeListKey } from '@/shared/config';
import { BackLink, ImageInput } from '@/widgets';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';

// export const metadata: Metadata = {
//   title: 'Создание духов',
//   icons: {
//     icon: '/favicon.svg',
//   },
// };

interface PerfumeCreateProps {}

const darkStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#000',
    borderColor: '#fff',
    color: '#fff',
    boxShadow: 'none',
    fontSize: 14,
    '&:hover': {
      borderColor: '#777',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 14,
    backgroundColor: state.isSelected
      ? '#000'
      : state.isFocused
      ? '#000'
      : '#000',
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#000',
    color: '#fff',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#000',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#444',
      color: '#fff',
    },
  }),
};

export default function PerfumeCreatePage({}: PerfumeCreateProps) {
  const brandAPI = brandAPIBuild.clientApi();
  const perfumeTypeAPI = perfumeTypeAPIBuild.clientApi();
  const brands = useQuery({
    queryKey: brandListKey,
    queryFn: async () => await brandAPI.fetchAll(),
  });
  const perfumeTypes = useQuery({
    queryKey: perfumeTypeListKey,
    queryFn: async () => await perfumeTypeAPI.fetchAll(),
  });

  const methods = useForm<ProductCreateData>();
  const submit: SubmitHandler<ProductCreateData> = (data) => {
    console.log(data);
  };
  const { register } = methods;

  return (
    <div
      className={clsx(
        BaseStyle.container,
        ProductStyle.baseContainer,
        montserrat.className
      )}
    >
      <BackLink />
      <FormBaseLayout
        methods={methods}
        onSub={submit}
        className={clsx(ProductStyle.productPayloadContainer)}
        style={{ paddingTop: 70 }}
      >
        <section
          className='imageInput'
          style={{
            color: '#fff',
          }}
        >
          <ImageInput />
          <input
            type='text'
            placeholder='Description'
            {...register('description')}
          />
        </section>
        <section className='dataInput'>
          <Select
            placeholder='Тип'
            styles={darkStyles}
            options={
              perfumeTypes.isSuccess
                ? perfumeTypes.data.data.data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))
                : []
            }
          />
          <DefaultInput placeholder='Наименование' name='name' />
          <Select
            placeholder='Бренд'
            styles={darkStyles}
            options={
              brands.isSuccess
                ? brands.data.data.data.map(({ id, title }) => ({
                    value: id,
                    label: title,
                  }))
                : []
            }
          />
          <div>
            <p>Пол</p>
            <span>
              <input
                id='man'
                type='radio'
                name='sex'
                placeholder='Man'
                {...register('sex')}
              />
              <label htmlFor='man'>Мужской</label>
            </span>

            <span>
              <input
                id='woman'
                type='radio'
                name='sex'
                placeholder='Woman'
                style={{
                  background: 'black',
                }}
                {...register('sex')}
              />
              <label htmlFor='woman'>Женский</label>
            </span>
          </div>
          <DefaultInput placeholder='Аромат' name='aroma' />
        </section>
      </FormBaseLayout>
    </div>
  );
}
