import { EntityId } from '@/shared';
import { CartPerfume } from '../cart-perfume';

export interface CartCreate {
  status_id: EntityId;
  user_id: EntityId;
}

export type CartUpdate = Partial<CartCreate>;

export interface Cart extends CartCreate {
  id: EntityId;
  status_id: string;
  user_id: string;
  create_time: string;
  delivery_date: string;
  buy_date: string;
  issue_date: string;
  cart_perfume: CartPerfume[];
}
