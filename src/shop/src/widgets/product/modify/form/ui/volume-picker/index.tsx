import { VolumeInputType } from '@/entities';
import { VolumePoint } from '@/widgets/product/common/ui';
import Image from 'next/image';
import { useWatch } from 'react-hook-form';

interface VolumePickerProps {
  toggle: () => void;
}
export const VolumePicker = ({ toggle }: VolumePickerProps) => {
  const formVolumes: VolumeInputType[] = useWatch({
    name: 'volumes',
  });

  return (
    <div>
      <p style={{ marginBottom: 10 }}>Объем</p>
      <div
        style={{
          display: 'flex',
          gap: 10,
        }}
      >
        {formVolumes.map(({ volume }, index) => (
          <VolumePoint key={index} value={volume} />
        ))}
        <span
          style={{
            display: 'block',
            height: 40,
            width: 40,
            position: 'relative',
          }}
          onClick={() => toggle()}
        >
          <Image src={'/volume-input.svg'} alt='Добавить объем' fill={true} />
        </span>
      </div>
    </div>
  );
};
