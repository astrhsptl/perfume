'use client';

import { ProductListStyle } from '@/shared';
import React from 'react';

interface WithEmptyProps {
  emptyCondition?: boolean;
  children: React.ReactNode;
}

export const WithEmpty = ({
  children,
  emptyCondition = false,
}: WithEmptyProps) => {
  return (
    <>
      {emptyCondition ? (
        <div className={ProductListStyle.empty}>Пусто</div>
      ) : (
        children
      )}
    </>
  );
};
