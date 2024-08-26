'use client';

import { currentFilterModal, filterModalActions } from '@/entities';
import {
  brandAPIBuild,
  perfumeAPIBuild,
  useAppDispatch,
  useAppSelector,
} from '@/features';
import { DefaultButton, FilterStyle, montserrat } from '@/shared';
import { brandListKey, perfumeTypeListKey } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
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
  const dispatch = useAppDispatch();
  const { state } = useAppSelector(currentFilterModal);
  const { close } = filterModalActions;
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
        state && FilterStyle.active
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(close());
      }}
    >
      <section className={clsx(FilterStyle.asideFilter, montserrat.className)}>
        <FilterModalHead />
        <FilterModalSlider min={0} max={100} />
        <FilterModalDropdown title='Пол' items={sexItems} />
        <FilterModalDropdown
          title='Категория'
          items={perfumeTypesItems ?? []}
        />
        <FilterModalDropdown title='Бренд' items={brandsItems ?? []} />
        {/* <FilterModalDropdown title='Аромат' items={[1, 2]} /> */}
        <DefaultButton style={{ maxWidth: 400, marginTop: 20 }}>
          Применить
        </DefaultButton>
      </section>
    </aside>
  );
};
