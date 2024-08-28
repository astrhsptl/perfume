import { Perfume } from '@/entities/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';

interface HeaderModalState {
  data: Perfume[];
}

const initialStatement: HeaderModalState = {
  data: [],
};

export const perfumeListSlice = createSlice({
  name: 'perfumeList',
  initialState: initialStatement,
  reducers: {
    set: (state, action: PayloadAction<Perfume[]>) => {
      state.data = action.payload;
    },

    invalidate: (state) => {
      state.data = [];
    },
  },
});

export const perfumeListActions = perfumeListSlice.actions;
export const perfumeListReducer = perfumeListSlice.reducer;
export const currentHeaderModal = (state: RootState) => state.perfumeList;
