export interface IModalContext {
  open?(): void;
  close?(): void;
  toggle(): void;
}

export interface IModalProviderProps {
  [key: string]: IModalContext;
}
