import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: {
        name: string;
        otp: string;
        userId?: string;
        userType?: string;
        token?: string;
    };
}

const initialState: UserState = {
    user: {
        name: '',
        otp: '',
    },
} as UserState;

const userSlice = createSlice({
    name: 'userAction',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload.user;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.user.token = action.payload;
        },
        clearToken: (state) => {
            state.user.token = '';
        },
        clearUser: (state) => {
            state.user = initialState.user;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;