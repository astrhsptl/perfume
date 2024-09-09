import { EntityId } from '@/shared';
import { Perfume } from '../perfume';

export interface FavoriteCreate {
  user_id: EntityId;
  perfume_id: EntityId;
}

export type FavoriteUpdate = Partial<FavoriteCreate>;

export interface Favorite extends FavoriteCreate {
  id: EntityId;
  perfume: Perfume;
}
