import { EntityId } from '@/shared';

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  family_id?: string;
}

export type UserUpdate = Partial<UserCreate>;

export interface User extends UserCreate {
  id: EntityId;
  is_admin: boolean;
}
