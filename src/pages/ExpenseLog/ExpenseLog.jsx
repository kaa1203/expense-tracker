import {
	WrapperColumn,
	HomeWrapper,
	TextWrapper,
	HeadingTwo,
	HeadingThree,
	ChartWrapper,
	ChartList,
	ChartItem,
	CustomBullet,
	DummyElement,
} from "../../components/App.styled";

import { Transactions } from "./Transactions";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { TransactionChart } from "components/TransactionChart/TransactionChart";
import { useTransaction } from "../../hooks/useTransaction";
import { ChartLoader } from "components/Loader/Chart";

const ExpenseLog = () => {
	const { expenseAve, isLoading } = useTransaction();
	
	return (
		<HomeWrapper $type="expense-home">
			<WrapperColumn $type="expense-home">
				<TextWrapper>
					<HeadingTwo>expense log</HeadingTwo>
					<p>Capture and organize every penny spent with ease! A clear view of your financial habits at your fingertips.</p>
				</TextWrapper>
				<Transactions />
				<ChartWrapper>
					{ isLoading 
						? 
						<ChartLoader/>  
						: 
							expenseAve.length > 0 ?
							<>
								<TransactionChart/>
								<ChartList>
									{ expenseAve.map((ave, index) => (
										<ChartItem key={index}>
											<CustomBullet
												style={{
													backgroundColor: `${ave.color}`
												}}
											/>
											<p>{ave.name}</p>
											<p style={{
												marginLeft: 'auto',
												fontWeight: '700',
												color: 'var(--white)',
												paddingRight: '15px'
											}}>{ave.value}%</p>
										</ChartItem>
										))
									}
								</ChartList>
							</>
							:
							<WrapperColumn>
								<HeadingTwo $type="chart">There are no data to show yet</HeadingTwo>
								<HeadingThree $type="chart">Start adding now!</HeadingThree>
							</WrapperColumn>
					}
				</ChartWrapper>
				<DummyElement/>
			</WrapperColumn>
			<TransactionForm />
		</HomeWrapper>
	);
}

export default ExpenseLog;