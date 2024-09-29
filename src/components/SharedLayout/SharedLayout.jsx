import { 
	Container, 
	NavWAuth, 
	NavWoAuth, 
	Logo,
	HeaderNavLink,
	NavButtonWrapper,
	ProfileWrapper,
	ProfileIcon,
	DropDown,
	DropDownList,
	DropDownIcon,
	Overlay,
	Burger,
	UserImage
} from "../App.styled";

import { FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { Link, Outlet } from "react-router-dom";
import { MdKeyboardControlKey } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { Modal } from "../Modal/Modal";
import { setModal } from "../../redux/modal/modalSlice";
import { fetchTransactions } from "../../redux/transaction/operations";
import { fetchCategories } from "../../redux/category/operations";
import { TbMenu } from "react-icons/tb";
import { MobileMenu } from "components/Modal/MobileMenu";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "components/Loader/Loader";

export const SharedLayout = () => {
	const { showModal, modalType } = useModal();
	const { isLoggedIn, user, isRefreshing } = useAuth();
	
	const [showDD, setShowDD] = useState(false);

	const dispatch = useDispatch();

	useEffect(()=> {
		dispatch(refreshUser());
		// setTimeout(() => {
		// 	dispatch(pageRefresh());
		// }, 3000);
	}, [dispatch]);
	
	useEffect(() => {
		if (isLoggedIn) {
			dispatch(fetchCategories());
			dispatch(fetchTransactions({ type: 'expenses'}));
			dispatch(fetchTransactions({ type: 'incomes'}));
		}
		
		if (JSON.parse(localStorage.getItem('log-data')) !== null) {
			localStorage.removeItem('log-data')
		}
	}, [isLoggedIn, dispatch]);


	useEffect(() => {
		document.addEventListener("keydown", closeModals);
		document.addEventListener("click", closeDd);
		return () => {
			document.removeEventListener("keydown", closeModals);
			document.removeEventListener("click", closeDd);
		}
	});

	const closeModals = e => {
		if (e.target.id === 'overlay') {
			dispatch(setModal({value: false, type: '', data: ''}));
			document.body.style.overflow = 'auto';
		}
		if (e.key === 'Escape') {
			dispatch(setModal({value: false, type: '', data: ''}));
			document.body.style.overflow = 'auto';
		}
	}

	const closeDd = e => {
		const id = e.target.id;
		if(showDD) {
			if(id === 'root' || id === '') {
				setShowDD(false);
			}
		}
	}

	const handleOnClick = e => {
		const id = e.target.id;
		if (id === 'profileWrapper' || id === 'profileName') {
			setShowDD(true);
		}
	}

	const handleDdOnClick = e => {
		if (e.currentTarget.textContent === 'logout') {
			dispatch(setModal({ value: true, type: 'logout', data: ''}));
		} else if (e.currentTarget.textContent === 'profile settings') {
			dispatch(setModal({ value: true, type: 'profile', data: ''}));
		}
	}

	const handleMenuOnClick = () => {
		dispatch(setModal({ value: true, type: 'menu', data:''}));
		document.body.style.overflow = 'hidden';
	}

	return (
		<>
			<Container $type={isLoggedIn.toString()}>
				{ !isLoggedIn &&
					<NavWoAuth>
						<Link to="/">
							<Logo />
						</Link>
					</NavWoAuth>
				}
				{ isLoggedIn &&
					<NavWAuth>
						<Link to="/expense-log">
							<Logo />
						</Link>

						<NavButtonWrapper>
							<HeaderNavLink to="/expense-log/expense">
								all expense
							</HeaderNavLink>
							<HeaderNavLink to="/expense-log/income">
								all income
							</HeaderNavLink>
						</NavButtonWrapper>

						<ProfileWrapper
							id="profileWrapper"
							onClick={handleOnClick}>
							<UserImage
								src={
									user.avatarUrl === null ?
									"https://fakeimg.pl/150x150?text=Image" : user.avatarUrl
								}
								key={Date.now()}
								alt=""
							/>
								<div
									id="profileName" 
									style={{
										textTransform: 'capitalize'
									}}
								>
									{user.name}
								</div>
								<ProfileIcon $type={showDD.toString()}>
									<MdKeyboardControlKey 
										size={30}
									/>
								</ProfileIcon>
								{ showDD &&
								<DropDown className="profile-dropdown">
									<DropDownList id="profile" onClick={handleDdOnClick}>
										<DropDownIcon>
											<FiUser size={18} />
										</DropDownIcon>
										profile settings
									</DropDownList>
									<DropDownList id="logout" onClick={handleDdOnClick}>
										<DropDownIcon>
											<LuLogOut size={18} />
										</DropDownIcon>
										logout
									</DropDownList>
								</DropDown>
								}
						</ProfileWrapper>
					</NavWAuth>
				}
				{isLoggedIn &&
					<NavWAuth 
						$type="mobile"
						>
						<Link to="/expense-log">
							<Logo />
						</Link>
						<Burger 
							onClick={handleMenuOnClick}
						>
							<TbMenu size={30}/>
						</Burger>
					</NavWAuth>
				}
				{!isLoggedIn &&
				<NavWoAuth $type="mobile">
					<Link to="/">
						<Logo />
					</Link>
				</NavWoAuth>
				}
			</Container>
			
			<Container>
				{ !isRefreshing ?
					<Outlet />
					:
					<Loader />
				}
				{ showModal && 
					<Overlay
						id="overlay" 
						onClick={closeModals}
						$type={modalType.toString()}>
						{modalType !== 'menu' ?
							<Modal /> 
							:
							<MobileMenu />
						}
					</Overlay>
				}
			</Container>
			<ToastContainer />
		</>
	);
}