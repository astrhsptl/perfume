import { BaseStyle, ProductListStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { HeaderFilterToggler, SearchForm } from './ui';

interface ProductsHeaderProps {}
export const ProductsHeader = async ({}: ProductsHeaderProps) => {
  return (
    <section
      className={clsx(
        ProductListStyle.headContainer,
        BaseStyle.container,
        montserrat.className
      )}
    >
      <HeaderFilterToggler />
      <h1>Парфюм для вас</h1>
      <div className={ProductListStyle.__filterPlug}></div>
      <SearchForm />
    </section>
  );
};
