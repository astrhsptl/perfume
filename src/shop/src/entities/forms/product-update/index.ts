import { File as FileEntity, PerfumeVolume } from '@/entities/model';

export interface ProductUpdateData {
  name: string;
  description: string;
  sex: string;
  aroma: string;
  perfume_type_id: string;
  brand_id: string;
  file: FileEntity[];
  perfume_volume: PerfumeVolume[];
}
