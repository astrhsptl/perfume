import { Perfume, User } from '@/entities';
import { checkAuthServer, perfumeByCartId } from '@/features';
import { UserHead, UserStoryCard } from '@/widgets';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface UserProps {}

export default async function UserPage({}: UserProps) {
  const credentialStorage = cookies();

  let user: User | null = null;
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

  const products: Perfume[] =
    (await perfumeByCartId('b0cf8181-5e06-4999-bd38-a0a1b0f5f1e2')) ?? [];

  return (
    <div style={{ paddingTop: 70 }}>
      <UserHead email={user.email} username={user.username} />
      <UserStoryCard title='Текущий заказ' payload={products} />
      <UserStoryCard title='История заказов' />
    </div>
  );
}
