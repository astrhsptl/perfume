'use client';

import { filterModalActions } from '@/entities';
import { useAppDispatch } from '@/features';
import { ProductListStyle } from '@/shared';
import Image from 'next/image';

interface HeaderFilterTogglerProps {}

export const HeaderFilterToggler = ({}: HeaderFilterTogglerProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={ProductListStyle.filterToggleContainer}
      onClick={() => dispatch(filterModalActions.toggle())}
    >
      <Image
        src={'/filter.svg'}
        alt={'Открыть фильтр'}
        height={17}
        width={21}
      />
    </div>
  );
};
