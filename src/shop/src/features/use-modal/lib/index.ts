'use client';

import { createContext, useContext } from 'react';

interface PromiseCallback<T> {
  resolve(value: T | PromiseLike<T>): void;
  reject(): void;
}

export const ModalContext = createContext<PromiseCallback<unknown> | null>(
  null
);

export const useModalContext = <ResoleType>() => {
  const callbacks = useContext(ModalContext);

  if (callbacks === null) {
    throw new Error('No current promise context!');
  }

  return callbacks as PromiseCallback<ResoleType>;
};
