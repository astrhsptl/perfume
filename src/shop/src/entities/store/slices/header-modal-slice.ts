import { createSlice } from '@reduxjs/toolkit';
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

export const headerModalActions = headerModalSlice.actions;
export const headerModalReducer = headerModalSlice.reducer;
export const currentHeaderModal = (state: RootState) => state.headerModal;
