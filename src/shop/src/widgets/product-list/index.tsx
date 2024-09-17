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
import { WithEmpty } from './ui';

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
        storedProducts.data.length > 0 && ProductListStyle.productContainer,
        BaseStyle.container,
        montserrat.className
      )}
    >
      <WithEmpty emptyCondition={storedProducts.data.length === 0}>
        {storedProducts.data.map((perfume) => (
          <PerfumeListItem key={perfume.id} perfume={perfume} />
        ))}
      </WithEmpty>
    </div>
  );
};
