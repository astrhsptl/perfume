import { configureStore } from '@reduxjs/toolkit';
import {
  cartModalReducer,
  filterModalReducer,
  headerModalReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    headerModal: headerModalReducer,
    filterModal: filterModalReducer,
    cartModal: cartModalReducer,
  },
});
