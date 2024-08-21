'use client';

import { PerfumeVolume } from '@/entities';
import { ProductStyle } from '@/shared';
import { Dispatch, SetStateAction } from 'react';
import { VolumePoint } from '../../common/ui';

interface VolumePointsProps {
  volumes: PerfumeVolume[];
  currentVolume: PerfumeVolume;
  setCurrentVolume: Dispatch<SetStateAction<PerfumeVolume>>;
}

export const VolumePoints = ({
  volumes = [],
  currentVolume,
  setCurrentVolume,
}: VolumePointsProps) => {
  return (
    <div className={ProductStyle.volumeContainer}>
      {volumes.map((volume) => (
        <VolumePoint
          key={volume.id}
          isActive={currentVolume.id === volume.id}
          value={volume.volume}
          onClick={() => setCurrentVolume(() => volume)}
        />
      ))}
    </div>
  );
};
