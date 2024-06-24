import { configureStore } from '@reduxjs/toolkit';
import { filterModalReducer, headerModalReducer } from './slices';

export const store = configureStore({
  reducer: {
    headerModal: headerModalReducer,
    filterModal: filterModalReducer,
  },
});
