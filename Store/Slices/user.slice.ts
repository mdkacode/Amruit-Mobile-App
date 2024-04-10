import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAutApiResponseType } from '../Api/userAuth';

interface UserState {
    isLoggedIn: boolean;
    user: UserAutApiResponseType;
}

const initialState: UserState = {
    isLoggedIn: false,
    user: {
        userName: '',
        userCode: '',
        phone: '',
        profilePic: '',
        createdAt: '',
        updatedAt: '',
        id: 0,
        type: ''
    },
} as UserState;

const userSlice = createSlice({
    name: 'userAction',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload.user;
        },
        setUserType: (state, action: PayloadAction<string>) => {
            state.user.type = action.payload;
        },
        clearUser: (state) => {
            state.user = initialState.user;
            state.isLoggedIn = false;
        },
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;