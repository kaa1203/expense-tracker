import { useSelector } from "react-redux";
import { selectCategory, selectIsError, selectIsLoading } from "../redux/category/selector";

export const useCategory = () => {
	const category = useSelector(selectCategory);
	const categoryIsLoading = useSelector(selectIsLoading);
	const categoryIsError = useSelector(selectIsError);

	return { category, categoryIsError, categoryIsLoading };
}