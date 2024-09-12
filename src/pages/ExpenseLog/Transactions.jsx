import { GoArrowUpRight } from "react-icons/go";
import { useAuth } from "../../hooks/useAuth";
import {
	HeadingFour,
	HeadingFive,
	TotalWrapper,
	TotalBlock,
	HomeIcon,
	BalWrapper
} from "../../components/App.styled";
import { useTransaction } from "../../hooks/useTransaction";

export const Transactions = () => {
	const { isLoggedIn, user } = useAuth();
	const { transactionTotal } = useTransaction();
	
	const symbol = cur => {
		if (cur === 'usd') return '$';
		if (cur === 'eur') return '€';
		if (cur === 'uah') return '₴';
	}

	return (
		<TotalWrapper>
			<TotalBlock>
				<HomeIcon>
					<GoArrowUpRight size={25} />
				</HomeIcon>
				
				<BalWrapper>
					<HeadingFive 
						$isloggedin={ isLoggedIn.toString() }
					>
						Total Income
					</HeadingFive>
					<HeadingFour
						$isloggedin={ isLoggedIn.toString() }
					>	
						{
						 transactionTotal.incomes !== 0 
						 ?
						 	symbol(user.currency) +" "+ transactionTotal.incomes 
						 : 
						 	symbol(user.currency) +" "+ user.transactionsTotal.incomes
						 }
					</HeadingFour>
				</BalWrapper>
			</TotalBlock>
			<TotalBlock>
				<HomeIcon>
					<GoArrowUpRight size={25} style={{
						transform: 'rotate(180deg)',
					}} />
				</HomeIcon>
				
				<BalWrapper>
					<HeadingFive 
						$isloggedin={ isLoggedIn.toString() }
					>
						Total Expense
					</HeadingFive>
					<HeadingFour
						$isloggedin={ isLoggedIn.toString() }
						>
						{ 
							transactionTotal.expenses !== 0 
							?
							 symbol(user.currency) +" "+ transactionTotal.expenses 
							: 
							 symbol(user.currency) +" "+ user.transactionsTotal.expenses
						}
					</HeadingFour>
				</BalWrapper>
			</TotalBlock>
		</TotalWrapper>
	);
}