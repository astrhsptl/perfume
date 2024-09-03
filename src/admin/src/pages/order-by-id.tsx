import { CartOrders } from '@/entities';
import { API_SERVER_URL, QueryKeys } from '@/shared';
import { HeaderCommon, OrderCompositionTable } from '@/widgets';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

interface OrderByIdProps {}

export const OrderByIdPage: React.FC<OrderByIdProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentCart = useQuery({
    queryKey: [QueryKeys.cartAdminUnique, id],
    queryFn: async () =>
      await axios
        .get<CartOrders>(`${API_SERVER_URL}/v1/cart/admin/${id}`)
        .catch(({ response }: AxiosError) => {
          if (response?.status === 404) {
            return navigate('/not-found');
          }
        })
        .then((response) => {
          if (response) {
            return response.data;
          }
        }),
  });

  return (
    <div>
      <Helmet>
        <title>
          Заказ {currentCart.data?.id.toString().split('-')[0] ?? ''} | Perfume
          shop
        </title>
      </Helmet>
      <HeaderCommon />
      <OrderCompositionTable
        cart={currentCart.data}
        isLoading={currentCart.isLoading}
      />
    </div>
  );
};
