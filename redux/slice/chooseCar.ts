import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from '@/types/types';

const initialState:Car[] = []

export const chooseCar = createSlice({
  name: 'chooseCar',
  initialState,
  reducers: {
    setChoose: (state, action: PayloadAction<Car[]>) => {
      state = action.payload;
    },
  },
});

export const { setChoose } = chooseCar.actions;