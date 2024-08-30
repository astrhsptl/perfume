import clsx from 'clsx';
import React, { Dispatch } from 'react';
import StatusPickerStyles from '../table.module.css';
interface StatePicker {
  isHidden: boolean;
  setIsHidden: Dispatch<React.SetStateAction<boolean>>;
}

export const StatePicker: React.FC<StatePicker> = ({
  isHidden,
  setIsHidden,
}) => {
  return (
    <>
      <aside
        className={clsx(
          StatusPickerStyles.table_status_picker,
          isHidden ? StatusPickerStyles.hidden : '',
        )}
        onClick={() => {
          // if (event.target === event.currentTarget) return;
          setIsHidden(() => !isHidden);
        }}
      >
        <div
          className={clsx(
            StatusPickerStyles._content,
            isHidden ? StatusPickerStyles.open : '',
          )}
          onClick={() => {
            setIsHidden(() => !isHidden);
          }}
        >
          <div
            className={clsx(
              StatusPickerStyles._content_head,
              isHidden ? StatusPickerStyles.open : '',
            )}
            onClick={() => {
              setIsHidden(() => !isHidden);
            }}
          >
            <div
              className={clsx(
                StatusPickerStyles.burger,
                isHidden ? StatusPickerStyles.open : '',
              )}
              onClick={() => {
                setIsHidden(() => !isHidden);
              }}
            >
              <div className={StatusPickerStyles.burger_line}></div>
              <div className={StatusPickerStyles.burger_line}></div>
              <div className={StatusPickerStyles.burger_line}></div>
            </div>
            <div
              className={clsx(
                StatusPickerStyles.rotate_text,
                isHidden ? StatusPickerStyles.open : '',
              )}
              onClick={() => {
                setIsHidden(() => !isHidden);
              }}
            >
              Статусы
            </div>
          </div>
          <div
            className={clsx(
              StatusPickerStyles.stat,
              isHidden ? StatusPickerStyles.open : '',
            )}
            onClick={() => {
              setIsHidden(() => !isHidden);
            }}
          >
            В ресурсе
          </div>
          <div
            className={clsx(
              StatusPickerStyles.stat,
              isHidden ? StatusPickerStyles.open : '',
            )}
            onClick={() => {
              setIsHidden(() => !isHidden);
            }}
          >
            В потоке
          </div>
        </div>
      </aside>
    </>
  );
};
