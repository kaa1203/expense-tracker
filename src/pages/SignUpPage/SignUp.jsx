import { HomeBg } from "../HomePage/HomeBg";
import { HomeWrapper } from "../../components/App.styled";
import { HomeForm } from "../../components/HomeForm/HomeForm";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useScreenWidth } from "../../hooks/useScreenWidth";

const SignUp = () => {
	const { isLoggedIn } = useAuth();
	const { width } = useScreenWidth();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (isLoggedIn) {
			navigate('/expense-log');
		}
	}, [isLoggedIn, navigate]);

	return (
		<HomeWrapper>
			{width > 1157 &&
				<HomeBg />
			}
			<HomeForm />
		</HomeWrapper>      
	);
}

export default SignUp;