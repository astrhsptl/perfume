import { Perfume } from '@/entities';
import { perfumeTypeAPIBuild } from '@/features';
import { BaseStyle, montserrat, ProductStyle } from '@/shared';
import { BackLink, PayloadContainer, ProductSlider } from '@/widgets';
import clsx from 'clsx';

interface ProductsDesktopProps {
  perfume: Perfume;
}
export const ProductsDesktop = async ({ perfume }: ProductsDesktopProps) => {
  const perfumeTypeAPI = perfumeTypeAPIBuild.serverApi();
  const perfumeType = await perfumeTypeAPI.fetchByID(perfume.perfume_type_id);

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
      <PayloadContainer perfume={perfume} perfumeType={perfumeType.data} />
      <ProductSlider />
    </div>
  );
};
