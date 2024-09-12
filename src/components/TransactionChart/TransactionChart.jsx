import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTransaction } from "../../hooks/useTransaction";
import { HeadingFour, HeadingFive } from "components/App.styled";
import { useScreenWidth } from "../../hooks/useScreenWidth";

export const TransactionChart = () => {
	const { expenseAve } = useTransaction();
	const { width } = useScreenWidth();
	const data = expenseAve;

	const cx = width < 768 ? 145 : 170;
	const cy = 190;
	const or = width < 768 ? 120 : 140;
	const ir = width < 768 ? 75 : 80;

	return(
		<ResponsiveContainer>
			<HeadingFive $type="chart">Expenses categories</HeadingFive>
			<PieChart>
			<Pie
				dataKey="value"
				startAngle={180}
				endAngle={0}
				data={data}
				cx={cx}
				cy={cy}
				innerRadius={ir}
				outerRadius={or}	
				fill="#8884d8"
				stroke="none"
				animation={true}
			>
				{data.map((entry, index) => (
					<Cell 
						key={`cell-${index}`} 
						fill={entry.color} 
					/>
				))}
			</Pie>
			</PieChart>
			<HeadingFour $type="chart">100%</HeadingFour>
		</ResponsiveContainer>
	);
}