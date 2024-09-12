import { createSlice } from "@reduxjs/toolkit";
import { 
	register,
	login, 
	logout, 
	pageRefresh, 
	refreshUser,
	changeProfile,
	changeDp
} from "./operations";

const handleOnPending = state => {
	state.isLoggedIn = false;
	state.isRefreshing = true;
}

const handleOnReject = (state, action) => {
	state.isLoggedIn = false;
	state.error = action.payload;
	state.isRefreshing = false;
}

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: { 
			name: null, 
			email: null,
			avatarURL: null, 
			currency: null,
			transactionsTotal: {
				incomes: 0,
				expenses: 0
			},
			categories: {
				incomes: [],
				expenses: []
			}
		},
		token: { accessToken: null, refreshToken: null },
		sid: null,
		isLoading: false,
		isLoggedIn: false,
		isRegistered: false,
		isRefreshing: false,
		error: null,
	},
	extraReducers: builder => {
		builder
		.addCase(register.pending, handleOnPending)
		.addCase(register.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isRegistered = true;
			state.isLoggedIn = false;
			state.isRefreshing = false;
		})
		.addCase(register.rejected, handleOnReject)
		.addCase(login.pending, handleOnPending)
		.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.token = {
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken
			};
			state.sid = action.payload.sid;
			state.isRefreshing = false;
			state.isLoggedIn = true;
			state.isRegistered = false;
		})
		.addCase(login.rejected, handleOnReject)
		.addCase(logout.pending, handleOnPending)
		.addCase(logout.fulfilled, state => {
			state.token = { accessToken: null, refreshToken: null };
			state.sid = null;
			state.isLoggedIn = false;
			state.isRefreshing = false;
		})
		.addCase(pageRefresh.fulfilled, (state, action) => {
			state.token = {
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken
			};
		})
		.addCase(pageRefresh.rejected, (state, action) => {
			state.error = action.payload;
			state.isRefreshing = false;
		})
		.addCase(refreshUser.pending, handleOnPending)
		.addCase(refreshUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
			state.isRefreshing = false;
		})
		.addCase(refreshUser.rejected, handleOnReject)
		.addCase(changeProfile.fulfilled, (state, action) => {
			state.user.name = action.payload.name;
			state.user.currency = action.payload.currency;
		})
		.addCase(changeDp.fulfilled, (state, action) => {
			state.user.avatarURL = action.payload;
			console.log(action.payload)
		})
	}
});

export const authReducer = authSlice.reducer;