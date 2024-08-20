'use client';

import { ProductStyle } from '@/shared';
import clsx from 'clsx';
import { ReactNode } from 'react';

type VolumePointProps = {
  value: ReactNode;
  isActive?: boolean;
} & JSX.IntrinsicElements['span'];

export const VolumePoint = ({
  value,
  isActive = false,
  ...spanProps
}: VolumePointProps) => {
  return (
    <span
      className={clsx(
        ProductStyle.volumePoint,
        isActive && ProductStyle.active
      )}
      {...spanProps}
    >
      {value}
    </span>
  );
};
