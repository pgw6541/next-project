import { configureStore } from '@reduxjs/toolkit';
import { selectedCar } from './slice/selectedCar';
import { chooseCar } from './slice/chooseCar';

export const store = configureStore({
  // 리듀서
  reducer: {
    selectedCar: selectedCar.reducer,
    chooseCar: chooseCar.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store