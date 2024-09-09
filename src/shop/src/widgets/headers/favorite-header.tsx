import { BaseStyle, montserrat, ProductListStyle } from '@/shared';
import clsx from 'clsx';

interface FavoriteHeaderProps {}
export const FavoriteHeader = async ({}: FavoriteHeaderProps) => {
  return (
    <section
      className={clsx(
        ProductListStyle.headContainer,
        BaseStyle.container,
        montserrat.className
      )}
      style={{
        justifyContent: 'center',
      }}
    >
      <h1>Избранное</h1>
    </section>
  );
};
