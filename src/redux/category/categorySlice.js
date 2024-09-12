import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from "./operations";

const handleOnPending = state => {
	state.isLoading = true;
}

const handleOnReject = (state, action) => {
	state.isLoading = false;
	state.isError = action.payload;
}

export const categorySlice = createSlice({
	name: 'category',
	initialState: {
		item: {
			expenses: [],
			incomes: [],
		},
		isLoading: false,
		isError: null
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCategories.pending, handleOnPending)
			.addCase(fetchCategories.fulfilled,(state, action) => {
				// dang! there might be a much better fix for this, but boy oh boy I spent the whole day wracking my head and this is the result of it. I guess it ain't stupid if it works right?
				state.item = {
					expenses: action.payload.expenses === undefined ? [] : action.payload.expenses,
					incomes: action.payload.incomes === undefined ? [] : action.payload.incomes
				}
				state.isLoading = false;
				state.isError = null;
			})
			.addCase(fetchCategories.rejected, handleOnReject)
			.addCase(addCategory.pending, handleOnPending)
			.addCase(addCategory.fulfilled, (state, action) => {
				const type = action.payload.type;
				state.item[type].push(action.payload);
				state.isLoading = false;
				state.isError = null;
			})
			.addCase(addCategory.rejected, handleOnReject)
			.addCase(deleteCategory.pending, handleOnPending)
			.addCase(deleteCategory.fulfilled, (state, action) => {
				const type = action.payload.type;
				const index = state.item[type].findIndex(category => category._id === action.payload.id);

				state.item[type].splice(index, 1);
				state.isLoading = false;
				state.isError = null
			})
			.addCase(deleteCategory.rejected, handleOnReject)
			.addCase(updateCategory.pending, handleOnPending)
			.addCase(updateCategory.fulfilled, (state, action) => {
				const type = action.payload.type;
				const index = state.item[type].findIndex(category => category._id === action.payload._id);

				state.item[type].splice(index, 1, action.payload);
				state.isLoading = false;
			})
			.addCase(updateCategory.rejected, handleOnReject)

	}
});

export const categoryReducer = categorySlice.reducer;