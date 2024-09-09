import {
  brandAPIBuild,
  perfumeAPIBuild,
  perfumeTypeAPIBuild,
} from '@/features';
import { BaseStyle, montserrat, ProductStyle } from '@/shared';
import { BackLink, PerfumeEditForm } from '@/widgets';
import clsx from 'clsx';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Редактирование продукта',
};

interface ProductRetrieveParams {
  id: string;
}

interface ProductRetrieveProps {
  params: ProductRetrieveParams;
}

export default async function Page({ params: { id } }: ProductRetrieveProps) {
  const cook = cookies();
  const brandAPI = brandAPIBuild.serverApi(cook);
  const perfumeAPI = perfumeAPIBuild.serverApi(cook);
  const perfumeTypeAPI = perfumeTypeAPIBuild.serverApi(cook);
  const { data: brands } = await brandAPI.fetchAll();
  const { data: perfume } = await perfumeAPI
    .fetchByID(id)
    .catch(() => redirect('/not-found'));
  const { data: perfumeTypes } = await perfumeTypeAPI.fetchAll();

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
      <PerfumeEditForm
        perfume={perfume}
        brands={brands.data ?? []}
        perfumeTypes={perfumeTypes.data ?? []}
      />
    </div>
  );
}
