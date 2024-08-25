'use client';

import { StoredPerfume } from '@/entities';
import { API_SERVER_URL, CART_STATUS_OPEN } from '@/shared/config';
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { checkAuth } from '../auth/lib/check-auth';
import { cartAPIBuild, cartPerfumeAPIBuild } from '../entity-requests';

const createCart = async (
  localCart: StoredPerfume[],
  router: AppRouterInstance
) => {
  const cartApi = cartAPIBuild.clientApi();
  const cartPerfumeApi = cartPerfumeAPIBuild.clientApi();
  const user = await checkAuth().then((user) => {
    if (!user) return router.push('/sign-in');
    return user;
  });

  const newCart = await cartApi.create({
    status_id: CART_STATUS_OPEN,
    user_id: user!.id,
  });

  Promise.allSettled(
    localCart.map((perfume) =>
      cartPerfumeApi.create({
        cart_id: newCart.data.id,
        perfume_volume_id: perfume.volume.id,
        quantity: perfume.quantity,
      })
    )
  );

  return newCart.data.id;
};

export const confirmCart = async (
  localCart: StoredPerfume[],
  router: AppRouterInstance
) => {
  return createCart(localCart, router).then(
    async (cart_id) =>
      await axios.post(`${API_SERVER_URL}/v1/cart/close/${cart_id}`)
  );
};
