import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute/RestrictedRoute";

import Home from "pages/HomePage/Home";
import SignIn from "pages/SignInPage/SignIn";
import SignUp from "pages/SignUpPage/SignUp";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import { Loader } from "./Loader/Loader";

const ExpenseLog = lazy(() => import("../pages/ExpenseLog/ExpenseLog"));
const Expense = lazy(() => import("../pages/ExpensePage/Expense"));
const Income = lazy(() => import("../pages/IncomePage/Income"));


export const App = () => {
	return (
		<Suspense fallback={<Loader/>}>
			<Routes>
				<Route path="/" element={ <SharedLayout />}>
					<Route path="/" index element={ <Home />}/>
					<Route 
						path="signin" 
						element={
							<RestrictedRoute
								redirectTo="/expense-log"
								component={ SignIn }
							/>
					} />
					<Route
						path="/expense-log"
						element={
							<PrivateRoute
								redirectTo="/signin"
								component={ ExpenseLog }
							/>
					} />
					<Route path="expense-log/expense" 
						element={ 
							<PrivateRoute 
								redirectTo="/signin"
								component={ Expense }
							/> 
					} /> 
					<Route path="expense-log/income" 
						element={ 
							<PrivateRoute 
								redirectTo="/signin"
								component={ Income }
							/> 
					} />

					<Route path="signup" element={ <SignUp />}/>
					<Route path="*" element={ <PageNotFound />} />
				</Route>
			</Routes>
		</Suspense>
	)
}