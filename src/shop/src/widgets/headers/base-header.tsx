'use client';

import { currentHeaderModal, headerModalActions } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { NavLink } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderLayout } from './ui';

interface BaseHeaderProps {}

export const BaseHeader = ({}: BaseHeaderProps) => {
  const dispatch = useAppDispatch();
  const { state } = useAppSelector(currentHeaderModal);
  const { toggle } = headerModalActions;

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
