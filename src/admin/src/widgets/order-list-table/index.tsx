import { CartOrders } from '@/entities';
import { EntityId, OrderCommonStyles, PaginatedResult } from '@/shared';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import React from 'react';
import { Footer, OrderListHeader, StatePicker, TableRow } from './ui';

type Pagination = {
  page: number;
  quantity: number;
};

interface OrderListTable {
  coordinator: {
    isHidden: boolean;
    pagination: Pagination;
    currentState: EntityId | undefined;
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    setCurrentState: React.Dispatch<React.SetStateAction<EntityId | undefined>>;
  };
  payload: UseQueryResult<AxiosResponse<PaginatedResult<CartOrders>>, Error>;
}

export const OrderListTable: React.FC<OrderListTable> = ({
  coordinator: {
    isHidden,
    pagination,
    currentState,
    setIsHidden,
    setPagination,
    setCurrentState,
  },
  payload,
}) => {
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
