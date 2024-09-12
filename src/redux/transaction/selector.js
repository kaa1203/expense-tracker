import { createSelector } from "@reduxjs/toolkit";
import { selectCategory } from "../../redux/category/selector";

export const selectTransaction = state => state.transaction.item;
export const selectIsLoading = state => state.transaction.isLoading;
export const selectSearchValue = state => state.transaction.search;

const getRandomHexColor = () => {
	return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

export const selectTransactionTotal = createSelector([selectTransaction], 
	(transaction) => {
		const expenses = transaction
			.expenses
			.reduce((total, expense) => 
				total += expense.sum 
			, 0);
		const incomes = transaction
			.incomes
			.reduce((total, income) => 
				total += income.sum 
			, 0);

		return { expenses, incomes };
});

export const selectVisibleTransaction = createSelector(
	[selectSearchValue, selectTransaction],
	(searchValue, transaction) => {
		const type = searchValue.type ? searchValue.type : 'expenses';
		const keyword = searchValue.keyword ? searchValue.keyword.toLowerCase() : '';
		const date = searchValue.date ? searchValue.date : '';
		
		return transaction[type].filter(data => 
			date === '' ?
				(data.comment
				.toLowerCase()
				.includes(keyword)) ||
				(data.category.categoryName
				.toLowerCase()
				.includes(keyword))				
			: 
				(data.comment
				.toLowerCase()
				.includes(keyword) && 
				data.date === date) ||
				(data.category.categoryName
				.toLowerCase()
				.includes(keyword) && 
				data.date === date)			
		);
	}
);

export const selectExpenseAve = createSelector(
	[selectTransaction, selectCategory],
	(transaction, category) => {
		const expCate = category.expenses;
		const expTran = transaction.expenses;
		const counter = {};

		if (expCate.length > 0 && expTran.length > 0) {
			expTran.forEach( tranCate => {
				const cate = tranCate.category.categoryName;
				!counter[cate] ? counter[cate] = 1 : counter[cate]++; 
			})
		}

		const catesKey = Object.keys(counter); 

		const cateTotal = catesKey.reduce((total, cate) => total += counter[cate], 0);
		
		const ave = catesKey.map(cate => {
			return { 
				name: cate,
				value: Math.round(counter[cate] * 100 / cateTotal),
				color: getRandomHexColor()
			};
		});

		return ave;
	}
)