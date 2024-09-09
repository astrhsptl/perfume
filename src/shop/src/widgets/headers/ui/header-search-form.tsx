'use client';

import { FormBaseLayout } from '@/features';
import { ProductListStyle } from '@/shared';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearchString } from './types';

type SearchFormProps = {} & JSX.IntrinsicElements['form'];

export const SearchForm = ({ ...props }: SearchFormProps) => {
  const methods = useForm<ISearchString>();
  const search: SubmitHandler<ISearchString> = (data) => {};
  return (
    <FormBaseLayout
      methods={methods}
      onSub={search}
      className={ProductListStyle.searchForm}
      {...props}
    >
      <input
        type='text'
        placeholder='Поиск'
        className={ProductListStyle.searchInput}
        {...methods.register('search', {})}
      />
    </FormBaseLayout>
  );
};
