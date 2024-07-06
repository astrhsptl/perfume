import { createSlice } from '@reduxjs/toolkit';
import { modalReducers } from '../lib';
import { RootState } from '../types';

interface HeaderModalState {
  state: boolean;
}

const initialStatement: HeaderModalState = {
  state: false,
};

export const headerModalSlice = createSlice({
  name: 'headerModal',
  initialState: initialStatement,
  reducers: modalReducers,
});

export const headerModalActions = headerModalSlice.actions;
export const headerModalReducer = headerModalSlice.reducer;
export const currentHeaderModal = (state: RootState) => state.headerModal;
