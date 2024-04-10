import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
    isLoading: boolean
}
const initialState = {
    isLoading: false
} as LoadingState;

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        enableLoading: (state) => {
            state.isLoading = true;
        },
        disableLoading: (state) => {
            state.isLoading = false;
        }
    },
});

export const { enableLoading, disableLoading } = loadingSlice.actions;

export default loadingSlice.reducer;