import { 
	CategoryItem,
	CategoryIconWrapper,
	CategoryIcon,
	CategoryInput,
	CategoryLabel
} from "../App.styled";

import { FaCheck } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../redux/category/operations";
import { setModal } from "../../redux/modal/modalSlice";
import { useCategory } from "../../hooks/useCategory";

export const Categories = ({ category, type, cateProps }) => {
	const formCate = document.querySelector('#formCateInput');
	const { setEditCategory, setCategoryValue, setCategoryOption } = cateProps;
	const selected = formCate.value === category.categoryName;

	const dispatch = useDispatch();
	const { categoryIsError } = useCategory();

	const handleIconOnClick = e => {
		const dataType = e.currentTarget.dataset.value;

		if (category._id) {
			if (dataType !== "delete") {
				const cateInput = document.querySelector('#cateInput');
				setEditCategory(true);
				setCategoryValue(category.categoryName);
				setCategoryOption({ id: category._id, type });
				cateInput.focus();
			} else {
				dispatch(deleteCategory({
					id: category._id,
					type
				}));
				
				if (categoryIsError) {
					toast.error('Category cannot be deleted, since some transaction relies on it!', {
						theme: 'dark',
						autoClose: 2500
					})
				} else {
					toast.success('Category Deleted!', {
						theme: 'dark',
						autoClose: 2500
					})
				}
			}
		} 
	}

	const handleCateOnClick = () => {
		document.body.style.overflow = "auto";
		dispatch(setModal({ 
			value: false, 
			type:'data', 
			data: category 
		}));
	}


	return (
		<CategoryItem $type={selected.toString()}>
			<CategoryLabel 
				htmlFor={category._id}
				onClick={handleCateOnClick}>
				{category.categoryName.toLowerCase()}
			</CategoryLabel>
			
			<CategoryInput 
				type="radio" 
				name="category"
				id={category._id}
				checked={selected}
				onChange={handleCateOnClick} // <--- added to prevent error hehe
			/>
			<CategoryIconWrapper>
				{selected &&
				<CategoryIcon
					data-value="save"
				> 
					<FaCheck />
				</CategoryIcon>
				}
				<CategoryIcon
					data-value="edit"
					onClick={handleIconOnClick}
				> 
					<FiEdit2 />
				</CategoryIcon>
				<CategoryIcon
					data-value={'delete'}
					onClick={handleIconOnClick} 
				> 
					<LuTrash2 />
				</CategoryIcon>
			</CategoryIconWrapper>
		</CategoryItem>
	)
}