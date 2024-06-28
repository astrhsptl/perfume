import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';

interface CartModalState {
  state: boolean;
}

const initialStatement: CartModalState = {
  state: false,
};

export const cartModalSlice = createSlice({
  name: 'cartModal',
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

export const cartModalActions = cartModalSlice.actions;
export const cartModalReducer = cartModalSlice.reducer;
export const currentCartModal = (state: RootState) => state.cartModal;
