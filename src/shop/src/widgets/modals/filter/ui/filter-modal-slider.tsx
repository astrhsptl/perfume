'use client';

import { FilterStyle, montserrat } from '@/shared';
import { Slider } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

interface FilterModalSliderProps {
  max: number;
  min: number;
}

export const FilterModalSlider = ({ min, max }: FilterModalSliderProps) => {
  const [value, setValue] = useState<number[]>([min, max]);

  return (
    <div style={{ marginTop: 30 }}>
      <div
        className={clsx(FilterStyle.asidePriceContainer, montserrat.className)}
      >
        <span>от {value[0]}$</span>
        <span>до {value.slice(-1)}$</span>
      </div>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={(_, value) =>
          setValue(() => (typeof value === 'number' ? [value, value] : value))
        }
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
