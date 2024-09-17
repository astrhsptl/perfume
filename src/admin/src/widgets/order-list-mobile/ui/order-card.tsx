import { CartOrders } from '@/entities';
import { OrderCommonStyles } from '@/shared';
import { Status } from '@/widgets/order-list-table/ui/table-row/status';
import React from 'react';
import { Link } from 'react-router-dom';
import { useClipboard } from '../lib';

interface OrderCardProps {
  order: CartOrders;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order: { id, user, create_time, cart_perfume, status_id },
}) => {
  const { write } = useClipboard();
  const currentDate = new Date(create_time);
  const cost = cart_perfume.reduce((acc, { perfume_volume: { cost } }) => {
    return acc + cost;
  }, 0);

  return (
    <div className={OrderCommonStyles.mobileCard}>
      <div className={OrderCommonStyles.mobileFlex}>
        <span>Заказ: {id.toString().split('-')[0]}</span>
        <Link to={`/admin/${id}`}>
          <img src='/admin/arrow-forward.svg' alt='Перейти' />
        </Link>
      </div>
      <div className={OrderCommonStyles.mobileTitleText}>
        {user.username}, на {cost}$
      </div>
      <ul>
        <li onClick={() => write(user.phone)}>
          <img src='/admin/phone.svg' alt='' /> {user.phone}
        </li>
        <li onClick={() => write(user.email)}>
          <img src='/admin/mail.svg' alt='' /> {user.email}
        </li>
      </ul>
      <div className={OrderCommonStyles.mobileFlex}>
        <Status cart_id={id} status_id={status_id} />
        {currentDate.toLocaleString('ru')}
      </div>
    </div>
  );
};
