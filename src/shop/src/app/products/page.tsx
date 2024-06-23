import { BaseStyle, ProductListStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { Metadata } from 'next';
import Image from 'next/image';

interface ProductProps {}

export const metadata: Metadata = {
  title: 'Духи | Famous perfume',
  description: 'Магазин духов в Ростове (Ростове-на-Дону). Вход',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://perfume.labofdev.ru/sign-in',
    countryName: 'Россия',
    siteName: 'Famous perfume',
    title: 'Famous perfume',
    description: 'Сайт для продажи духов в Ростове (Ростове-на-Дону)',
    images: [
      {
        url: 'https://perfume.labofdev.ru/og-preview.png',
        width: 1300,
        height: 500,
        alt: 'Famous perfume духи',
      },
    ],
  },
};

export default async function ProductPage({}: ProductProps) {
  return (
    <>
      <section
        className={clsx(
          ProductListStyle.headContainer,
          BaseStyle.container,
          montserrat.className
        )}
      >
        <div className={ProductListStyle.filterToggleContainer}>
          <Image
            src={'/filter.svg'}
            alt={'filter icon perfume парфюм фильтр ростов ростов-на-дону'}
            height={17}
            width={21}
          />
        </div>
        <h1>Парфюм для вас</h1>
        <div className={ProductListStyle.__filterPlug}></div>
      </section>
    </>
  );
}
