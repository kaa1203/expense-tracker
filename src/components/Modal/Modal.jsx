import { 
   WrapperColumn,
   ModalWrapper,
	HeadingThree,
   CloseIcon,
	Button, 
	ButtonWrapper,
	ProfilePictureWrapper, 
	LogoutContentWrapper,
	UserImage,
	ProfilePictureDropdownWrapper,
	ProfilePictureDropdownList,
	ProfilePictureDropdownItem,
	WrapperRow,
	Label,
	Input,
	ProfileForm,
	CurrencyIcon,
	CategoryWrapper,
	CategoryList,
	Text,
	Form,
	ProfileInput,
	CustomInput
} from "../App.styled";

import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import { setModal } from "../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { useCategory } from "../../hooks/useCategory";
import { useState, useEffect } from "react";
import { MdKeyboardControlKey } from "react-icons/md";
import { addCategory, updateCategory } from "../../redux/category/operations";
import { changeProfile } from "../../redux/auth/operations";
import { Categories } from "./Categories";
import { Loader } from "../Loader/Loader";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { changeDp } from "../../redux/auth/operations";

export const Modal = () => {
	const { user } = useAuth();
	const { modalType } = useModal();
	const { category, categoryIsLoading } = useCategory();
	const { width, height } = useScreenWidth();
	const currencyArray = ['₴ UAH','$ USD','€ EUR'];

	const dispatch = useDispatch();

	const [name, setName] = useState(user.name); 
	const [currency, setCurrency] = useState(user.currency); 
	const [currencyDropdown, setCurrencyDropdown] = useState(false);
	const [categoryValue, setCategoryValue] = useState('');
	const [categoryOption, setCategoryOption] = useState('');
	const [editCategory, setEditCategory] = useState(false);
	const [avatar, setAvatar] = useState('');

	const type = modalType.toLowerCase();
	
	useEffect(() => {
		if (modalType) {
			document.body.style.overflow = "hidden";
		}
	}, [modalType]);

	// Profile
	const handleOnClose = () => {
		dispatch(setModal({ value: false, data: '' }));
		document.body.style.overflow = 'auto';
	};

	const handleNameOnChange = e => setName(e.target.value);
	const handleCurrencyOnClick = e => setCurrency(e.target.textContent.slice(2, 5).toLowerCase());

	const handleProfileOnSubmit = e => {
		e.preventDefault();
		const form = e.target;

		if (avatar) {	
			const fd = new FormData();
			fd.append("avatar", avatar);
			dispatch(changeDp(fd));
			// My last resort T_T I didn't manage to fix this one...
			// I'll fix you later!
			setTimeout(() => window.location.reload(), 1500);
		}
		
		if (currency) {
			dispatch(changeProfile({
				name: form.elements.name.value,
				currency: currency
			}));
		}
		dispatch(setModal({ value: false }));
		toast.success('Profile Updated!', { theme: 'dark', autoClose: 1200 });
	}

	const handlePpDropdown = () => setCurrencyDropdown(!currencyDropdown);

	const handleOnLogout = () => {
		dispatch(setModal({ value: false }));
		document.body.style.overflow = "auto";
		dispatch(logout());
	};
	
	const handleUploadOnClick = () => {
		// console.log(imageRef.current.click());
	}

	const handleOnChange = e => {
		const img = e.target.files[0];
		
		const type = img.type.slice(6, img.type.length);
		
		if (type === 'jpeg' || type === 'png') {
			if (img.size.toFixed(2) / 1024 > 1024) return toast.error('Image is too large',{ theme: 'dark' })
		} else {
			return toast.error('JPEG and PNG files only!',{ theme: 'dark' })
		} 
		setAvatar(img);
	}

	// Category
	const handleCategoryOnChange = e => setCategoryValue(e.target.value);
	
	const handleCategoryOnSubmit = e => {
		e.preventDefault();
		const cateExists = category[type].findIndex(cate => cate.categoryName.toLowerCase() === categoryValue.toLowerCase());

		if (categoryValue === '') {
			return toast.error('Fill up the field first!', {
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (categoryValue.length > 16) {
			return toast.error('Category must be less than or equal to 16 characters long', {
				theme: 'dark',
				autoClose: 2500
			});
		}

		if (categoryOption.id) {
			if (cateExists !== -1) {
				return toast.error('Category already exists!', {
					theme: 'dark',
					autoClose: 2500
				});
			}
			 dispatch(updateCategory({
				id: categoryOption.id,
				categoryName: categoryValue,
				type: categoryOption.type				
			}));
			setEditCategory(!editCategory);
			toast.success('Category Updated!', {
				theme: 'dark',
				autoClose: 2500
			});
		} else {
			if (cateExists !== -1) {
				return toast.error('Category already exists!', {
					theme: 'dark',
					autoClose: 2500
				});
			}
			dispatch(addCategory({
				type,
				categoryName: categoryValue
			}));
			toast.success('Category Added!', {
				theme: 'dark',
				autoClose: 2500
			});
		}

		setCategoryValue('');
	}

	const modalSize = width > 320 || width < 768 ? 's' : 'xs';
	
	return (
      <ModalWrapper 
			$type={modalType.toString()}
			$size={modalSize}
			$height={height}
			>
			<CloseIcon onClick={handleOnClose}> 
            <IoCloseOutline size={25} />
         </CloseIcon>
         { modalType === 'profile' && 
				<HeadingThree $type="profile">Profile settings</HeadingThree> }
         { (modalType === 'Expenses' ||  
			  modalType === 'Incomes') && 
			  <HeadingThree $type="marginLeft">{ modalType }</HeadingThree> 
			}

         <WrapperColumn>
			{ modalType === 'logout' &&
				<LogoutContentWrapper>
					<p>Are you sure you want to log out?</p>
					<ButtonWrapper>
						<Button
							onClick={handleOnLogout}
						>Logout</Button>
						<Button 
							color="grey"
							onClick={handleOnClose}
						>
							Cancel
						</Button>
					</ButtonWrapper>
				</LogoutContentWrapper>
			}

			{ modalType === 'profile' &&
				<ProfilePictureWrapper>
					{/* <WrapperColumn $type="profile"> */}
						<UserImage
							src={
								user.avatarUrl === null ?
								"https://fakeimg.pl/150x150?text=Image" : user.avatarUrl
							}
							alt=""
							$type="profile-pic"
						/>
						<ButtonWrapper
							onClick={handleUploadOnClick} 
							$type="profile">
							<CustomInput>
								Upload new photo
								<ProfileInput 
									type="file" 
									name="file"
									onChange={handleOnChange}
									accept=".png,.jpg,.gif"
									/>
							</CustomInput>
							<Button
								$type="profile" 
								color="grey"
							>
								Remove
							</Button>
						</ButtonWrapper>
					{/* </WrapperColumn> */}
					
					<ProfileForm 
						onSubmit={handleProfileOnSubmit}
						$type="profile-dropdown">
						<WrapperRow>
							<ProfilePictureDropdownWrapper onClick={handlePpDropdown}>
								<Input
									name="profileDropdown" 
									value={currency}
									$type="profile-dropdown" 
									readOnly
								/>
								{ currencyDropdown &&
									<ProfilePictureDropdownList>
										{currencyArray.map((cur, i) => (
											<ProfilePictureDropdownItem 
												key={i}
												onClick={handleCurrencyOnClick}
												>
												<p>
													{cur}
												</p>
											</ProfilePictureDropdownItem>
										))}
									</ProfilePictureDropdownList>
								}
							</ProfilePictureDropdownWrapper>
							<CurrencyIcon $type={currencyDropdown.toString()}>
								<MdKeyboardControlKey 
									size={25}
								/>
							</CurrencyIcon>
							<Input
								name="name"
								$type="profile-name"
								onChange={handleNameOnChange}
								value={name}
								autoComplete="off"
							/>
						</WrapperRow>
						<Button $type="profile-dropdown">Save</Button>
					</ProfileForm>
				</ProfilePictureWrapper>
			}

			{ (modalType === 'Expenses' ||  
			   modalType === 'Incomes') &&
				<CategoryWrapper>
					<Text $type="category">All category</Text>
					
					<CategoryList>
					{ categoryIsLoading && <Loader size={40} /> }

					{ !categoryIsLoading && 
						category[type] !== undefined && 
						category[type]
						.map(category => ( 
							<Categories 
								key={category._id}
								category={category}
								type={type}
								cateProps={
									{
										setEditCategory,
										setCategoryValue,
										setCategoryOption
									}
								}
							/>
						))
					}
					</CategoryList>
					<Form onSubmit={handleCategoryOnSubmit}>
						<Label $type="category">
							New Category
							<Input
								id="cateInput" 
								name="new-category"
								placeholder="Enter category"
								autoComplete="off"
								onChange={handleCategoryOnChange}
								value={categoryValue}
							/>
							<Button $type="category">
								{editCategory ? 'Edit' : 'Add'}
							</Button>
						</Label>
					</Form>
				</CategoryWrapper>
			}

			{
				modalType === 'edit' &&
				<TransactionForm />
			}
         </WrapperColumn>
      </ModalWrapper>
   );
}