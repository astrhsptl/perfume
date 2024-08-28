'use client';

import { useModal } from '@/features/use-modal';
import { ProductListStyle } from '@/shared';
import { FilterModal } from '@/widgets/modals';
import Image from 'next/image';
import { useEffect } from 'react';

interface HeaderFilterTogglerProps {}

export const HeaderFilterToggler = ({}: HeaderFilterTogglerProps) => {
  const { child, modalPromise, toggle } = useModal(<FilterModal />);

  useEffect(() => {
    modalPromise?.catch(() => null).then((data) => console.log(data));
  }, [modalPromise]);

  return (
    <>
      <div
        className={ProductListStyle.filterToggleContainer}
        onClick={() => toggle()}
      >
        <Image
          src={'/filter.svg'}
          alt={'Открыть фильтр'}
          height={17}
          width={21}
        />
      </div>
      {child}
    </>
  );
};
