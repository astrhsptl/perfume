import { Perfume, User } from '@/entities';
import { cartAPIBuild, checkAuthServer, perfumeByCartId } from '@/features';
import { CART_STATUS_OPEN } from '@/shared/config';
import { UserHead, UserStoryCard } from '@/widgets';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Магазин духов | Famous perfume',
  description: 'Личный кабинет магазина духов в Ростове (Ростове-на-Дону)',
  icons: {
    icon: '/favicon.svg',
  },
};

interface UserProps {}

export default async function UserPage({}: UserProps) {
  const credentialStorage = cookies();
  const cartApi = cartAPIBuild.serverApi();

  let user: User | null = null;
  let products: Perfume[] = [];
  const authPayload = await checkAuthServer(
    credentialStorage.get('access')?.value,
    credentialStorage.get('refresh')?.value
  );

  if (typeof authPayload === 'string') {
    user = (await checkAuthServer(authPayload)) as User;
  }

  if (typeof authPayload === 'object') {
    user = authPayload;
  }

  if (!user) {
    return redirect('/sign-in');
  }

  const payload = await cartApi
    .fetchAll({
      params: {
        user_id: user.id,
        quantity: 1,
        status_id: CART_STATUS_OPEN,
        order_by: '-create_time',
      },
    })
    .then(({ data }) => {
      if (data.data.length === 0) return null;
      return data.data[0];
    });

  if (payload) {
    products = (await perfumeByCartId(payload?.id)) ?? [];
  }

  return (
    <div style={{ paddingTop: 70 }}>
      <UserHead email={user.email} username={user.username} />
      <UserStoryCard title='Текущий заказ' payload={products} />
    </div>
  );
}
