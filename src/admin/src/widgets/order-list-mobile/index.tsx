import { CartOrders } from '@/entities';
import {
  CART_STATUS_CLOSE,
  CART_STATUS_OPEN,
  EntityId,
  OrderCommonStyles,
  OrderMobileStyles,
  PaginatedResult,
} from '@/shared';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { OrderCard } from './ui';

import clsx from 'clsx';
import 'swiper/css';

interface OrderListMobileProps {
  setCurrentState: React.Dispatch<React.SetStateAction<EntityId | undefined>>;
  payload: UseQueryResult<AxiosResponse<PaginatedResult<CartOrders>>, Error>;
}

export const OrderListMobile: React.FC<OrderListMobileProps> = ({
  payload,
  setCurrentState,
}) => {
  const cartStatusList = [CART_STATUS_OPEN, CART_STATUS_CLOSE];

  useEffect(() => {
    setCurrentState(cartStatusList[0]);
  }, []);

  return (
    <div className={OrderCommonStyles.orderListContainerMobile}>
      <Swiper
        style={{
          marginTop: 20,
        }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(w) =>
          setCurrentState(() => cartStatusList[w.activeIndex])
        }
      >
        <SwiperSlide
          virtualIndex={0}
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2%',
          }}
        >
          <div
            className={clsx(OrderCommonStyles.status)}
            style={{
              width: '100%',
            }}
          >
            <img src={'/new-order.svg'} />
            <p>Открыт</p>
          </div>
        </SwiperSlide>
        <SwiperSlide
          virtualIndex={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2%',
          }}
        >
          <div
            className={clsx(OrderCommonStyles.status, OrderCommonStyles.close)}
            style={{
              width: '100%',
            }}
          >
            <img src={'/complete-order.svg'} />
            <p>Закрыт</p>
          </div>
        </SwiperSlide>
      </Swiper>

      <section className={OrderMobileStyles.orderCard}>
        {(payload.isLoading ? [] : payload.data!.data.data).map((element) => (
          <OrderCard key={element.id} order={element} />
        ))}
      </section>
    </div>
  );
};
