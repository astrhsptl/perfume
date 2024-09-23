'use client';

import { perfumeListActions } from '@/entities';
import { perfumeAPIBuild, useAppDispatch } from '@/features';
import {
  BaseStyle,
  ParamManager,
  ProductListStyle,
  montserrat,
} from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';
import { HeaderFilterToggler, SearchForm } from './ui';

interface ProductsHeaderProps {}

export const ProductsHeader = async ({}: ProductsHeaderProps) => {
  const dispatch = useAppDispatch();
  const perfumeApi = perfumeAPIBuild.clientApi();
  const invalidate = useCallback(() => {
    ParamManager.invalidate(window);
    perfumeApi
      .fetchAll({
        params: {
          ...ParamManager.readParams(window),
        },
      })
      .then((data) => {
        if (data === null) return;
        dispatch(perfumeListActions.set(data.data.data));
      });
  }, []);

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
      <div
        className={clsx(ProductListStyle.__filterPlug, BaseStyle.pointer)}
        onClick={invalidate}
      >
        <Image src={'/reset.svg'} alt='Сброс' height={30} width={30} />
      </div>
      <SearchForm />
    </section>
  );
};
