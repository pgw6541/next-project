import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from '@/types/types';

// SelectOption Slice
interface SelectOptionState {
	brand: string;
  segment: string;
}
const option: SelectOptionState = {
	brand: '',
  segment: '',
}

export const selectOptionSlice = createSlice({
	name: 'carSelection',
  initialState: option,
  reducers: {
		setBrand: (state, action: PayloadAction<string>) => {
			state.brand = action.payload;
    },
    setSegment: (state, action: PayloadAction<string>) => {
			state.segment = action.payload;
    },
  },
});

// ChooseCar Slice
const choose:Car[] = []

export const chooseCarSlice = createSlice({
	name: 'chooseCar',
	initialState: choose,
	reducers: {
		setChoose: (state, action: PayloadAction<Car[]>) => {
			return action.payload;
		},
	},
});

export const { setChoose } = chooseCarSlice.actions;
export const { setBrand, setSegment } = selectOptionSlice.actions;