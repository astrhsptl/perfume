'use client';

import { FilterStyle } from '@/shared';
import Image from 'next/image';

interface FilterModalHeadProps {
  reject: () => void;
}

export const FilterModalHead = ({ reject }: FilterModalHeadProps) => {
  return (
    <div className={FilterStyle.filterHead}>
      <div className={FilterStyle.filterTitle}>
        <h2>Фильтр</h2>
      </div>
      <div className={FilterStyle.crossContainer} onClick={() => reject()}>
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
