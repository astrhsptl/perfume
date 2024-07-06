import { BaseStyle, UserStyles, montserrat } from '@/shared';
import { UserStoryCard } from '@/widgets';
import clsx from 'clsx';
import Image from 'next/image';

interface UserProps {}

export default async function UserPage({}: UserProps) {
  return (
    <div style={{ paddingTop: 70 }}>
      <section
        className={clsx(
          BaseStyle.container,
          UserStyles.user,
          montserrat.className
        )}
      >
        <div className={UserStyles.avatar}>
          <Image
            src={'/person.svg'}
            alt='Аватар пользователя'
            width={130}
            height={130}
            layout='responsive'
          />
        </div>
        <div className={UserStyles.userInfo}>
          <div className={UserStyles.username}>user #228</div>
          <div className={UserStyles.userEmail}>sucker228@gmail.com</div>
        </div>
      </section>
      <UserStoryCard title='Текущий заказ' />
      <UserStoryCard title='История заказов' />
    </div>
  );
}
