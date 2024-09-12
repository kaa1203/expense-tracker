import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
		value: '',
		type: '',
		data: {},
	},
	reducers: {
		setModal: (state, action) => {
			state.value = action.payload.value;
			state.type = action.payload.type;
			state.data = action.payload.data;
		}
	}
});

export const { setModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;