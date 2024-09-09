'use client';

import {
  cartModalActions,
  currentHeaderModal,
  headerModalActions,
  User,
} from '@/entities';
import { checkAuth, useAppDispatch, useAppSelector } from '@/features';
import { NavLink, ProductListStyle, useClientModalStatement } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HeaderLayout, SearchForm } from './ui';

interface ProductHeaderProps {}

export const ProductHeader = ({}: ProductHeaderProps) => {
  const { state: searchState, toggle: toggleSearch } =
    useClientModalStatement();
  const dispatch = useAppDispatch();
  const { state: navState } = useAppSelector(currentHeaderModal);
  const { toggle: navToggle } = headerModalActions;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth()
      .then((user) => setUser(user))
      .catch(() => null);
  }, []);

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
        !user || !user.is_admin ? (
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
            <div onClick={() => dispatch(cartModalActions.toggle())}>
              <Image src={'/cart.svg'} alt={'Корзина'} width={28} height={28} />
            </div>
          </>
        ) : (
          <>
            <Link href={'/admin'}>
              <Image
                src={'/shield-admin.svg'}
                alt={'Админка'}
                width={28}
                height={28}
              />
            </Link>
            <Link href={'/products/create'}>
              <Image
                src={'/add-product.svg'}
                alt={'Добавить продукт'}
                width={28}
                height={28}
              />
            </Link>
          </>
        )
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
