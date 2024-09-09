import { EntityId } from '@/shared';

export interface PerfumeTypeCreate {
  name: string;
  create_time: string;
}

export type PerfumeTypeUpdate = Partial<PerfumeTypeCreate>;

export interface PerfumeType extends PerfumeTypeCreate {
  id: EntityId;
}
