import {
	WrapperColumn,
	WrapperRow, 
	TForm,
	TextArea,
	Input,
	Radio,
	Label,
	CustomRadio,
	Button,
	CategoryDropDownList,
	ClockIcon,
	Patch
} from "../App.styled";

import { 
	addTransaction, 
	editTransaction,
} from "../../redux/transaction/operations";

import { GoClock } from "react-icons/go";
import { toast } from "react-toastify";
import { CustomCalendar } from "components/CustomCalendar/CustomCalendar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/modal/modalSlice";
import { useModal } from "../../hooks/useModal";
import { useCategory } from "../../hooks/useCategory";
import { CategoryDropDown } from "./CategoryDropDown";
import { Loader } from "components/Loader/Loader";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const TransactionForm = () => {
	const dispatch = useDispatch();
	const { modalData, modalType } = useModal();
	const { category, categoryIsLoading } = useCategory();
	const { user } = useAuth();
	const current = useLocation().pathname;
	
	const [type, setType] = useState('');
	const [showCateDd, setShowCateDd] = useState(false);
	const [expenseIsChecked, setExpenseIsChecked] = useState(true);
	const [incomeIsChecked, setIncomeIsChecked] = useState(false);
	const [cateValue, setCateValue] = useState('');
	const [cateId, setCateId] = useState('');
	const [cateDate, setCateDate] = useState('');
	const [cateTime, setCateTime] = useState('');
	const [cateSum, setCateSum] = useState('');
	const [cateCom, setCateCom] = useState('');
	const [isDateHidden, setIsDateHidden] = useState(true);
	const [submit, setSubmit] = useState('');
	
	useEffect(() => {
		if (modalData && modalType !== 'edit' && submit === false) {
			setCateValue(modalData && modalData.categoryName);
			setCateId(modalData && modalData._id);
		} 
		
		if (modalType === 'edit') {
			if (modalData.type === 'incomes') {
				setIncomeIsChecked(true);
				setExpenseIsChecked(false);
			} else {
				setIncomeIsChecked(false);
				setExpenseIsChecked(true);
			}

			setIsDateHidden(false);
			setCateId(modalData.category._id);
			setCateValue(modalData.category.categoryName);
			setCateDate(modalData.date);
			setCateTime(modalData.time);
			setCateSum(modalData.sum);
			setCateCom(modalData.comment);
			setType(modalData.type);
		}
		
	}, [modalData, modalType, submit]);

	const handleOnChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		if (name === 'transaction') {
			if (value === 'expenses') {
				setExpenseIsChecked(true)
				setIncomeIsChecked(false);
			} else {
				setExpenseIsChecked(false)
				setIncomeIsChecked(true);
			}
			setCateValue('');
			setType(value);
		}
		
		switch (name) {
			case 'date':
				return setCateDate(value);
			case 'time':
				return setCateTime(value);
			case 'sum':
				return setCateSum(value);
			case 'comment':
				return setCateCom(value);
			default:
				return ;
		}
	}
	
	const handleOnSubmit = e => {
		e.preventDefault();
		const form = e.target;
		const elem = form.elements;
		
		if (elem.date.value === '') {
			return toast.error('Empty Date!',{
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (elem.time.value === '') {
			return toast.error('Empty Time!',{
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (elem.category.value === '') {
			return toast.error('Empty Category!',{
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (elem.sum.value === '') {
			return toast.error('Empty Sum!',{
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (elem.comment.value === '') {
			return toast.error('Empty Comment!',{
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (elem.comment.value.length < 3) {
			return toast.error('Comment must be atleast 3 characters long!',{
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (elem.comment.value.length > 48) {
			return toast.error('Comment must be less than 48 characters!',{
				theme: 'dark',
				autoClose: 2500
			});
		}
		
		if (modalType !== 'edit') {
			dispatch(addTransaction({
				type: elem.transaction.value,
				date: elem.date.value,
				time: elem.time.value,
				category: elem.category.dataset.id,
				sum: elem.sum.value,
				comment: elem.comment.value,
			}));
			setSubmit(true);
			toast.success('Transaction Added!',{
				theme: 'dark',
				autoClose: 2500
			});
		}

		// waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah I'm so confused on what data to fetch hahaha.
		if (modalType === 'edit') {
			const editType = modalData.type === elem.transaction.value ? 'content' : 'transaction';
			
			dispatch(editTransaction({
				id: { 
					old: modalData._id, 
					new: elem.transaction.value 
				},
				type: elem.transaction.value,
				date: elem.date.value,
				time: elem.time.value,
				category: elem.category.dataset.id,
				sum: elem.sum.value,
				comment: elem.comment.value,
				oldType: modalData.type,
				editType,
			}));

			toast.success('Transaction Updated!',{
				theme: 'dark',
				autoClose: 2500
			});

			dispatch(setModal({ value: false, type: '', data: {} }));
			document.body.style.overflow = "auto";
		}
		
		setCateValue('');
		setCateId('');
		setCateDate('');
		setCateTime('');
		setCateSum('');
		setCateCom('');
	}

	const handleCategoryOnClick = () => {
		const category = incomeIsChecked ? 'Incomes' : 'Expenses';

		if (modalType !== 'edit') {
			dispatch(setModal({ 
				value: true, 
				type: category, 
				data: {}
			}));
			setSubmit(false);
		} else {
			setShowCateDd(!showCateDd);
		}
	}
	
	return (
		<TForm 
			$type={modalType ? modalType.toString() : ''}
			onSubmit={handleOnSubmit}
		>
			<WrapperRow $type="form-radio">
				<Label $type="form-radio">
					<Radio 
						type="radio"
						name="transaction"
						value="expenses"
						checked={expenseIsChecked}
						onChange={ handleOnChange }
					/>
					<CustomRadio />
					Expense
				</Label>
				<Label $type="form-radio">
					<Radio 
						type="radio"
						name="transaction"
						value="incomes"
						checked={incomeIsChecked}
						onChange={ handleOnChange }
					/>
					<CustomRadio />
					Income
				</Label>
			</WrapperRow>

			<WrapperRow $type="form-date">
				<Label>
					Date
					<Input 
						$type="date"
						onChange={handleOnChange}
						value={cateDate}
						type="text"
						placeholder="mm/dd/yyyy"
						name="date"
					/>
					<CustomCalendar
						options={{ 
							setCateDate,
							cateDate,
							type: current === '/expense-log' ? 'form' : 'edit',
							isDateHidden,
							setIsDateHidden
					}}
					/>
				</Label>

				<Label>
					Time
					<Input
						$type="time"
						onChange={handleOnChange}
						value={cateTime}
						type="time"
						placeholder="00:00:00"
						name="time"
					/>
					<ClockIcon>
						<GoClock size={18} />
					</ClockIcon>
				</Label>
			</WrapperRow>

			<WrapperColumn $type="category">
				<Label>
					Category
					<Input 
						type="text"
						$label="category"
						placeholder={"Category"}
						name="category"
						value={cateValue || ''}
						onClick={handleCategoryOnClick}
						data-id={cateId}
						id="formCateInput"
						readOnly
					/>
				</Label>
				{modalType === 'edit' && showCateDd &&
					<WrapperColumn>
						<CategoryDropDownList>
						{ categoryIsLoading && <Loader size={35} />}
						{ !categoryIsLoading  &&
						category[type].map(category => (
							<CategoryDropDown
								key={category._id}
								category={category}
								setType={setType}
								setShowCateDd={setShowCateDd}
								setCateValue={setCateValue}
								setCateId={setCateId}
							/>
							))
						}
						</CategoryDropDownList>
					</WrapperColumn>
				}
			</WrapperColumn>

			<WrapperColumn>
				<Label>
					Sum
					<Input 
						type="number"
						placeholder="Enter the sum"
						name="sum"
						autoComplete="off"
						onChange={handleOnChange}
						value={cateSum}
					/>
				<Patch $type="cur">{user.currency.toUpperCase()}</Patch>
				</Label>
			</WrapperColumn>

			<WrapperColumn>
				<Label>
					Comment
					<TextArea 
						placeholder="Enter comment"
						name="comment"
						onChange={handleOnChange}
						value={cateCom}
					/>
				</Label>
			</WrapperColumn>
			
			<Button $type="form-button">
				{ modalType === 'edit' ? 'Save' :'Add' }
			</Button>
		</TForm>
	)
};
