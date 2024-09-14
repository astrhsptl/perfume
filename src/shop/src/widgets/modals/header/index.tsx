'use client';

import {
  cartModalActions,
  currentHeaderModal,
  headerModalActions,
} from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { HeaderStyle, NavLink, montserrat } from '@/shared';
import clsx from 'clsx';

interface HeaderModalProps {}

export const HeaderModal = ({}: HeaderModalProps) => {
  const dispatch = useAppDispatch();
  const { state } = useAppSelector(currentHeaderModal);
  const { close } = headerModalActions;

  return (
    <nav
      className={clsx(
        HeaderStyle.nav,
        montserrat.className,
        state && HeaderStyle.open
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(close());
      }}
    >
      <article className={HeaderStyle.navLinks}>
        <NavLink href={'/'}>Домой</NavLink>
        <NavLink href={'/user'}>Вы</NavLink>
        <NavLink href={'/products'}>Товары</NavLink>
        <NavLink href={'/favorites'}>Любимое</NavLink>
        <div
          onClick={() => {
            dispatch(close());
            dispatch(cartModalActions.toggle());
          }}
        >
          Корзина
        </div>
      </article>
    </nav>
  );
};
