import { 
   CalendarInput,
   CalendarInputWrapper,
   CalendarWrapper,
   DayItem,
   DayList,
   DateItem,
   DateList,
   CalendarIcon,
   InputPlaceholder,
   CalendarHeader,
   CalendarHeaderWrapper,
	CloseIcon,
	Patch
} from "../App.styled";

import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { dateConverter } from "components/TransactionTable/TransactionTableData";

const CalendarGenerator = (monthCounter) => {
   let date = new Date();
   let year = date.getFullYear();
   let month = monthCounter;
	
   const monthArray = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
		'October',
      'November',
      'December'
   ];

   const daysArray = [];
   
   // first day
   let dayOne = new Date(year, month, 1).getDay();
   // last date 
   let lastDay = new Date(year, month + 1, 0).getDate();
   // day of the last date
   let dayEnd = new Date(year, month, lastDay).getDay();
   // previous month last date
   let excessDate = new Date(year, month, 0).getDate();

	if (month > 11 || month < 0) {
		date = new Date(year, month, new Date().getDate());
		year = date.getFullYear();
		// month = date.getMonth();
	}
	
	if (month > 11) {
		month %= 12;
	} 
	if (month < 0) {
		month %= 12;
		if (month !== 0) {
			month = Math.abs(month + 12); 
		}
	}		
	
	const currentMonth = { string: monthArray[month], number: month };

   // get excess dates from prev month 
   for (let i = dayOne ; i > 0; i--) {
      daysArray.push({
			type: 'excess', 
			day: (excessDate) - i + 1, 
			month: monthArray[month - 1]
		});
   }
	
   for (let i = 1; i <= lastDay; i++) {
      if (date.getDate() === i &&
			 month === new Date().getMonth() &&
			 year === new Date().getFullYear()
		) {
         daysArray.push({
				type: 'current', 
				day: i, 
				month: monthArray[month]
			});
      } else {
         daysArray.push({
				type: 'normal', 
				day: i, 
				month: monthArray[month]
			});
      }
   }
	
   for (let i = dayEnd; i < 6; i++) {
      daysArray.push({
			type: 'next', 
			day: i - dayEnd + 1, 
			month: monthArray[month + 1]
		});
   }
	
   return { daysArray, currentMonth, year };
}

export const CustomCalendar = ({options}) => {
const now = new Date().getMonth();
const [showCalendar, setShowCalendar] = useState(false);
const [monthCounter, setMonthCounter] = useState(now);
const [date, setDate] = useState('');

const {isDateHidden, setIsDateHidden} = options; // <-- added some variable

let setCateDate, cateDate, setDateValue; // <-- too lazy to change a lot of things so i'll just leave this as is hehe

if (options.type === 'form' ||
	options.type === 'edit'
 ) {
	setCateDate = options.setCateDate;
	cateDate = options.cateDate;
} else {
	setDateValue = options.setDateValue;
}

useEffect(() => {
	if (cateDate === '') {
		setDate('');
	}
}, [cateDate]);

let { daysArray, currentMonth, year } = CalendarGenerator(monthCounter);

const addZeroes = (num) => num <= 9 ? `0${num}` : num;

const handleOnClick = () => setShowCalendar(!showCalendar);
const handleDeleteOnClick = () => {
	setDate('');
	setDateValue('');
};

const handleDayOnClick = e => {
	let day = e.target.textContent;
	let month = e.target.dataset.month;
	let dayType = e.target.dataset.type;

	let { number, string} = currentMonth; 

	if (!month && string === 'January') {
		month = 'December';
		year -= 1;
	} 
	
	if (!month && string === 'December') {
		month = 'January';
		year += 1; 
	}
	
	if (dayType === 'excess') {
		number = Number(number) - 1;
	}

	if (dayType === 'next') {
		number = Number(number) + 1;
	}
	
	setShowCalendar(!showCalendar);
	if (options.type === 'form') {
		month = window.innerWidth < 768 ? month.slice(0, 3) : month;

		setDate(`${addZeroes(month)} ${addZeroes(day)}. ${year}`);
		setCateDate(`${year}-${addZeroes(number)}-${addZeroes(day)}`);
		setIsDateHidden(true);
	} else if (options.type === 'search') {
		setDate(`${addZeroes(month)} ${addZeroes(day)}. ${year}`);
		setDateValue(`${year}-${addZeroes(number)}-${addZeroes(day)}`);
	} else {
		month = window.innerWidth < 1158 ? month.slice(0, 3) : month;

		setDate(`${addZeroes(month)} ${addZeroes(day)}. ${year}`);
		setCateDate(`${year}-${addZeroes(number)}-${addZeroes(day)}`);
		setIsDateHidden(true);
	}
	
}

const handleChevOnClick = e => {
	const chev = e.currentTarget.dataset.chev;
	
	if (chev === 'next') {
		return setMonthCounter(monthCounter + 1);
	} 
	setMonthCounter(monthCounter - 1);      
}

	return (
		<CalendarInputWrapper>
			{
				showCalendar &&
			<CalendarWrapper>
				<CalendarHeaderWrapper>
					<CalendarIcon
						data-chev="prev" 
						$type="chevron"
						onClick={handleChevOnClick}
					>
						<FaChevronLeft size={12} />
					</CalendarIcon>
					<CalendarHeader>
						{currentMonth.string +" "+ year}
					</CalendarHeader>
					<CalendarIcon 
						$type="chevron"
						data-chev="next" 
						onClick={handleChevOnClick}
					>
						<FaChevronRight size={12} />
					</CalendarIcon>
				</CalendarHeaderWrapper>
				<DayList>
					<DayItem>Su</DayItem>
					<DayItem>Mo</DayItem>
					<DayItem>Tu</DayItem>
					<DayItem>We</DayItem>
					<DayItem>Th</DayItem>
					<DayItem>Fr</DayItem>
					<DayItem>Sa</DayItem>
				</DayList>
				<DateList>
					{
						daysArray.map((array, i) => (
							<DateItem 
								key={i} 
								$type={array.type}
								data-type={array.type}
								data-month={array.month}
								onClick={handleDayOnClick}
								>
									{array.day}
							</DateItem>
						))
					} 
				</DateList>
			</CalendarWrapper>
			}
			<CalendarInput
				$type={options.type} 
				onClick={handleOnClick}>
				<InputPlaceholder	  $type={date} $c='search'>
					{date ? date : 'mm/dd/yyyy' }          
				</InputPlaceholder>
				<CalendarIcon $type={options.type}>
					<CiCalendar size={20} />
				</CalendarIcon>
				{isDateHidden === false &&
					<Patch>{dateConverter(options.cateDate)}</Patch>
				}
			</CalendarInput>
				{options.type === 'search' && date !== '' &&
					<CloseIcon 
						$type='search'
						onClick={handleDeleteOnClick}
					>
						<IoCloseOutline size={20} />
					</CloseIcon>
				}
		</CalendarInputWrapper>
	)
}