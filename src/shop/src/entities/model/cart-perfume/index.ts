import { EntityId } from '@/shared';

export interface CartPerfumeCreate {
  quantity: number;
  cart_id: EntityId;
  perfume_volume_id: EntityId;
}

export type CartPerfumeUpdate = Partial<CartPerfumeCreate>;

export interface CartPerfume extends CartPerfumeCreate {
  id: EntityId;
}
