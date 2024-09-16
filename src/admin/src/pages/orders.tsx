import { CartOrders } from '@/entities';
import { checkAuth } from '@/features';
import { API_SERVER_URL, EntityId, PaginatedResult, QueryKeys } from '@/shared';
import { HeaderCommon, OrderListMobile, OrderListTable } from '@/widgets';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
interface OrdersProps {}

export const OrdersPage: React.FC<OrdersProps> = () => {
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

  useEffect(() => {
    checkAuth()
      .then((data) => {
        if (!data) window.location.replace('/sign-in');
      })
      .catch(() => {
        window.location.replace('/sign-in');
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Заказы | Perfume shop</title>
      </Helmet>
      <HeaderCommon title='Заказы' />
      <OrderListTable
        coordinator={{
          isHidden,
          pagination,
          currentState,
          setIsHidden,
          setPagination,
          setCurrentState,
        }}
        payload={payload}
      />
      <OrderListMobile payload={payload} setCurrentState={setCurrentState} />
    </div>
  );
};
