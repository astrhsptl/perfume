'use client';

import { ReactNode, ReactPortal, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './lib';

export function useModal<PromiseType, T = unknown>(
  node: ReactNode,
  payload?: T
) {
  const [child, setChild] = useState<ReactPortal | null>(null);
  const [modalPromise, setModalPromise] = useState<Promise<PromiseType> | null>(
    null
  );

  return {
    toggle: () => {
      if (!child) {
        return setModalPromise(
          new Promise<PromiseType>((resolve, reject) => {
            const modalRoot = document.getElementById('modal-root')!;
            const rejector = () => {
              setModalPromise(null);
              reject();
            };
            const portal = createPortal(
              <ModalContext.Provider
                value={{ resolve, reject: rejector, payload: payload }}
              >
                {node}
              </ModalContext.Provider>,
              modalRoot
            );
            setChild(portal);
          }).finally(() => setChild(null))
        );
      }
    },
    child: child,
    modalPromise,
  };
}

export * from './lib';
