import { EntityId } from '@/shared';

export type Value = { key: EntityId; value: string };

export type CostValue = { from: number; to: number };

export interface FilterItemsForm {
  sex: Value[];
  perfume_type_id: Value[];
  brand_id: Value[];
  cost: CostValue;
}
