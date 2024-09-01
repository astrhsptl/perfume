'use client';

import { Favorite, PerfumeListItem } from '@/entities';
import { checkAuth } from '@/features';
import { BaseStyle, montserrat, ProductListStyle } from '@/shared';
import clsx from 'clsx';
import { useEffect } from 'react';

interface FavoritesListProps {
  willCredentialsUpdate?: boolean;
  data: Favorite[];
}

export const FavoritesList = ({
  data,
  willCredentialsUpdate,
}: FavoritesListProps) => {
  useEffect(() => {
    if (willCredentialsUpdate) checkAuth();
  }, [willCredentialsUpdate]);

  return (
    <div
      className={clsx(
        ProductListStyle.productContainer,
        BaseStyle.container,
        montserrat.className
      )}
    >
      {data.map(({ perfume }) => (
        <PerfumeListItem key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
};
