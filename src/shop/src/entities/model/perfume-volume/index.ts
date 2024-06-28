import { EntityId } from '@/shared';

export interface PerfumeVolumeCreate {
  cost: number;
  volume: number;
  quantity: number;

  perfume_id: EntityId;
}

export type PerfumeVolumeUpdate = Partial<PerfumeVolumeCreate>;

export interface PerfumeVolume extends PerfumeVolumeCreate {
  id: EntityId;
}
