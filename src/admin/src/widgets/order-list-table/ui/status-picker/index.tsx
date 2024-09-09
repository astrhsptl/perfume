import {
  CART_STATUS_CLOSE,
  CART_STATUS_OPEN,
  EntityId,
  OrderPickerStyles,
} from '@/shared';
import clsx from 'clsx';
import React, { Dispatch } from 'react';

interface StatePicker {
  isHidden: boolean;
  currentStatus: EntityId | undefined;
  setIsHidden: Dispatch<React.SetStateAction<boolean>>;
  setCurrentStatus: Dispatch<React.SetStateAction<EntityId | undefined>>;
}

type Y = {
  [key: string]: string;
};

export const StatePicker: React.FC<StatePicker> = ({
  isHidden,
  currentStatus,
  setIsHidden,
  setCurrentStatus,
}) => {
  const statements: Y = {};
  statements[CART_STATUS_CLOSE] = 'Закрыта';
  statements[CART_STATUS_OPEN] = 'Открыта';

  return (
    <>
      <aside
        className={clsx(
          OrderPickerStyles.table_status_picker,
          isHidden ? OrderPickerStyles.hidden : '',
        )}
      >
        <div
          className={clsx(
            OrderPickerStyles._content,
            isHidden ? OrderPickerStyles.open : '',
          )}
        >
          <div
            className={clsx(
              OrderPickerStyles._content_head,
              isHidden ? OrderPickerStyles.open : '',
            )}
          >
            <div
              className={clsx(
                OrderPickerStyles.burger,
                isHidden ? OrderPickerStyles.open : '',
              )}
              onClick={() => {
                setIsHidden(() => !isHidden);
              }}
            >
              <div className={OrderPickerStyles.burger_line}></div>
              <div className={OrderPickerStyles.burger_line}></div>
              <div className={OrderPickerStyles.burger_line}></div>
            </div>
            <div
              className={clsx(
                OrderPickerStyles.rotate_text,
                isHidden ? OrderPickerStyles.open : '',
              )}
              onClick={() => {
                setIsHidden(() => !isHidden);
              }}
            >
              Статусы
            </div>
          </div>
          {Object.entries(statements).map(([key, value]) => (
            <div
              key={key}
              className={clsx(
                OrderPickerStyles.select_status,
                currentStatus === key ? OrderPickerStyles.current : '',
                isHidden ? OrderPickerStyles.open : '',
              )}
              onClick={
                currentStatus === key
                  ? () => setCurrentStatus(undefined)
                  : () => setCurrentStatus(key)
              }
            >
              {value}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
