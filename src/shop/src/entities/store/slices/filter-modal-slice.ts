import { createSlice } from '@reduxjs/toolkit';
import { modalReducers } from '../lib';
import { RootState } from '../types';

interface FilterModalState {
  state: boolean;
}

const initialStatement: FilterModalState = {
  state: false,
};

export const filterModalSlice = createSlice({
  name: 'filterModal',
  initialState: initialStatement,
  reducers: modalReducers,
});

export const filterModalActions = filterModalSlice.actions;
export const filterModalReducer = filterModalSlice.reducer;
export const currentFilterModal = (state: RootState) => state.filterModal;
