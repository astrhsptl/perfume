import { DefaultButton, ProductStyle, lora } from '@/shared';
import clsx from 'clsx';
import { ImageContainer, VolumePoints } from './ui';

interface PayloadContainerProps {}

export const PayloadContainer = async ({}: PayloadContainerProps) => {
  return (
    <article className={ProductStyle.productPayloadContainer}>
      <ImageContainer />
      <section className={ProductStyle.productTextContainer}>
        <p
          style={{
            color: 'var(--gray-blur)',
          }}
        >
          Category
        </p>
        <p className={clsx(ProductStyle.title, lora.className)}>Name</p>
        <p style={{ marginBottom: 20 }}>777 $</p>
        <p>Объем, ml</p>
        <VolumePoints />
        <DefaultButton>В корзину</DefaultButton>
      </section>
    </article>
  );
};

export { ImageContainerMobile, PayloadMobile } from './ui';
