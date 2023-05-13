import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';


const store = configureStore({
    reducer: {
        userStatus: userSliceReducer,
    },
});

export default store;