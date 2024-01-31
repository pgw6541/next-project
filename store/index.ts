import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
// storage 저장을 위해 redux-persist설치
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
// Slice 불러오기
import { selectOptionSlice } from './slice/selectOption';
import { chooseCarSlice } from './slice/chooseCar';

const reducers = combineReducers({
  selectOption: selectOptionSlice.reducer,
  chooseCar: chooseCarSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['selectOption', 'chooseCar']
};

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  // 리듀서
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
        serializableCheck: process.env.NODE_ENV !== 'production',
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store