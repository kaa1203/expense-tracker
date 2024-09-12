import { CategoryDropDownListItem } from "components/App.styled";

export const CategoryDropDown = ({ category, setShowCateDd, setCateValue, setCateId }) => {

	const handleOnClick = e => {
		setCateValue(e.target.textContent);
		setShowCateDd(false);
		setCateId(category._id);
	}

	return (
		<CategoryDropDownListItem>
			<p onClick={handleOnClick}
			>{category.categoryName}</p>
		</CategoryDropDownListItem>
	);
};