import { configureStore } from '@reduxjs/toolkit';
import {
  cartModalReducer,
  filterModalReducer,
  headerModalReducer,
  perfumeListReducer,
} from './slices';
import { cartReducer } from './slices/cart';

export const store = configureStore({
  reducer: {
    headerModal: headerModalReducer,
    filterModal: filterModalReducer,
    cartModal: cartModalReducer,
    perfumeList: perfumeListReducer,
    cart: cartReducer,
  },
});
