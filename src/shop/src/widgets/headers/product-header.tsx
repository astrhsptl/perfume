'use client';

import { currentHeaderModal, headerModalActions } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { NavLink, ProductListStyle, useClientModalStatement } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderLayout, SearchForm } from './ui';

interface ProductHeaderProps {}

export const ProductHeader = ({}: ProductHeaderProps) => {
  const { state: searchState, toggle: toggleSearch } =
    useClientModalStatement();
  const dispatch = useAppDispatch();
  const { state: navState } = useAppSelector(currentHeaderModal);
  const { toggle: navToggle } = headerModalActions;

  return (
    <HeaderLayout
      headerLinks={
        <>
          {searchState ? (
            <SearchForm className={ProductListStyle.searchFormModal} />
          ) : (
            <>
              <NavLink href={'/'}>Домой</NavLink>
              <NavLink href={'/products'}>Товары</NavLink>
              <NavLink href={'/products?category=1'}>Категории</NavLink>
            </>
          )}
        </>
      }
      headerIcons={
        <>
          <div onClick={toggleSearch}>
            <Image src={'/search.svg'} alt={'Поиск'} width={28} height={28} />
          </div>
          <Link href={'/favorite'}>
            <Image
              src={'/favorite.svg'}
              alt={'Избранное'}
              width={28}
              height={28}
            />
          </Link>
          <Link href={'/products?cart=1'}>
            <Image src={'/cart.svg'} alt={'Корзина'} width={28} height={28} />
          </Link>
        </>
      }
      tools={{
        state: navState,
        toggle: () => {
          dispatch(navToggle());
        },
      }}
    />
  );
};
