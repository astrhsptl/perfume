import { EntityId } from '@/shared';

export interface BrandCreate {
  title: string;
  create_time: string;
}

export type BrandUpdate = Partial<BrandCreate>;

export interface Brand extends BrandCreate {
  id: EntityId;
}
