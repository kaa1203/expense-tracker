import { 
	Form, 
	HeadingOne, 
	TextWrapper,
	Input,
	InputContainer,
	InputWrapper,
	FormIcon,
	FormButton,
	FormButtonWrapper,
	FormLink,
	GreyText,
	InputMessage
} from "../App.styled";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { register, login } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/useAuth";

const validateEmail = (email) => {
	const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //eslint-disable-line
	return regex.test(email);
 };

export const HomeForm = () => {
	const [isPword, setIsPword] = useState(true);
	const [type, setType] = useState('password');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nameInput, setNameInput] = useState({state: false, message: '', isOk: ''});
	const [emailInput, setEmailInput] = useState({state: false, message: '', isOk: ''});
	const [passwordInput, setPasswordInput] = useState({state: false, message: '', isOk: ''});
	
	const { logError, isRegistered, isLoggedIn } = useAuth();

	const current = useLocation().pathname;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	useEffect(() => {
		// I know there's a much better approach here, but this is the best way my sleep deprived brain can come up with T_T...
		if (!isRegistered) {
			const local = JSON.parse(localStorage.getItem('reg-data'));
			if (current === '/signup' && local !== null) {
				setName(local.name);
				setNameInput({
					state: true,
					message: 'Name is accepted!',
					isOk: true
				});
				setEmail(local.email);
				setEmailInput({
					state: true,
					message: 'Username is already taken!',
					isOk: false
				});
			} else {
				localStorage.removeItem('reg-data');
			}	
		} else {
			navigate('/signin');
			localStorage.removeItem('reg-data');
		}
		
		if (!isLoggedIn) {
			const local = JSON.parse(localStorage.getItem('log-data'));
			if (current === '/signin' && local !== null) {
				setEmail(local.email)
				console.log(logError)
				if (logError === 403) {
					setEmailInput({
						state: true,
						message: 'Email or Password is wrong',
						isOk: false
					});
					setPasswordInput({
						state: true,
						message: 'Email or Password is wrong',
						isOk: false
					});
				} else {
					setPasswordInput({
						state: true,
						message: 'Wrong Password!',
						isOk: false
					});
				}
			} else {
				localStorage.removeItem('log-data');
			}	
		}
	}, [dispatch, logError, isRegistered, current, isLoggedIn, navigate]);
	
	const handleOnClick = () => {
		setIsPword(!isPword)
		if (isPword) {
			setType("text");
		} else {
			setType("password");
		}
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		const form = e.target;
		const type = form.elements.length;	
		const data = form.elements;

		if (type === 4) {
			if (data.name.value.length < 2) return;
			if (!validateEmail(data.email.value)) return;
			if (data.password.value.length < 8) return;

			localStorage.setItem('reg-data', JSON.stringify({
				name: data.name.value,
				email: data.email.value,
			}));

			dispatch(register({
				name: data.name.value,
				email: data.email.value, 
				password: data.password.value
			}));
			// form.reset();
		} else {
			localStorage.setItem('log-data', JSON.stringify({
				email: data.email.value,
			}));
			dispatch(login({
				email: data.email.value, 
				password: data.password.value
			}));
		}
	}
	
	const handleOnChange = e => {
		const input = e.target.name;
		const inputVal = e.target.value;

		if (input === 'name') {
			setName(inputVal);			
			if (inputVal.length < 2) {
				setNameInput({
					state: true,
					message: 'Name must be atleast 2 characters!',
					isOk: false
				});
			} else {
				setNameInput({
					state: true,
					message: 'Name is accepted!',
					isOk: true
				});
			}
		}
		if (input === 'email') {
			setEmail(inputVal);
			if (current === '/signin') return;
			if (!validateEmail(inputVal)) {
				setEmailInput({
					state: true,
					message: 'Enter a valid Email!',
					isOk: false
				});
			} else {
				setEmailInput({
					state: true,
					message: 'Email is accepted!',
					isOk: true
				});
			}
		}
		if (input === 'password') {
			setPassword(inputVal);
			if (current === '/signin') return;
			if (inputVal.length < 8) {
				setPasswordInput({
					state: true,
					message: 'Enter a valid Password!',
					isOk: false
				});
			} else {
				setPasswordInput({
					state: true,
					message: 'Password is accepted!',
					isOk: true
				});
			}
		}
	}
	
	return (
		<Form onSubmit={handleOnSubmit}>
			<TextWrapper $type="siu">
				<HeadingOne>
					{ current === '/signup' ? 'sign up' : 'sign in' }
				</HeadingOne>
				{ 
					current === '/signin' 
					?
					<p>
						Welcome back to effortless expense tracking! Your financial dashboard awaits.
					</p>
					:
					<p>
						Step into a world of hassle-free expense management! Your journey towards financial mastery begins here.
					</p>
				}
			</TextWrapper>

			<InputContainer>
				{ current !== '/signin' && 
					<InputWrapper>
						<Input
							$type={nameInput.isOk.toString()} 
							type="text" 
							name="name"
							placeholder="Name" 
							value={name}
							onChange={handleOnChange}
							autoComplete="off"
						/>
						{ nameInput.state &&
							<InputMessage
								$status={nameInput.isOk.toString()}
							>
								{nameInput.message}
							</InputMessage>
						}
					</InputWrapper>
				}

				<InputWrapper>
					<Input 
						$type={emailInput.isOk.toString()}
						type="email" 
						name="email" 
						placeholder="Email"
						value={email}
						onChange={handleOnChange}
						autoComplete="off"
					/>
					{ emailInput.state &&
						<InputMessage
							$status={emailInput.isOk.toString()}
						>
							{emailInput.message}
						</InputMessage>
					}
				</InputWrapper>
				
				<InputWrapper>
					<Input
						$type={passwordInput.isOk.toString()}
						type={type} 
						name="password" 
						placeholder="Password"
						value={password}
						onChange={handleOnChange}
						autoComplete="off" 
					/>
					<FormIcon 
						onClick={handleOnClick}
					>
						{ isPword ? 
							<LuEyeOff size={23} />	
							:  
							<LuEye size={23} />
						}
					</FormIcon>
					{ passwordInput.state &&
						<InputMessage
							$status={passwordInput.isOk.toString()}
						>
							{passwordInput.message}
						</InputMessage>
					}
				</InputWrapper>
			</InputContainer>

			<FormButtonWrapper>
				<FormButton>
					{ current === '/signup' ? 'sign up' : 'sign in' }
				</FormButton>
				{
					current === '/signup' ?
					<GreyText>
						Already have an account? 
						<FormLink to="/signin">
							sign in
						</FormLink>
					</GreyText>
					:
					<GreyText>
						Don't have an account?
						<FormLink to="/signup">
							sign up
						</FormLink>
					</GreyText>
				}
			</FormButtonWrapper>
		</Form>	
	)
}