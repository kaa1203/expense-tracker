import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { transactionReducer } from "./transaction/transactionSlice";
import { modalReducer } from "./modal/modalSlice";
import { categoryReducer } from "./category/categorySlice";

const persistConfig = {
	key: 'expense_auth',
	storage,
	whitelist: ['token', 'sid']
}

export const store = configureStore({
    reducer: {
        auth: persistReducer(persistConfig, authReducer),
        transaction: transactionReducer,
		  category: categoryReducer,
		  modal: modalReducer,
    },
	 middleware: getDefaultMiddleware =>
		 getDefaultMiddleware({
			 serializableCheck: false,
		 }),
});

export const persistor = persistStore(store);