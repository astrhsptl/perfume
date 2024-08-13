'use client';

import { ProductStyle } from '@/shared';
import clsx from 'clsx';
import { useState } from 'react';

interface VolumePointsProps {
  volumes?: number[];
}

export const VolumePoints = ({
  volumes = [10, 20, 30, 40, 50],
}: VolumePointsProps) => {
  const [currentVolume, setCurrentVolume] = useState(0);

  return (
    <div className={ProductStyle.volumeContainer}>
      {volumes.map((volume, index) => {
        return (
          <span
            key={index}
            className={clsx(
              ProductStyle.volumePoint,
              index === currentVolume && ProductStyle.active
            )}
            onClick={() => setCurrentVolume(() => index)}
          >
            {volume}
          </span>
        );
      })}
    </div>
  );
};
