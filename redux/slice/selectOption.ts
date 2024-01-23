import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Car } from '@/types/types';

interface SelectOptionState {
  brand: string;
  segment: string;
}

const initialState: SelectOptionState = {
  brand: '',
  segment: '',
}

export const selectOption = createSlice({
  name: 'selectOption',
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

export const { setBrand, setSegment } = selectOption.actions;