import { NotFoundCon, NotFoundText, NotFoundImg } from "components/App.styled";
const PageNotFound = () => {
	return (
		<NotFoundCon>
			<NotFoundText>Error 404! Page not found!</NotFoundText>
			<NotFoundImg src="https://media1.tenor.com/m/x-Eevsd_n0EAAAAd/harburg-dubliner.gif" alt="404" />
		</NotFoundCon>
	);
}

export default PageNotFound;