'use client';

import { ProductStyle } from '@/shared';
import { useState } from 'react';
import { VolumePoint } from '../../common/ui';

interface VolumePointsProps {
  volumes?: number[];
}

export const VolumePoints = ({
  volumes = [10, 20, 30, 40, 50],
}: VolumePointsProps) => {
  const [currentVolume, setCurrentVolume] = useState(0);

  return (
    <div className={ProductStyle.volumeContainer}>
      {volumes.map((volume, index) => (
        <VolumePoint
          key={index}
          isActive={currentVolume === index}
          value={volume}
          onClick={() => setCurrentVolume(() => index)}
        />
      ))}
    </div>
  );
};
