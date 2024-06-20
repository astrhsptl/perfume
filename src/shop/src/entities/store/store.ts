import { configureStore } from '@reduxjs/toolkit';
import { headerModalReducer } from './slices';

export const store = configureStore({
  reducer: {
    headerModal: headerModalReducer,
  },
});
