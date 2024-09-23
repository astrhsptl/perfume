import { EntityId } from '@/shared';

export interface PerfumeTypeCreate {
  name: string;
}

export type PerfumeTypeUpdate = Partial<PerfumeTypeCreate>;

export interface PerfumeType extends PerfumeTypeCreate {
  id: EntityId;
  create_time: string;
}
