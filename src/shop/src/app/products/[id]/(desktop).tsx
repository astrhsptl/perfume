import { BaseStyle, montserrat, ProductStyle } from '@/shared';
import { BackLink, PayloadContainer, ProductSlider } from '@/widgets';
import clsx from 'clsx';

interface ProductsDesktopProps {
  id?: string;
}
export const ProductsDesktop = async ({ id }: ProductsDesktopProps) => {
  console.log(id);

  return (
    <div
      className={clsx(
        BaseStyle.container,
        ProductStyle.baseContainer,
        ProductStyle.desktop,
        montserrat.className
      )}
      style={{ paddingTop: 70 }}
    >
      <BackLink />
      <PayloadContainer />
      <ProductSlider />
    </div>
  );
};
