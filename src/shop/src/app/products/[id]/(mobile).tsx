import { montserrat, ProductStyle } from '@/shared';
import { ImageContainerMobile, PayloadMobile } from '@/widgets';
import clsx from 'clsx';

interface ProductMobileProps {}
export const ProductMobile = async ({}: ProductMobileProps) => {
  return (
    <div
      className={clsx(
        ProductStyle.baseContainer,
        ProductStyle.mobile,
        montserrat.className
      )}
    >
      <ImageContainerMobile />
      <PayloadMobile />
    </div>
  );
};
