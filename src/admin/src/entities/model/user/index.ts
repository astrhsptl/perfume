import { EntityId } from '@/shared';

export interface UserCreate {
  username: string;
  email: string;
  phone: string;
  password: string;
  family_id?: string;
}

export type UserUpdate = Partial<UserCreate>;

export interface User extends UserCreate {
  id: EntityId;
}
