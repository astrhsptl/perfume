'use client';

import { ProductCreateData } from '@/entities';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

export const productCreate: SubmitHandler<ProductCreateData> = (data) => {
  toast('Сохранение...');
};
