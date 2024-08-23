'use client';

import { StoredPerfume } from '@/entities';
import { AuthApiCore, CredentialStorage } from '@/shared';
import { CART_STATUS_OPEN } from '@/shared/config';
import { cartAPIBuild, cartPerfumeAPIBuild } from '../entity-requests';

export const confirmCart = async (localCart: StoredPerfume[]) => {
  const cartApi = cartAPIBuild.clientApi();
  const cartPerfumeApi = cartPerfumeAPIBuild.clientApi();
  const token = CredentialStorage.get('access');
  const user = await AuthApiCore.userByToken(token ?? undefined);
  const newCart = await cartApi.create({
    status_id: CART_STATUS_OPEN,
    user_id: user.data.id,
  });

  for (const perfume of localCart) {
    const cartPerfume = await cartPerfumeApi.create({
      cart_id: newCart.data.id,
      perfume_volume_id: perfume.volume.id,
      quantity: perfume.quantity,
    });
  }
};
