import { configureStore,createStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slice";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage"; // defaults to localStorage for web


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

export  default function() {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
