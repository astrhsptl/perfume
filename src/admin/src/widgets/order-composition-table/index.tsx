import { CartOrders } from '@/entities';
import { OrderCommonStyles, OrderComplectation } from '@/shared';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WithEmpty } from '../with-empty';
import { Footer, Header, TableRow } from './ui';

interface OrderCompositionTableProps {
  isLoading: boolean;
  cart?: CartOrders;
}

export const OrderCompositionTable: React.FC<OrderCompositionTableProps> = ({
  cart,
  isLoading,
}) => {
  const totalCost = useMemo(() => {
    return cart?.cart_perfume.reduce((num, element) => {
      return num + element.quantity * element.perfume_volume.cost;
    }, 0);
  }, [cart]);

  return (
    <>
      <div
        style={{
          margin: '10px auto 0px auto',
          maxWidth: '90dvw',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link to={'/admin'}>
          <img
            src='/admin/arrow-forward.svg'
            alt=''
            style={{
              transform: 'rotate(180deg)',
            }}
          />{' '}
          <span
            style={{
              color: 'black',
            }}
          >
            назад
          </span>
        </Link>
      </div>
      <div className={OrderComplectation.table}>
        <Header />
        <div className={OrderCommonStyles.payload_container}>
          <WithEmpty condition={!cart || cart.cart_perfume.length === 0}>
            <div className={OrderCommonStyles.withEmptyDesktop}>Пусто!</div>
          </WithEmpty>
          {(isLoading || !cart ? [] : cart.cart_perfume).map((element) => (
            <TableRow key={element.id} cartPerfume={element} />
          ))}
        </div>
        <Footer totalCost={totalCost ?? 0} />
      </div>
    </>
  );
};
