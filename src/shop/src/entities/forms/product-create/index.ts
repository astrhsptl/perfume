export type VolumeInputType = {
  volume: number;
  cost: number;
  quantity: number;
};

export interface ProductCreateData {
  name: string;
  description: string;
  sex: string;
  aroma: string;
  perfume_type_id: string;
  brand_id: string;

  // external
  images?: FileList;
  volumes: VolumeInputType[];
}
