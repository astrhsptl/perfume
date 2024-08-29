'use client';

import {
  currentPerfumeList,
  Perfume,
  perfumeListActions,
  PerfumeListItem,
} from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { BaseStyle, montserrat, ProductListStyle } from '@/shared';
import clsx from 'clsx';
import { useEffect } from 'react';

interface ProductListProps {
  products?: Perfume[];
}

export const ProductList = ({ products = [] }: ProductListProps) => {
  const dispatch = useAppDispatch();
  const storedProducts = useAppSelector(currentPerfumeList);

  useEffect(() => {
    dispatch(perfumeListActions.set(products));
  }, [products]);

  return (
    <div
      className={clsx(
        ProductListStyle.productContainer,
        BaseStyle.container,
        montserrat.className
      )}
    >
      {storedProducts.data.map((perfume) => (
        <PerfumeListItem key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
};
