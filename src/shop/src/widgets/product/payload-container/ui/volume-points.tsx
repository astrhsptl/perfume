import { ProductStyle } from '@/shared';
import clsx from 'clsx';

interface VolumePointsProps {}

export const VolumePoints = async ({}: VolumePointsProps) => {
  return (
    <div className={ProductStyle.volumeContainer}>
      <span className={clsx(ProductStyle.volumePoint)}>10</span>
      <span className={clsx(ProductStyle.volumePoint)}>20</span>
      <span className={clsx(ProductStyle.volumePoint)}>30</span>
      <span className={clsx(ProductStyle.volumePoint, ProductStyle.active)}>
        50
      </span>
      <span className={clsx(ProductStyle.volumePoint)}>100</span>
    </div>
  );
};
