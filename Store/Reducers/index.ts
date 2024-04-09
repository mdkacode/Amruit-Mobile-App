import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../Slices/user.slice';

const rootReducer = combineReducers({
    userSlice: userSlice,
});

export default rootReducer;