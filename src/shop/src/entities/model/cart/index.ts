import { EntityId } from '@/shared';

export interface CartCreate {
  buy_date: string;
  is_ordered: boolean;
  is_delivered: boolean;
  is_rejected: boolean;
  user_id: EntityId;
}

export type CartUpdate = Partial<CartCreate>;

export interface Cart extends CartCreate {
  id: EntityId;
}
