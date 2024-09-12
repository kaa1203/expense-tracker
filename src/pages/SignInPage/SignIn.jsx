import { HomeBg } from "../HomePage/HomeBg";
import { HomeWrapper } from "../../components/App.styled";
import { HomeForm } from "../../components/HomeForm/HomeForm";
import { useScreenWidth } from "../../hooks/useScreenWidth";

const SignIn = () => {
	const { width } = useScreenWidth();
	return (
		<HomeWrapper>
			{width > 1157 &&
				<HomeBg />
			}
			<HomeForm />
		</HomeWrapper>      
	);
}

export default SignIn;