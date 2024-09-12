import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestBody, setAuthHeader, BASE_URL } from "../auth/operations";
import axios from "axios";

axios.defaults.baseURL = BASE_URL;

export const fetchTransactions = createAsyncThunk(
	'transactions/fetchTransactions',
	async({ type, date }, thunkAPI) => {
		try {
			const { accToken } = requestBody(thunkAPI);
			if (accToken === null) return thunkAPI.rejectWithValue('no token');
			setAuthHeader(accToken);
			const res = await axios.get(`/transactions/${type}`, { date });
			return { data: res.data, type};
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
)

export const addTransaction = createAsyncThunk(
   'transactions/addTransaction',
   async ({
      type, 
      date,
      time,
      category,
      sum,
      comment
   }, thunkAPI) => {      
      try {
         const { accToken } = requestBody(thunkAPI);
         setAuthHeader(accToken);
         const res = await axios.post('/transactions', {
            type, 
            date,
            time,
            category,
            sum,
            comment
         });
			
         return res.data;
         
      } catch (e) {
         return thunkAPI.rejectWithValue(e.message);
      }
   }
);

export const editTransaction = createAsyncThunk(
	'transactions/editTransaction',
	async({
		id,
		type, 
		date,
		time,
		category,
		sum,
		comment,
		editType,
		oldType
	}, thunkAPI) => {
		try {
			const { accToken } = requestBody(thunkAPI);
			setAuthHeader(accToken);
			let res = '';
			if (editType === 'content') {
				res = await axios.patch(`/transactions/${type}/${id.old}`, {
					date,
					time,
					category,
					sum,
					comment});
			} else {
				res = await axios.post('/transactions', {
					type, 
					date,
					time,
					category,
					sum,
					comment
				});
				await axios.delete(`/transactions/${id.old}`, { type });
				
			}
			const oldId = id.old;
			return {...res.data, editType, oldId, oldType};
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const deleteTransaction = createAsyncThunk(
	'transactions/deleteTransaction',
	async ({ type, id }, thunkAPI) => {
		try {
			const {accToken} = requestBody(thunkAPI);
			setAuthHeader(accToken);
			await axios.delete(`/transactions/${id}`, { type });
			return { id, type };
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message)
		}
	}
);