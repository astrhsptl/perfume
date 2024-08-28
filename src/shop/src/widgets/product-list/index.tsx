'use client';

import { Perfume, PerfumeListItem } from '@/entities';
import {
  BaseStyle,
  montserrat,
  ParamManager,
  ProductListStyle,
} from '@/shared';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';

interface ProductListProps {
  products?: Perfume[];
}

export const ProductList = ({ products = [] }: ProductListProps) => {
  const data = useMemo(() => products, [products]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (window) {
    console.log(ParamManager.readParams(window ?? globalThis));
  }

  return (
    <div
      className={clsx(
        ProductListStyle.productContainer,
        BaseStyle.container,
        montserrat.className
      )}
    >
      {data.map((perfume) => (
        <PerfumeListItem key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
};
