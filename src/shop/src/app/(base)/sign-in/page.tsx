import { AuthStyle } from '@/shared';
import { SignInForm } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход | Famous perfume',
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
  },
};

export default async function Page() {
  return (
    <div className={AuthStyle.pageAuthLayout}>
      <SignInForm />
    </div>
  );
}
