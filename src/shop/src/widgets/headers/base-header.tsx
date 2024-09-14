'use client';

import { currentHeaderModal, headerModalActions, User } from '@/entities';
import { checkAuth, useAppDispatch, useAppSelector } from '@/features';
import { NavLink } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HeaderLayout } from './ui';

interface BaseHeaderProps {}

export const BaseHeader = ({}: BaseHeaderProps) => {
  const dispatch = useAppDispatch();
  const { state } = useAppSelector(currentHeaderModal);
  const { toggle } = headerModalActions;
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
          <NavLink href={'/'}>Домой</NavLink>
          <NavLink href={'/products'}>Товары</NavLink>
          <NavLink href={'/products?category=1'}>Категории</NavLink>
        </>
      }
      headerIcons={
        !user || !user.is_admin ? (
          <>
            <Link href={'/products?search=1'}>
              <Image src={'/search.svg'} alt={'Поиск'} width={28} height={28} />
            </Link>
            <Link href={'/favorite'}>
              <Image
                src={'/favorite.svg'}
                alt={'Избранное'}
                width={28}
                height={28}
              />
            </Link>
            <Link href={'/products?cart=1'}>
              <Image
                src={'/cart.svg'}
                alt={'Корзина духов'}
                width={28}
                height={28}
              />
            </Link>
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
        state: state,
        toggle: () => {
          dispatch(toggle());
        },
      }}
    />
  );
};
