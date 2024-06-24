export interface IModalContext {
  open?(): void;
  close?(): void;
  toggle(): void;
}

export interface ModalTools extends IModalContext {
  state: boolean;
}

export interface IModalProviderProps {
  [key: string]: IModalContext;
}
