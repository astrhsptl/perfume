'use client';

import { createContext, useContext } from 'react';
import { IModalContext, IModalProviderProps } from './types';

export const ModalContext = createContext<IModalProviderProps | null>(null);

export const useModalContext = (
  context?: string
): IModalContext | IModalProviderProps => {
  const tools = useContext(ModalContext);

  if (tools === null) {
    throw new Error('No current modal context!');
  }

  if (context) {
    return tools[context];
  }

  return tools;
};
