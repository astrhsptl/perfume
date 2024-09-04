import { CartOrders } from '@/entities';
import {
  API_SERVER_URL,
  EntityId,
  OrderCommonStyles,
  PaginatedResult,
  QueryKeys,
} from '@/shared';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Footer, OrderListHeader, StatePicker, TableRow } from './ui';

interface OrderListTable {}

export const OrderListTable: React.FC<OrderListTable> = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [currentState, setCurrentState] = useState<EntityId | undefined>(
    undefined,
  );
  const [pagination, setPagination] = useState({
    page: 1,
    quantity: 20,
  });

  const payload = useQuery({
    queryKey: [QueryKeys.cartList, pagination, currentState],
    queryFn: async () =>
      await axios.get<PaginatedResult<CartOrders>>(
        `${API_SERVER_URL}/v1/cart/admin/list`,
        {
          params: {
            order_by: '-create_time',
            status_id: currentState,
            ...pagination,
          },
        },
      ),
    placeholderData: keepPreviousData,
  });

  console.log(payload.data?.data);

  return (
    <>
      <div className={OrderCommonStyles.table_container}>
        <section
          className={clsx(
            OrderCommonStyles.table_content,
            isHidden ? OrderCommonStyles.open : '',
          )}
        >
          <StatePicker
            currentStatus={currentState}
            setCurrentStatus={setCurrentState}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
          />
          <section className={OrderCommonStyles.table_row_container}>
            <OrderListHeader />
            <div className={OrderCommonStyles.payload_container}>
              {(payload.isLoading ? [] : payload.data!.data.data).map(
                (element) => (
                  <TableRow key={element.id} cart={element} />
                ),
              )}
            </div>
          </section>
        </section>
        <Footer
          pagination={pagination}
          setPagination={setPagination}
          nextPage={payload.data?.data.next_page}
          previousPage={payload.data?.data.previous_page}
        />
      </div>
    </>
  );
};

export { OrderListHeader } from './ui/order-list-header';
