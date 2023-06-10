import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from './userSlice';
import voteReducer from './voteSlice';
import { combineReducers } from "redux";
import {
    persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";

const persistConfig = {
    type: "persist/PERSIST", key: "root", storage,
};

const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer),
    vote: voteReducer,
  });
  

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        store: persistedReducer,
    }, middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,],
        },
    }),
});
