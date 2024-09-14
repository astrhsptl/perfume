import { Perfume } from '@/entities';
import { perfumeTypeAPIBuild } from '@/features';
import { montserrat, ProductStyle } from '@/shared';
import { ImageContainerMobile, PayloadMobile } from '@/widgets';
import clsx from 'clsx';

interface ProductMobileProps {
  perfume: Perfume;
}
export const ProductMobile = async ({ perfume }: ProductMobileProps) => {
  const perfumeTypeAPI = perfumeTypeAPIBuild.serverApi();
  const perfumeType = await perfumeTypeAPI.fetchByID(perfume.perfume_type_id);

  return (
    <div
      className={clsx(
        ProductStyle.baseContainer,
        ProductStyle.mobile,
        montserrat.className
      )}
    >
      <ImageContainerMobile
        images={perfume.file.map(({ url }) => ({ link: url }))}
      />
      <PayloadMobile perfume={perfume} perfumeType={perfumeType.data} />
    </div>
  );
};
