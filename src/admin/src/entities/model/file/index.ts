import { EntityId } from '@/shared';

export interface FileCreate {
  url: string;
  perfume_id: EntityId;
}

export type FileUpdate = Partial<FileCreate>;

export interface File extends FileCreate {
  id: EntityId;
}
