import { configureStore } from '@reduxjs/toolkit';
import { selectOption } from './slice/selectOption';
import { chooseCar } from './slice/chooseCar';

export const store = configureStore({
  // 리듀서
  reducer: {
    selectOption: selectOption.reducer,
    chooseCar: chooseCar.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store