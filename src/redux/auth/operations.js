import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = 'https://expense-tracker.b.goit.study/api/';

axios.defaults.baseURL = BASE_URL;

export const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
} 

// const clearAuthHeader = () => {
// 	axios.defaults.headers.common.Authorization = '';
// }

export const requestBody = thunkAPI => {
	const state = thunkAPI.getState();
	const refToken = state.auth.token.refreshToken;
	const accToken = state.auth.token.accessToken;
	const sid = state.auth.sid;

	return { refToken, accToken, sid };
}

export const register = createAsyncThunk(
	'auth/register',
	async({ name, email, password }, thunkAPI) => {
		try {
			const res = await axios.post('/auth/register', { name, email, password });
			setAuthHeader(res.data.accessToken);
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
);

export const login = createAsyncThunk(
	'auth/login',
	async({ email, password }, thunkAPI) => {
		try {
			const res = await axios.post('/auth/login', { email, password });
			setAuthHeader(res.data.accessToken);
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	}
);

export const logout = createAsyncThunk(
	'auth/logout', 
	async(_, thunkAPI) => {
		try {
			const { refToken } = requestBody(thunkAPI);
			return await axios.get('/auth/logout', {refToken});
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
)

export const pageRefresh = createAsyncThunk(
	'auth/refresh',
	async(_, thunkAPI) => {
		const { refToken, sid } = requestBody(thunkAPI);

		if (refToken === null) {
			return thunkAPI.rejectWithValue("Unable to fetch user");
		}
	
		try {
			setAuthHeader(refToken);
			const res = await axios.post('/auth/refresh', {sid});

			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const refreshUser = createAsyncThunk(
	'users/current',
	async(_, thunkAPI) => {
		const { accToken } = requestBody(thunkAPI);
		
		if (accToken === null) {
			return thunkAPI.rejectWithValue("Unable to fetch user");
		}

		try {
			setAuthHeader(accToken);			
			const res = await axios.get('/users/current');
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);	
		}
	}
);

export const changeProfile = createAsyncThunk(
	'auth/changeProfile',
	async({ name, currency }, thunkAPI) => {
		try {
			const { accToken } = requestBody(thunkAPI);
			setAuthHeader(accToken);
			const res = await axios.patch('users/info', { name, currency });
			return res.data;
		} catch (e) {
			thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const changeDp = createAsyncThunk(
	'auth/changeDp',
	async(avatarUrl, thunkAPI) => {
		try {
			console.log(avatarUrl);
			const { accToken } = requestBody(thunkAPI);
			setAuthHeader(accToken);
			const res = await axios.patch('users/avatar', avatarUrl);
			return res.data;
		} catch (e) {
			thunkAPI.rejectWithValue(e.message);
		} 
	}
);