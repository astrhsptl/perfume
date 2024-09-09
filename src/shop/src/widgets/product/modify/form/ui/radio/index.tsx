'use client';
import { InputError, PerfumeModify } from '@/shared';
import { RadioButton } from '@/shared/ui/radio-button';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface SexChooseProps {}

export const SexChoose = ({}: SexChooseProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <p className={clsx(PerfumeModify.radioChoose, PerfumeModify.sex)}>Пол</p>

      <div
        className={clsx(
          PerfumeModify.radioChoose,
          PerfumeModify.radioContainer
        )}
      >
        <RadioButton
          name='sex'
          value='Мужской'
          registerOptions={{
            required: {
              message: 'Укажите пол',
              value: true,
            },
          }}
        />
        <RadioButton name='sex' value='Женский' />
      </div>
      <div>
        <ErrorMessage
          errors={errors}
          name={'sex'}
          render={({ message }) => <InputError message={message} />}
        />
      </div>
    </div>
  );
};
