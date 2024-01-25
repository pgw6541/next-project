import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from '@/types/types';

const initialState:Car[] = []

export const chooseCarSlice = createSlice({
	name: 'chooseCar',
	initialState,
	reducers: {
		setChoose: (state, action: PayloadAction<Car[]>) => {
			return action.payload;
		},
	},
});

export const { setChoose } = chooseCarSlice.actions;