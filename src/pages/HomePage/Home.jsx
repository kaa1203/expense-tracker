import { HomeWrapper } from "../../components/App.styled";
import { HomeBg } from "./HomeBg";
import { HomeText } from "./HomeText";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/expense-log');
		}
	}, [isLoggedIn, navigate]);

	return (
		<HomeWrapper> 
			<HomeBg />
			<HomeText />
		</HomeWrapper>
	);
}

export default Home;