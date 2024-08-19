import { EntityId } from '@/shared';

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
}
