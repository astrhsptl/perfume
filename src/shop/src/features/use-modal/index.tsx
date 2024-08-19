'use client';

import { ReactNode, ReactPortal, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './lib';

export function useModal<PromiseType>(node: ReactNode) {
  const [child, setChild] = useState<ReactPortal | null>(null);

  return {
    toggle: () => {
      if (child) {
        return;
      }

      return new Promise<PromiseType>((resolve, reject) => {
        const modalRoot = document.getElementById('modal-root')!;
        const portal = createPortal(
          <ModalContext.Provider value={{ resolve, reject }}>
            {node}
          </ModalContext.Provider>,
          modalRoot
        );
        setChild(portal);
      }).finally(() => setChild(null));
    },
    child: child,
  };
}

export * from './lib';
