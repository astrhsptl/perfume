import {
  Brand,
  BrandCreate,
  Cart,
  CartCreate,
  CartPerfume,
  CartPerfumeCreate,
  File as FileEntity,
  Perfume,
  PerfumeCreate,
  PerfumeType,
  PerfumeTypeCreate,
  PerfumeVolume,
  PerfumeVolumeCreate,
} from '@/entities';
import { getAPICore } from '@/shared';

export const cartAPIBuild = getAPICore<Cart, CartCreate>('cart');
export const brandAPIBuild = getAPICore<Brand, BrandCreate>('brand');
export const perfumeAPIBuild = getAPICore<Perfume, PerfumeCreate>('perfume');
export const volumeAPIBuild = getAPICore<PerfumeVolume, PerfumeVolumeCreate>(
  'perfume-volume'
);
export const perfumeTypeAPIBuild = getAPICore<PerfumeType, PerfumeTypeCreate>(
  'perfume-type'
);
export const cartPerfumeAPIBuild = getAPICore<CartPerfume, CartPerfumeCreate>(
  'cart-perfume'
);
export const fileAPIBuild = getAPICore<FileEntity, FormData>('file');
