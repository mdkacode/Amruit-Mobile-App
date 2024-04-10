import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    message: string,
    type: string
}

const initialState = {
    message: '',
    type: ''
} as AlertState;

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<AlertState>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideAlert: (state) => {
            state.message = '';
            state.type = '';
        }
    }
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;