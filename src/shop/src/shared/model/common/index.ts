export type PaginatedResult<T> = {
  next: number | null;
  prev: number | null;
  pages: number | null;
  data: T[];
};

export type EntityId = string | number;

export interface WrongResponse {
  detail: string;
}

export interface ModalTools {
  open?: () => void;
  close?: () => void;
  toggle: () => void;
  state: boolean;
}
