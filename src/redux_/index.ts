import { configureStore } from '@reduxjs/toolkit';
import ratesReducer from './rate.reducer';

export const store = configureStore({
  reducer: ratesReducer,
});
