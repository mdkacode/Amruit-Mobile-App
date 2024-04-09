import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../Slices/user.slice';
import currentScreen from '../Slices/currentScreen.slice';

const rootReducer = combineReducers({
    userSlice: userSlice,
    currentScreen: currentScreen
});

export default rootReducer;