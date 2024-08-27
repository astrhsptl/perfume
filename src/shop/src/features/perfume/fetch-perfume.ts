import { Perfume } from '@/entities';
import { EntityId } from '@/shared';
import {
  cartAPIBuild,
  perfumeAPIBuild,
  volumeAPIBuild,
} from '../entity-requests';

export const perfumeByCartId = async (
  cartId: EntityId
): Promise<Perfume[] | null> => {
  const cartApi = cartAPIBuild.serverApi();
  const perfumeVolumeApi = volumeAPIBuild.serverApi();
  const perfumeApi = perfumeAPIBuild.serverApi();

  const products: Perfume[] = [];

  const currentCart = await cartApi.fetchByID(cartId);

  if (currentCart === null) return null;

  for (const { perfume_volume_id } of currentCart.data.cart_perfume) {
    const perfumeVolume = await perfumeVolumeApi.fetchByID(perfume_volume_id);
    const perfume = await perfumeApi.fetchByID(perfumeVolume.data.perfume_id);
    products.push(perfume.data);
  }

  return products;
};
