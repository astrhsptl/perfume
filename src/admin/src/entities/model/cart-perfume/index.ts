import { EntityId } from '@/shared';
import { PerfumeVolume } from '../perfume-volume';

export interface CartPerfumeCreate {
  quantity: number;
  cart_id: EntityId;
  perfume_volume_id: EntityId;
}

export type CartPerfumeUpdate = Partial<CartPerfumeCreate>;

export interface CartPerfume extends CartPerfumeCreate {
  id: EntityId;
}

export interface CartPerfumeExtended extends CartPerfume {
  perfume_volume: PerfumeVolume;
}
