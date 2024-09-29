import {
	ExpenseHomeWrapper,
	WrapperRow,
	TableWrapper,
	Table,
	THead,
	TBody, 
	TableRow,
	TableHead,
	TableData,
	TextWrapper,
	TableContainer,
	HeadingTwo,
	Search,
	SearchWrapper,
	SearchIcon,
	HeadingFour,
	ThPadding
} from "../App.styled";

import { TransactionTableData } from "./TransactionTableData";
import { CiSearch } from "react-icons/ci";
import { Transactions } from "../../pages/ExpenseLog/Transactions";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchTransactions } from "../../redux/transaction/operations";
import { useDispatch } from "react-redux";
import { useTransaction } from "../../hooks/useTransaction";
import { Loader } from "../Loader/Loader";
import { searchTransaction } from "../../redux/transaction/transactionSlice";
import { useState } from "react";
import { CustomCalendar } from "components/CustomCalendar/CustomCalendar";

export const TransactionTable = () => {
	const current = useLocation().pathname.slice(13);

	const dispatch = useDispatch();
	const { isLoading, visibleTransactions, transactions } = useTransaction();

	const [dateValue, setDateValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	
	useEffect(() => {
		dispatch(fetchTransactions({type: current+"s"}));
		dispatch(searchTransaction({type: current+"s"}));
	}, [dispatch, current]);

	useEffect(() => {
		dispatch(searchTransaction({
			keyword: searchValue,
			date: dateValue,
			type: current+"s"
		}));
	}, [dateValue, current, searchValue, dispatch]);

	const handleOnChange = e => {
		setSearchValue(e.target.value);
		dispatch(searchTransaction({
			keyword: e.target.value,
			date: dateValue,
			type: current+"s"
		}));
	}
	
	return(
		<ExpenseHomeWrapper>
			<WrapperRow $type="tran-tab">
				<TextWrapper>
					<HeadingTwo>All {current === 'expense' ? 'expense' : 'income'}</HeadingTwo>
					<p>{current === 'expense' ? 
						'View and manage every transaction seamlessly! Your entire financial landscape, all in one place.' 
						: 
						'Track and celebrate every bit of earnings effortlessly! Gain insights into your total revenue in a snap.'}</p>
				</TextWrapper>
				
				<Transactions />
			</WrapperRow>

			<TableWrapper>
				<WrapperRow $type="table">
					<SearchWrapper>
						<Search
							$type="black" 
							placeholder="Search for anything..."
							name="search"
							value={searchValue}
							onChange={handleOnChange}
						/>
						<SearchIcon>
							<CiSearch size={20} />
						</SearchIcon>
					</SearchWrapper>

					<SearchWrapper>
						<Search 
							$type="hidden"
							placeholder="dd/mm/yyyy"
							name="date"
							onChange={handleOnChange}
							value={dateValue}
							readOnly
						/>
						<CustomCalendar
							options={{
								setDateValue,
								type: 'search'
							}}
						 />
					</SearchWrapper>
				</WrapperRow>
						
				{ isLoading ?
				<Loader size={50}/>
						
				:
				<TableContainer>
					<Table> 
						<THead>
							<TableRow>
								<TableHead scope="col">
										Category
								</TableHead>
								<TableHead scope="col">
										Comment
								</TableHead>
								<TableHead scope="col">
									<ThPadding>
										Date
									</ThPadding>
								</TableHead>
								<TableHead scope="col">Time</TableHead>
								<TableHead scope="col">
									<ThPadding>
										Sum	
									</ThPadding>
								</TableHead>
								<TableHead scope="col">Action</TableHead>
							</TableRow>
						</THead>
						<TBody>
							{/* { transactions[current+"s"].length > 0 && !isLoading && */}
							{ visibleTransactions.length > 0 && !isLoading &&
								visibleTransactions
								.map(transaction => (
									<TransactionTableData 
										key={transaction._id}
										transaction={transaction} />
								))
							}
							{	transactions[current+"s"].length > 0 && 
							visibleTransactions.length === 0  &&
							<TableRow>
								<TableData colSpan={6}>
									<HeadingFour $type="table">No transaction match your search</HeadingFour>
								</TableData>
							</TableRow>
							}
							{ transactions[current+"s"].length === 0  &&
							<TableRow>
								<TableData colSpan={6}>
									<HeadingFour $type="table">You have zero transaction</HeadingFour>
								</TableData>
							</TableRow>
							}
						</TBody>
					</Table>
				</TableContainer>		
				}
			</TableWrapper>
		</ExpenseHomeWrapper>
	);
}