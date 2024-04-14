import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './Reducers';
import { userAuthApi } from './Api/userAuth';
import { carSearchApi } from './Api/searchApi';
import { customerApi } from './Api/customerApi';
import { productApi } from './Api/productApi';
import { garageApi } from './Api/garageApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [],
};

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        carSearchApi.middleware,
        userAuthApi.middleware,
        customerApi.middleware,
        productApi.middleware,
        garageApi.middleware
    ),
});


export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;


export default store;