import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {
    open: (state) => {
      state.state = true;
    },
    close: (state) => {
      state.state = false;
    },
    toggle: (state) => {
      state.state = !state.state;
    },
  },
});

export const filterModalActions = filterModalSlice.actions;
export const filterModalReducer = filterModalSlice.reducer;
export const currentFilterModal = (state: RootState) => state.filterModal;
