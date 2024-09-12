import { useSelector } from "react-redux";
import { 
	selectIsLoggedIn, 
	selectIsRefreshing, 
	selectUser, 
	selectError,
	selectIsRegistered,
	selectIsLoading 
} from "../redux/auth/selector";

export const useAuth = () => {
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRegistered = useSelector(selectIsRegistered);
    const isRefreshing = useSelector(selectIsRefreshing);
    const logError = useSelector(selectError);
	 const isLoading = useSelector(selectIsLoading)
    
    return { user, isLoggedIn, isRefreshing, logError, isRegistered, isLoading };
}