'use client';

import { currentFilterModal, filterModalActions } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { FilterStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { FilterModalHead, FilterModalSlider } from './ui';
import { FilterModalDropdown } from './ui/filter-modal-dropdown';

interface FilterModalProps {}

export const FilterModal = ({}: FilterModalProps) => {
  const dispatch = useAppDispatch();
  const { state } = useAppSelector(currentFilterModal);
  const { close } = filterModalActions;

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
        <FilterModalDropdown title='Пол' items={[1, 2]} />
        <FilterModalDropdown title='Категория' items={[1, 2]} />
        <FilterModalDropdown title='Бренд' items={[1, 2]} />
        <FilterModalDropdown title='Аромат' items={[1, 2]} />
      </section>
    </aside>
  );
};
