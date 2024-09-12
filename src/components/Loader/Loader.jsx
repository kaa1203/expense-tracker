import { PuffLoader } from "react-spinners";

export const Loader = ({size}) => {
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center'
		}}>
			<PuffLoader 
				size={size}
				color="#0EF387"
			/>
		</div>
	);
}