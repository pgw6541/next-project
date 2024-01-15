import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from '@/types/types';

interface SelectedCarState {
  brand: string;
  segment: string;
  fuelType: string;
}

const initialState: SelectedCarState = {
  brand: '',
  segment: '',
  fuelType: '',
}

export const selectedCar = createSlice({
  name: 'selectedCar',
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setSegment: (state, action: PayloadAction<string>) => {
      state.segment = action.payload;
    },
    setFuelType: (state, action: PayloadAction<string>) => {
      state.fuelType = action.payload;
    }, 
  },
});

export const { setBrand, setSegment, setFuelType } = selectedCar.actions;