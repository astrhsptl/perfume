import { EntityId } from '@/shared';

export interface FavoriteCreate {
  user_id: EntityId;
  perfume_id: EntityId;
}

export type FavoriteUpdate = Partial<FavoriteCreate>;

export interface Favorite extends FavoriteCreate {
  id: EntityId;
}
