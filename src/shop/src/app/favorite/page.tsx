import { fetchFavorites } from '@/features';
import { FavoritesList } from '@/widgets/favorites';
import { FavoriteHeader } from '@/widgets/headers/favorite-header';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface FavoriteProps {}

export const metadata: Metadata = {
  title: 'Избранное | Духи в Ростове-на-Дону | Famous perfume',
  description: 'Избранное в магазине духов в Ростове (Ростове-на-Дону). Вход',
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

export default async function FavoritePage({}: FavoriteProps) {
  const credentialManager = cookies();
  const data = await fetchFavorites(
    credentialManager.get('access')?.value as string
  );

  if (!data) {
    return redirect('/sign-in');
  }

  return (
    <>
      <FavoriteHeader />
      <FavoritesList data={data.data.data} />
    </>
  );
}
