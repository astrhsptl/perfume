import { Brand, BrandCreate, PerfumeType, PerfumeTypeCreate } from '@/entities';
import { getAPICore } from '@/shared';

export const brandAPIBuild = getAPICore<Brand, BrandCreate>('brand');
export const perfumeTypeAPIBuild = getAPICore<PerfumeType, PerfumeTypeCreate>(
  'perfume-type'
);
