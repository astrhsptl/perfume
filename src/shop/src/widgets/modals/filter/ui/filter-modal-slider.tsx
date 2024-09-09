'use client';

import { FilterStyle, montserrat } from '@/shared';
import { Slider } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

interface FilterModalSliderProps {
  max: number;
  min: number;
  submitter: (value: { from: number; to: number }) => void;
}

export const FilterModalSlider = ({
  min,
  max,
  submitter,
}: FilterModalSliderProps) => {
  const [value, setValue] = useState<{ from: number; to: number }>({
    from: min,
    to: max,
  });
  const sliderValue = [value.from, value.to];

  return (
    <div style={{ marginTop: 30 }}>
      <div
        className={clsx(FilterStyle.asidePriceContainer, montserrat.className)}
      >
        <span>от {value.from}$</span>
        <span>до {value.to}$</span>
      </div>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={sliderValue}
        onChange={(_, value) => {
          if (typeof value === 'number') return;

          setValue(() => ({ from: value[0], to: value[value.length - 1] }));
          submitter({ from: value[0], to: value[value.length - 1] });
        }}
        valueLabelDisplay='auto'
        min={min}
        max={max}
        sx={{
          '& .MuiSlider-thumb::after': {
            background: 'var(--black)',
            border: '1px solid var(--white)',
            height: '20px',
            width: '20px',
          },
          '& .MuiSlider-track': {
            background: 'var(--white)',
          },
          '& .MuiSlider-rail': {
            background: 'var( --gray-dark)',
          },
        }}
      />
    </div>
  );
};
