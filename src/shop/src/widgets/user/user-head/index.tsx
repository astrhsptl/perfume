import { BaseStyle, UserStyles, montserrat } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';

interface UserHeadProps {
  email: string;
  username: string;
}

export const UserHead = async ({ email, username }: UserHeadProps) => {
  return (
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
        />
      </div>
      <div className={UserStyles.userInfo}>
        <div className={UserStyles.username}>{username}</div>
        <div className={UserStyles.userEmail}>{email}</div>
      </div>
    </section>
  );
};
