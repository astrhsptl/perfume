import {
  brandAPIBuild,
  checkAuthServer,
  perfumeTypeAPIBuild,
} from '@/features';
import { BaseStyle, montserrat, ProductStyle } from '@/shared';
import { BackLink } from '@/widgets';
import PerfumeCreateForm from '@/widgets/product/modify/form';
import clsx from 'clsx';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Создание парфюма',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://perfume.labofdev.ru/products/create',
    countryName: 'Россия',
    siteName: 'Famous perfume',
    title: 'Famous perfume',
    description: 'Создание парфюма',
  },
};

export default async function Page() {
  const cook = cookies();
  const brandAPI = brandAPIBuild.serverApi(cook);
  const perfumeTypeAPI = perfumeTypeAPIBuild.serverApi(cook);
  const { data: brands } = await brandAPI.fetchAll();
  const { data: perfumeTypes } = await perfumeTypeAPI.fetchAll();

  const user = await checkAuthServer(
    cook.get('access')?.value,
    cook.get('refresh')?.value
  );

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <div
      className={clsx(
        BaseStyle.container,
        ProductStyle.baseContainer,
        montserrat.className
      )}
      style={{ paddingTop: 70 }}
    >
      <BackLink />
      <PerfumeCreateForm
        brands={brands.data ?? []}
        perfumeTypes={perfumeTypes.data ?? []}
      />
    </div>
  );
}
