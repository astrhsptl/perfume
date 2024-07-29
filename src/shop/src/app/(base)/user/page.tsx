import { UserHead, UserStoryCard } from '@/widgets';

interface UserProps {}

export default async function UserPage({}: UserProps) {
  return (
    <div style={{ paddingTop: 70 }}>
      <UserHead email='cocksucker@gmail.ru' username='User#228' />
      <UserStoryCard title='Текущий заказ' />
      <UserStoryCard title='История заказов' />
    </div>
  );
}
