'use client';

import { FilterItemsForm, Value } from '@/entities';
import { brandAPIBuild, FormBaseLayout, perfumeAPIBuild } from '@/features';
import { useModalContext } from '@/features/use-modal';
import { DefaultButton, FilterStyle, montserrat } from '@/shared';
import { brandListKey, perfumeTypeListKey } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FilterModalHead, FilterModalSlider } from './ui';
import { FilterModalDropdown } from './ui/filter-modal-dropdown';

interface FilterModalProps {}

export const FilterModal = ({}: FilterModalProps) => {
  const perfumeTypeApi = perfumeAPIBuild.clientApi();
  const brandApi = brandAPIBuild.clientApi();
  const brands = useQuery({
    queryKey: [brandListKey],
    queryFn: async () => (await brandApi.fetchAll()).data.data,
  });
  const perfumeTypes = useQuery({
    queryKey: [perfumeTypeListKey],
    queryFn: async () => (await perfumeTypeApi.fetchAll()).data.data,
  });
  const { resolve, reject } = useModalContext();
  const methods = useForm<FilterItemsForm>({
    values: {
      sex: [],
      perfume_type_id: [],
      brand_id: [],
      cost: { from: 0, to: 1000 },
    },
    defaultValues: {
      sex: [],
      perfume_type_id: [],
      brand_id: [],
      cost: { from: 0, to: 1000 },
    },
  });

  const submitter: SubmitHandler<FilterItemsForm> = (data) => resolve(data);

  const sexItems = [
    { key: 1, value: 'Мужской' },
    { key: 2, value: 'Женский' },
  ];
  const perfumeTypesItems = perfumeTypes.data?.map(({ id, name }) => ({
    key: id,
    value: name,
  }));
  const brandsItems = brands.data?.map(({ id, title }) => ({
    key: id,
    value: title,
  }));

  return (
    <aside
      className={clsx(
        FilterStyle.asideFilterContainer,
        montserrat.className,
        FilterStyle.active
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) resolve(null);
      }}
    >
      <FormBaseLayout
        className={clsx(FilterStyle.asideFilter, montserrat.className)}
        methods={methods}
        onSub={submitter}
      >
        <FilterModalHead reject={reject} />

        <Controller
          name='cost'
          render={({ field: { onChange } }) => (
            <FilterModalSlider
              min={0}
              max={1000}
              submitter={(data) => onChange(data)}
            />
          )}
        />

        <Controller
          name='sex'
          render={({ field: { onChange, value } }) => (
            <FilterModalDropdown
              title='Пол'
              items={sexItems}
              submitter={(item, state) => {
                if (state) {
                  return onChange([...value, item]);
                }

                return onChange(value.filter((e: Value) => e.key !== item.key));
              }}
            />
          )}
        />

        <Controller
          name='perfume_type_id'
          render={({ field: { onChange, value } }) => (
            <FilterModalDropdown
              title='Категория'
              items={perfumeTypesItems ?? []}
              submitter={(item, state) => {
                if (state) {
                  return onChange([...value, item]);
                }

                return onChange(value.filter((e: Value) => e.key !== item.key));
              }}
            />
          )}
        />

        <Controller
          name='brand_id'
          render={({ field: { onChange, value } }) => (
            <FilterModalDropdown
              title='Бренд'
              items={brandsItems ?? []}
              submitter={(item, state) => {
                if (state) {
                  return onChange([...value, item]);
                }

                return onChange(value.filter((e: Value) => e.key !== item.key));
              }}
            />
          )}
        />

        <DefaultButton type='submit' style={{ maxWidth: 400, marginTop: 20 }}>
          Применить
        </DefaultButton>
      </FormBaseLayout>
    </aside>
  );
};
