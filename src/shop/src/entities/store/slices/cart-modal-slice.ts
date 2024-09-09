import { createSlice } from '@reduxjs/toolkit';
import { modalReducers } from '../lib';
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
  reducers: modalReducers,
});

export const cartModalActions = cartModalSlice.actions;
export const cartModalReducer = cartModalSlice.reducer;
export const currentCartModal = (state: RootState) => state.cartModal;
