import { configureStore } from '@reduxjs/toolkit';
import { selectOptionSlice } from './slice/selectOption';
import { chooseCarSlice } from './slice/chooseCar';

export const store = configureStore({
  // 리듀서
  reducer: {
    selectOption: selectOptionSlice.reducer,
    chooseCar: chooseCarSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store