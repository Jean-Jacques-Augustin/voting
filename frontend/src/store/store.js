import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from './userSlice';
import voteReducer from './voteSlice';
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  user: userReducer,
  vote: voteReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store);
