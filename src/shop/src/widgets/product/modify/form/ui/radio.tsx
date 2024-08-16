'use client';
import { PerfumeModify } from '@/shared';
import { RadioButton } from '@/shared/ui/radio-button';
import clsx from 'clsx';

interface SexChooseProps {}

export const SexChoose = ({}: SexChooseProps) => {
  return (
    <div>
      <p className={clsx(PerfumeModify.radioChoose, PerfumeModify.sex)}>Пол</p>

      <div
        className={clsx(
          PerfumeModify.radioChoose,
          PerfumeModify.radioContainer
        )}
      >
        <RadioButton name='sex' value='Мужской' />
        <RadioButton name='sex' value='Женский' />
      </div>
    </div>
  );
};
