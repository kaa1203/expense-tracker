import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, requestBody, setAuthHeader } from "../../redux/auth/operations";

axios.defaults.baseURL = BASE_URL;

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async(_, thunkAPI) => {
		try {
			const { accToken } = requestBody(thunkAPI);
			setAuthHeader(accToken);
			const res = await axios.get('categories');
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const addCategory = createAsyncThunk(
	'categories/addCategory',
	async({ type, categoryName }, thunkAPI) => {
		try {
			const { accToken } = requestBody(thunkAPI);
			setAuthHeader(accToken);
			const res = await axios.post('categories', { type, categoryName });
			return res.data;
		} catch (e) {
			thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const updateCategory = createAsyncThunk(
	'categories/updateCategory',
	async({ id, categoryName, type }, thunkAPI) => {
		try {
			const { accToken } = requestBody(thunkAPI);
			setAuthHeader(accToken);
			const res = await axios.patch(`categories/${id}`, { categoryName });
			const data = {...res.data, type}
			return data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);			
		}
	}
);

export const deleteCategory = createAsyncThunk(
	'categories/deleteCategory',
	async({id, type}, thunkAPI) => {
		try {
			const { accToken } = requestBody(thunkAPI);
			setAuthHeader(accToken);
			await axios.delete(`categories/${id}`, type);
			return { id, type };
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);			
		}
	}
);