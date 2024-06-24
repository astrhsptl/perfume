'use client';

import { currentFilterModal, filterModalActions } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { FilterStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { FilterModalHead } from './ui';

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
        !state && FilterStyle.active
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(close());
      }}
    >
      <section className={clsx(FilterStyle.asideFilter)}>
        <FilterModalHead />
        <div className='costPicker'></div>
      </section>
    </aside>
  );
};
