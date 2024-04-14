import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../Slices/user.slice';
import currentScreen from '../Slices/currentScreen.slice';
import loadingSlice from '../Slices/loading.slice';
import alertSlice from '../Slices/alertSlice';

import { userAuthApi } from '../Api/userAuth';
import { carSearchApi } from '../Api/searchApi';
import { customerApi } from '../Api/customerApi';
import { productApi } from '../Api/productApi';
import { garageApi } from '../Api/garageApi';
const rootReducer = combineReducers({
    userSlice: userSlice,
    currentScreen: currentScreen,
    loading: loadingSlice,
    alert: alertSlice,
    //API
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [carSearchApi.reducerPath]: carSearchApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [garageApi.reducerPath]: garageApi.reducer,
});

export default rootReducer;