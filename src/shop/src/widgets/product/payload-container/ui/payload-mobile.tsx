import { DefaultButton, ProductStyle } from '@/shared';
import clsx from 'clsx';

interface PayloadMobileProps {}
export const PayloadMobile = async ({}: PayloadMobileProps) => {
  return (
    <article className={ProductStyle.mobilePayloadContainer}>
      <p className={clsx(ProductStyle.mobile, ProductStyle.category)}>
        Category
      </p>
      <p className={clsx(ProductStyle.mobile, ProductStyle.name)}>Name</p>
      <div className={clsx(ProductStyle.mobile, ProductStyle.valueContainer)}>
        <span>95$</span>
        <span
          className={clsx(ProductStyle.mobile, ProductStyle.volumeContainer)}
        >
          <span className={clsx(ProductStyle.mobile, ProductStyle.volume)}>
            объем
          </span>
          <DefaultButton
            theme='light'
            style={{
              height: 40,
              fontSize: 12,
            }}
          >
            В корзину
          </DefaultButton>
        </span>
      </div>
      <p>Description</p>
    </article>
  );
};
