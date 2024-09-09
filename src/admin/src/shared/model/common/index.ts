export type PaginatedResult<T> = {
  next_page: string | null;
  previous_page: string | null;
  page: number | null;
  data: T[];
};

export type EntityId = string | number;

export interface WrongResponse {
  detail: string;
}
