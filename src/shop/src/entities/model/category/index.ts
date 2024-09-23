import { EntityId } from '@/shared';

export interface CategoryCreate {
  name: string;
}

export type CategoryUpdate = Partial<CategoryCreate>;

export interface Category extends CategoryCreate {
  id: EntityId;
  description?: string;
  is_parent: boolean;
  category_id: EntityId;
}
