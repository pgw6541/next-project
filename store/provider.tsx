"use client";

import { store } from ".";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}> <PersistGate loading={null} persistor={persistStore(store)}> {children} </PersistGate></Provider>;
}