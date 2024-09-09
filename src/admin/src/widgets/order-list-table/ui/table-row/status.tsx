import { cartAPI } from '@/features';
import {
  CART_STATUS_CLOSE,
  CART_STATUS_OPEN,
  EntityId,
  OrderCommonStyles,
  QueryKeys,
} from '@/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';

interface Status {
  cart_id: EntityId;
  status_id: EntityId;
}

export const Status: React.FC<Status> = ({ cart_id, status_id }) => {
  const queryClient = useQueryClient();
  const cartMutation = useMutation({
    mutationFn: async (statusId: EntityId) =>
      await cartAPI.update(cart_id, { status_id: statusId }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.cartList],
        exact: false,
      });
    },
  });

  return (
    <div
      className={clsx(
        OrderCommonStyles.status,
        status_id === CART_STATUS_CLOSE ? OrderCommonStyles.close : '',
      )}
      onClick={() =>
        cartMutation.mutate(
          status_id === CART_STATUS_CLOSE
            ? CART_STATUS_OPEN
            : CART_STATUS_CLOSE,
        )
      }
    >
      <img
        src={
          status_id === CART_STATUS_OPEN
            ? '/new-order.svg'
            : '/complete-order.svg'
        }
      />
      <p>{status_id === CART_STATUS_OPEN ? 'Открыт' : 'Закрыт'}</p>
    </div>
  );
};
