'use client';

import { filterModalActions } from '@/entities';
import { useAppDispatch } from '@/features';
import { FilterStyle } from '@/shared';
import Image from 'next/image';

interface FilterModalHeadProps {}

export const FilterModalHead = ({}: FilterModalHeadProps) => {
  const dispatch = useAppDispatch();
  const { close } = filterModalActions;

  return (
    <div className={FilterStyle.filterHead}>
      <div className={FilterStyle.filterTitle}>
        <h2>Фильтр</h2>
        <span>сброс</span>
      </div>
      <div
        className={FilterStyle.crossContainer}
        onClick={() => dispatch(close())}
      >
        <Image
          src={'/cross-close.svg'}
          alt='Закрыть фильтр'
          height={24}
          width={24}
        />
      </div>
    </div>
  );
};
