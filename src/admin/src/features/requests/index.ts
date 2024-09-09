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

export const cartAPI = getAPICore<Cart, CartCreate>('cart');
export const brandAPI = getAPICore<Brand, BrandCreate>('brand');
export const perfumeAPI = getAPICore<Perfume, PerfumeCreate>('perfume');
export const volumeAPI = getAPICore<PerfumeVolume, PerfumeVolumeCreate>(
  'perfume-volume',
);
export const perfumeTypeAPI = getAPICore<PerfumeType, PerfumeTypeCreate>(
  'perfume-type',
);
export const cartPerfumeAPI = getAPICore<CartPerfume, CartPerfumeCreate>(
  'cart-perfume',
);
export const fileAPI = getAPICore<FileEntity, FormData>('file');
