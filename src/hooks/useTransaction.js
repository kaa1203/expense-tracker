import { useSelector } from "react-redux";
import {
	selectTransaction, 
	selectIsLoading,
	selectVisibleTransaction,
	selectTransactionTotal,
	selectExpenseAve
} from "../redux/transaction/selector";

export const useTransaction = () => {
	const transactions = useSelector(selectTransaction);
	const visibleTransactions = useSelector(selectVisibleTransaction);
	const isLoading = useSelector(selectIsLoading);
	const transactionTotal = useSelector(selectTransactionTotal);
	const expenseAve = useSelector(selectExpenseAve);

	return { 
		transactions, 
		isLoading, 
		visibleTransactions, 
		transactionTotal,
		expenseAve
	}
}