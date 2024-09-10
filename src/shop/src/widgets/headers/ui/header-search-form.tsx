'use client';

import { perfumeListActions } from '@/entities';
import { perfumeAPIBuild, useAppDispatch } from '@/features';
import { ParamManager, ProductListStyle, useDebounceValue } from '@/shared';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type SearchFormProps = {} & JSX.IntrinsicElements['div'];

export const SearchForm = ({ ...props }: SearchFormProps) => {
  const dispatch = useAppDispatch();
  const perfumeApi = perfumeAPIBuild.clientApi();
  const [searchString, setSearchString] = useState<string>('');
  const debouncedSearch = useDebounceValue(searchString);

  useEffect(() => {
    ParamManager.setParam(window, 'name', debouncedSearch);
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
  }, [debouncedSearch]);

  return (
    <div className={clsx(ProductListStyle.searchForm)} {...props}>
      <input
        type='text'
        placeholder='Поиск'
        value={searchString}
        className={ProductListStyle.searchInput}
        onChange={(e) => setSearchString(() => e.target.value)}
      />
    </div>
  );
};
