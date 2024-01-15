import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Car } from '@/types/types';

interface SelectedCarState {
  brand: string;
  segment: string;
}

const initialState: SelectedCarState = {
  brand: '',
  segment: '',
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
  },
});

export const { setBrand, setSegment } = selectedCar.actions;