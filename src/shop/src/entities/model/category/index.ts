import { EntityId } from '@/shared';

export interface CategoryCreate {
  name: string;
  description: string;
  is_parent: boolean;
  category_id: EntityId;
}

export type CategoryUpdate = Partial<CategoryCreate>;

export interface Category extends CategoryCreate {
  id: EntityId;
}
