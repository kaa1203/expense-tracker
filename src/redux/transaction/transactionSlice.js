import { createSlice } from "@reduxjs/toolkit";
import { 
	fetchTransactions, 
	addTransaction,
	editTransaction,
	deleteTransaction
} from "./operations";

const handleOnPending = state => {
	state.isLoading = true;
	state.isError = null;
}

const handleOnReject = (state, action) => {
	state.isError = action.payload;
	state.isLoading = false;
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        item: {
			  expenses:[],
			  incomes: []
		  },
        isLoading: false,
        isError: null,
		  search: {
				keyword: '',
				date: '',
				type: ''
		  }
    },
	 reducers: {
		searchTransaction: (state, action) => {
			state.search.keyword = action.payload.keyword;
			state.search.date = action.payload.date;
			state.search.type = action.payload.type;
		}
	 },
    extraReducers: builder => {
        builder
		  .addCase(fetchTransactions.pending, handleOnPending)
		  .addCase(fetchTransactions.fulfilled, (state, action) => {
				const type = action.payload.type;
				state.item[type] = action.payload.data;
				state.isLoading = false;
				state.isError = null;
		  })
		  .addCase(fetchTransactions.rejected, handleOnReject)
        .addCase(addTransaction.pending, handleOnPending)
        .addCase(addTransaction.fulfilled, (state, action) => {
				const type = action.payload.type;
            state.item[type].push(action.payload);
            state.isLoading = false;
            state.isError = null;
        })
        .addCase(addTransaction.rejected, handleOnReject)
		  .addCase(editTransaction.pending, handleOnPending)
		  .addCase(editTransaction.fulfilled, (state, action) => {
				const editType = action.payload.editType;
				const type = (editType === 'content') ? action.payload.type : action.payload.oldType;
				const id = (editType === 'content') ? action.payload._id : action.payload.oldId;

				const index = state.item[type].findIndex(transaction => transaction._id === id);
				
				if (editType === 'content') {
					state.item[type].splice(index, 1, action.payload);
				} else {
					state.item[type].splice(index, 1);
					state.item[action.payload.type].push(action.payload);
				}
				state.isLoading = false;
				state.isError = null;
		  })
		  .addCase(editTransaction.rejected, handleOnReject)
		  .addCase(deleteTransaction.pending, handleOnPending)
		  .addCase(deleteTransaction.fulfilled, (state, action) => {
				const type = action.payload.type;
				const index = state.item[type].findIndex(transaction => transaction._id === action.payload.id);

				state.item[type].splice(index, 1);
				state.isLoading = false;
				state.isError = null;
		  })
		  .addCase(deleteTransaction.rejected, handleOnReject)
    }
});

export const { searchTransaction } = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;