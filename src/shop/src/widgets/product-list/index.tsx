'use client';

import { Perfume, PerfumeListItem } from '@/entities';
import { BaseStyle, montserrat, ProductListStyle } from '@/shared';
import clsx from 'clsx';

interface ProductListProps {
  products?: Perfume[];
}

export const ProductList = ({ products = [] }: ProductListProps) => {
  return (
    <div
      className={clsx(
        ProductListStyle.productContainer,
        BaseStyle.container,
        montserrat.className
      )}
    >
      {products.map((perfume) => (
        <PerfumeListItem key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
};
