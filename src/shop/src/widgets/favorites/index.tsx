'use client';

import { Favorite, PerfumeListItem } from '@/entities';
import { checkAuth } from '@/features';
import { BaseStyle, montserrat, ProductListStyle } from '@/shared';
import clsx from 'clsx';
import { useEffect } from 'react';
import { WithEmpty } from '../product-list/ui';

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
        data.length > 0 && ProductListStyle.productContainer,
        BaseStyle.container,
        montserrat.className
      )}
    >
      <WithEmpty emptyCondition={data.length === 0}>
        {data.map(({ perfume }) => (
          <PerfumeListItem key={perfume.id} perfume={perfume} />
        ))}
      </WithEmpty>
    </div>
  );
};
