import { BaseStyle, ProductListStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import { SearchForm } from './ui';

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
      <div className={ProductListStyle.filterToggleContainer}>
        <Image
          src={'/filter.svg'}
          alt={'filter icon perfume парфюм фильтр ростов ростов-на-дону'}
          height={17}
          width={21}
        />
      </div>
      <h1>Парфюм для вас</h1>
      <div className={ProductListStyle.__filterPlug}></div>
      <SearchForm />
    </section>
  );
};
