import {
  Brand,
  BrandCreate,
  File as FileEntity,
  Perfume,
  PerfumeCreate,
  PerfumeType,
  PerfumeTypeCreate,
  PerfumeVolume,
  PerfumeVolumeCreate,
} from '@/entities';
import { getAPICore } from '@/shared';

export const brandAPIBuild = getAPICore<Brand, BrandCreate>('brand');
export const perfumeAPIBuild = getAPICore<Perfume, PerfumeCreate>('perfume');
export const volumeAPIBuild = getAPICore<PerfumeVolume, PerfumeVolumeCreate>(
  'perfume-volume'
);
export const perfumeTypeAPIBuild = getAPICore<PerfumeType, PerfumeTypeCreate>(
  'perfume-type'
);
export const fileAPIBuild = getAPICore<FileEntity, FormData>('file');
