import { PerfumeVolume, ProductUpdateData, VolumeInputType } from '@/entities';
import { volumeAPIBuild } from '@/features';
import { EntityId } from '@/shared';
import { VolumePoint } from '@/widgets/product/common/ui';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

interface VolumeEditProps {
  toggle: () => void;
  perfumeId: EntityId;
  modal: Promise<VolumeInputType> | null;
}

export const VolumeEdit: React.FC<VolumeEditProps> = ({
  toggle,
  modal,
  perfumeId,
}) => {
  const { control, getValues } = useFormContext<ProductUpdateData>();
  const formVolumes = useWatch<ProductUpdateData>({
    name: 'perfume_volume',
    control: control,
  }) as PerfumeVolume[];
  const volumeControl = useController<ProductUpdateData>({
    name: 'perfume_volume',
    control: control,
  });

  const volumeApi = volumeAPIBuild.clientApi();

  useEffect(() => {
    modal
      ?.catch(() => null)
      .then(async (data) => {
        if (!data) return;

        const { data: volume } = await volumeApi.create({
          ...data,
          perfume_id: perfumeId,
        });

        volumeControl.field.onChange([...getValues('perfume_volume'), volume]);
      });
  }, [modal]);

  return (
    <div>
      <p style={{ marginBottom: 10 }}>Объем</p>
      <div
        style={{
          display: 'flex',
          gap: 10,
        }}
      >
        {formVolumes.map((volume, index) => (
          <VolumePoint
            key={volume.id}
            value={volume.volume}
            onClick={() => {
              const current = getValues('perfume_volume');

              if (current.length <= 1) {
                return toast.error('Невозможно удалить единственный объект');
              }

              current.splice(index, 1);

              volumeControl.field.onChange(current);

              volumeApi.remove(volume.id).then(() => {
                toast.success('Объект удален');
              });
            }}
          />
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
