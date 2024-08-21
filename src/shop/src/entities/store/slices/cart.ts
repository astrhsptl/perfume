import { Perfume, PerfumeVolume } from '@/entities/model';
import { EntityId } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';

export interface StoredPerfume {
  perfume: Perfume;
  quantity: number;
  volume: PerfumeVolume;
}

interface SearchCondition {
  id: EntityId;
  volume: number;
}

const initialStatement: StoredPerfume[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStatement,
  reducers: {
    append: (state, action: PayloadAction<StoredPerfume>) => {
      state.push(action.payload);
    },

    remove: (state, { payload }: PayloadAction<SearchCondition>) => {
      const index = state.findIndex(
        ({ perfume, volume }) =>
          payload.id === perfume.id && payload.volume === volume.volume
      );

      if (index !== -1) state.splice(index, 1);
    },

    increment: (state, { payload }: PayloadAction<SearchCondition>) => {
      const perfume = state.find(
        ({ perfume, volume }) =>
          payload.id === perfume.id && payload.volume === volume.volume
      );

      if (!perfume) return;

      perfume.quantity++;
    },

    decrement: (state, { payload }: PayloadAction<SearchCondition>) => {
      const perfume = state.find(
        ({ perfume, volume }) =>
          payload.id === perfume.id && payload.volume === volume.volume
      );

      if (!perfume || perfume.quantity === 0) return;

      if (perfume.quantity === 1) return;

      perfume.quantity--;
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const currentCart = (state: RootState) => state.cart;
