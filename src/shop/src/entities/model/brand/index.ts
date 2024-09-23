import { EntityId } from '@/shared';

export interface BrandCreate {
  title: string;
}

export type BrandUpdate = Partial<BrandCreate>;

export interface Brand extends BrandCreate {
  id: EntityId;
  create_time: string;
}
