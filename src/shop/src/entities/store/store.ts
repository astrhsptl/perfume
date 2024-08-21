import { configureStore } from '@reduxjs/toolkit';
import {
  cartModalReducer,
  filterModalReducer,
  headerModalReducer,
} from './slices';
import { cartReducer } from './slices/cart';

export const store = configureStore({
  reducer: {
    headerModal: headerModalReducer,
    filterModal: filterModalReducer,
    cartModal: cartModalReducer,

    cart: cartReducer,
  },
});
