import { EntityId } from '@/shared';

export interface PerfumeCreate {
  name: string;
  description: string;
}

export type PerfumeUpdate = Partial<PerfumeCreate>;

export interface Perfume extends PerfumeCreate {
  id: EntityId;
}
