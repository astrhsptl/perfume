import { CartOrders } from '@/entities';
import { OrderCommonStyles } from '@/shared';
import { Checkbox } from '@mui/material';
import React, { TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Status } from './status';

interface TableRow {
  cart: CartOrders;
}

export const TableRow: React.FC<TableRow> = ({ cart }) => {
  const navigate = useNavigate();
  const currentDate = new Date(cart.create_time);
  const cost = cart.cart_perfume.reduce((acc, { perfume_volume: { cost } }) => {
    return acc + cost;
  }, 0);

  return (
    <div
      className={OrderCommonStyles.table_container__main}
      onDoubleClick={() => {
        navigate(`/admin/${cart.id}`);
      }}
      onTouchStart={(e: TouchEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) navigate(`/admin/${cart.id}`);
      }}
    >
      <div className={OrderCommonStyles.id_check}>
        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
      </div>
      <p>{cart.id.toString().split('-')[0]}</p>
      <p className={OrderCommonStyles.text_content}>{cart.user.username}</p>
      <div className={OrderCommonStyles.contact_group}>
        <p className={OrderCommonStyles.text_content}>{cart.user.phone}</p>
        <p className={OrderCommonStyles.text_content}>{cart.user.email}</p>
      </div>
      <div className={OrderCommonStyles.date_group}>
        <p className={OrderCommonStyles.text_content}>
          {currentDate.toLocaleString('ru')}
        </p>
      </div>
      <p
        className={OrderCommonStyles.text_content}
        style={{ justifySelf: 'center' }}
      >
        {cost} $
      </p>
      <Status cart_id={cart.id} status_id={cart.status_id} />
    </div>
  );
};
