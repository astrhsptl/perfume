'use client';

import {
  BaseStyle,
  HeaderStyle,
  ModalContext,
  montserrat,
  NavLink,
  useClientModalStatement,
} from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const tools = useClientModalStatement();

  return (
    <ModalContext.Provider value={tools}>
      <header
        className={clsx(
          HeaderStyle.header,
          BaseStyle.container,
          montserrat.className
        )}
      >
        <section>Famous Perfume</section>
        <section className={HeaderStyle.headerLinks}>
          <NavLink href={'/'}>Домой</NavLink>
          <NavLink href={'/products'}>Товары</NavLink>
          <NavLink href={'/products?category=1'}>Категории</NavLink>
        </section>
        <section className={HeaderStyle.headerIcons}>
          <Link href={'/products?search=1'}>
            <Image
              src={'/search.svg'}
              alt={'духи поиск search'}
              width={28}
              height={28}
            />
          </Link>
          <Link href={'/favorite'}>
            <Image
              src={'/favorite.svg'}
              alt={'духи favorite heart'}
              width={28}
              height={28}
            />
          </Link>
          <Link href={'/products?cart=1'}>
            <Image
              src={'/cart.svg'}
              alt={'духи корзина cart'}
              width={28}
              height={28}
            />
          </Link>
        </section>
        <section
          className={clsx(
            HeaderStyle.headerBurger,
            tools.state && HeaderStyle.open
          )}
          onClick={() => tools.toggle()}
        >
          <div id='rect-1'></div>
          <div id='rect-2'></div>
          <div id='rect-3'></div>
        </section>
      </header>
    </ModalContext.Provider>
  );
};
