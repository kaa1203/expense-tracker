import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

import { 
	TableRow,
	TableData,
	TableButtonWrapper,
	Button,
	TableIconWrapper,
	TableIcon
} from "../App.styled"

import { toast } from "react-toastify";
import { setModal } from "../../redux/modal/modalSlice";
import { deleteTransaction } from "../../redux/transaction/operations";
import { useDispatch } from "react-redux";
import { useScreenWidth } from "../../hooks/useScreenWidth";

export const dateConverter = date => {
	const monthArray = [
		'January', 'February', 'March', 'April', 
		'May', 'June', 'July', 'August', 
		'September', 'October', 'November', 'December'
	];

	const d = date.split('-');
	const monthIndex = Number(d[1]);
	let month = monthArray[monthIndex]; 
	month = window.innerWidth < 1158 ? month.slice(0, 3) : month;
	
	return `${month} ${d[2]}. ${d[0]}`;
}

export const TransactionTableData = ({transaction}) => {
	const dispatch = useDispatch();
	
	const { width } = useScreenWidth();

	const handleOnClick = e => {
		const btn = e.currentTarget.dataset.button;
		
		if (btn === "delete") {
			dispatch(deleteTransaction({
				type: transaction.type,
				id: transaction._id
			}));
			toast.success('Transaction Deleted!', {
				theme: 'dark',
				autoClose: 2500
			})
			return;
		}
		// Ran into problem after not specifically targetted the button, so starting now I will put a specific condition to everything, I hate debugging T_T
		if (btn === 'edit') {
			return dispatch(setModal({
				 type: 'edit', 
				 value: true, 
				 data: transaction
			}));
		}
	}

	return (
		<TableRow>
			<TableData>{transaction.category.categoryName}</TableData>
			<TableData>{transaction.comment}</TableData>
			<TableData>{dateConverter(transaction.date)}</TableData>
			<TableData>{transaction.time}</TableData>
			<TableData>{transaction.sum}</TableData>
			<TableData>
				<TableButtonWrapper>
					<Button 
						$type="table"
						onClick={handleOnClick}
						data-button="edit"
					>
						<TableIconWrapper>
							<TableIcon>
								<FiEdit2 size={17} />
							</TableIcon>
							{ width >= 1158 &&
								'Edit'
							}
						</TableIconWrapper>
					</Button>
					<Button 
						$type="table"
						color="black"
						onClick={handleOnClick}
						data-button="delete"
					>
						<TableIconWrapper>
							<TableIcon>
								<LuTrash2 size={17} />
							</TableIcon>
							{ width >= 1158 &&
								'Delete'
							}
						</TableIconWrapper>
					</Button>
				</TableButtonWrapper>
			</TableData>
		</TableRow>
	)
}