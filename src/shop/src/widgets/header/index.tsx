import { HeaderStyle, montserrat, NavLink } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';

interface HeaderProps {}

export const Header = async ({}: HeaderProps) => {
  return (
    <header className={clsx(HeaderStyle.header, montserrat.className)}>
      <section>Famous Perfume</section>
      <section>
        <NavLink href={'/'}>Домашняя страница</NavLink>
        <NavLink href={'/products'}>Товары</NavLink>
        <NavLink href={'/products?category=1'}>Категории</NavLink>
      </section>
      <section>
        <NavLink href={'/products?search=1'}>
          <Image
            src={'/search.svg'}
            alt={'духи поиск search'}
            width={28}
            height={28}
          />
        </NavLink>
        <NavLink href={'/favorite'}>
          <Image
            src={'/favorite.svg'}
            alt={'духи favorite heart'}
            width={28}
            height={28}
          />
        </NavLink>
        <NavLink href={'/products?cart=1'}>
          <Image
            src={'/cart.svg'}
            alt={'духи корзина cart'}
            width={28}
            height={28}
          />
        </NavLink>
      </section>
    </header>
  );
};
