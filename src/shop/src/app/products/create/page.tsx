'use client';

import { brandAPIBuild, FormBaseLayout, perfumeTypeAPIBuild } from '@/features';
import { brandListKey, perfumeTypeListKey } from '@/shared/config';
import { BackLink } from '@/widgets';
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';

// export const metadata: Metadata = {
//   title: 'Создание духов',
//   icons: {
//     icon: '/favicon.svg',
//   },
// };

interface PerfumeCreateProps {}

type VolumeInputType = {
  volume: number;
  cost: number;
  quantity: number;
};

interface FormData {
  name: string;
  description: string;
  sex: string;
  aroma: string;
  perfume_type_id: string;
  brand_id: string;

  // external
  images: File[];
  volumes: VolumeInputType[];
}

export default function PerfumeCreatePage({}: PerfumeCreateProps) {
  const brandAPI = brandAPIBuild.clientApi();
  const perfumeTypeAPI = perfumeTypeAPIBuild.clientApi();
  const brands = useQuery({
    queryKey: brandListKey,
    queryFn: async () => await brandAPI.fetchAll(),
  });
  const perfumeTypes = useQuery({
    queryKey: perfumeTypeListKey,
    queryFn: async () => await perfumeTypeAPI.fetchAll(),
  });

  const methods = useForm<FormData>();
  const submit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };
  const { getValues, register } = methods;

  return (
    <FormBaseLayout methods={methods} onSub={submit}>
      <BackLink />
      <section
        className='imageInput'
        style={{
          color: '#fff',
        }}
      >
        {getValues('images')?.length > 0 ? (
          <div>images</div>
        ) : (
          <input type='file' accept='image/*' {...register('images')} />
        )}
        <input
          type='text'
          placeholder='Description'
          {...register('description')}
        />
      </section>
      <section className='dataInput'>
        <input type='text' placeholder='Name' {...register('name')} />
        <div>
          <input
            type='radio'
            name='sex'
            placeholder='Man'
            {...register('sex')}
          />
          <input
            type='radio'
            name='sex'
            placeholder='Woman'
            {...register('sex')}
          />
          <input type='text' placeholder='Aroma' {...register('aroma')} />
          <Select
            placeholder='Бренд'
            options={
              brands.isSuccess
                ? brands.data.data.data.map(({ id, title }) => ({
                    value: id,
                    label: title,
                  }))
                : []
            }
          />
          <Select
            placeholder='Тип'
            options={
              perfumeTypes.isSuccess
                ? perfumeTypes.data.data.data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))
                : []
            }
          />
        </div>
      </section>
    </FormBaseLayout>
  );
}
