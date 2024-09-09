import { EntityId } from '@/shared';
import { File as FileEntity } from '../file';
import { PerfumeVolume } from '../perfume-volume';

export interface PerfumeCreate {
  name: string;
  description: string;
  sex: 'Мужской' | 'Женский' | string;
  aroma: string;
  perfume_type_id: string;
  brand_id: string;
  hidden?: boolean;
}

export type PerfumeUpdate = Partial<PerfumeCreate>;

export interface Perfume extends PerfumeCreate {
  id: EntityId;
  file: FileEntity[];
  perfume_volume: PerfumeVolume[];
}
