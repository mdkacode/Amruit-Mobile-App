import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentScreenState {
    currentScreen: string;
}

const initialState: CurrentScreenState = {
    currentScreen: 'Home',
} as CurrentScreenState;

const currentScreenSlice = createSlice({
    name: 'currentScreen',
    initialState,
    reducers: {
        setCurrentScreen: (state, action: PayloadAction<string>) => {
            state.currentScreen = action.payload;
        },
    },
});

export const { setCurrentScreen } = currentScreenSlice.actions;
export default currentScreenSlice.reducer;