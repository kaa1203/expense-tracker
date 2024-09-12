import { 
	ModalTwo,
	NavButtonWrapper,
	HeaderNavLink,
	ProfileWrapper,
	UserImage,
	ProfileIcon,
	DropDown,
	DropDownIcon,
	DropDownList,
	MenuProfileWrapper,
	ProfileCloseIcon,
} from "../App.styled";

import { MdKeyboardControlKey } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/modal/modalSlice";
import { IoCloseSharp } from "react-icons/io5";

export const MobileMenu = () => {
 const [showDD, setShowDD] = useState(false);
 const { user } = useAuth();
 const dispatch = useDispatch();
 
 const handleOnClick = () => {
	if (showDD) {
		return setShowDD(false);
	}
	setShowDD(true);
 }

 const handleDdOnClick = e => {
	if (e.currentTarget.textContent === 'logout') {
		dispatch(setModal({ value: true, type: 'logout', data: ''}));
	} else if (e.currentTarget.textContent === 'profile settings') {
		dispatch(setModal({ value: true, type: 'profile', data: ''}));
	}
 }

 const handleOnClose = () => {
	dispatch(setModal({ value: false, type: 'menu', data: ''}));
	document.body.style.overflow = 'auto';
 }

	return (
		<ModalTwo>
			<MenuProfileWrapper $type="menu-two">
				<ProfileWrapper onClick={handleOnClick}>
				<UserImage
					src={
						user.avatarUrl === null ?
						"https://fakeimg.pl/150x150?text=Image" : user.avatarUrl
					}
					alt=""
				/>
					<div style={{
						textTransform: 'capitalize'
					}}>
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
				<ProfileCloseIcon onClick={handleOnClose}>
					<IoCloseSharp size={45}/>
				</ProfileCloseIcon>
			</MenuProfileWrapper>

			<NavButtonWrapper $type="menu-two">
				<HeaderNavLink 
					$type="menu-two"
					to="/expense-log/expense"
					onClick={handleOnClose}
				>
					all expense
				</HeaderNavLink>
				<HeaderNavLink 
					$type="menu-two"
					to="/expense-log/income"
					onClick={handleOnClose}
				>
					all income
				</HeaderNavLink>
			</NavButtonWrapper>
		</ModalTwo>
	);
}
