import { 
   HeadingOne,
	HeadingThree, 
   HeadingSix, 
   Underline,
   TextWrapper,
   TextContent,
   StyledNavLink,
   ButtonWrapper,
	UserWithBorder,
	UserImage,
	Wrapper
} from "../../components/App.styled";

export const HomeText = () => {
	const images = require.context('../../images/users', true);
	const users = images.keys().map(user => images(user) );

   return(
      <TextWrapper>
         <TextContent>
         	<HeadingSix>expense log</HeadingSix>
            <HeadingOne>manage your <Underline>finances</Underline> masterfully!</HeadingOne>
            <p>ExpenseTracker effortlessly empowers you to take control of your finances! With intuitive features, it simplifies the process of tracking and managing expenses, allowing for a stress-free mastery over your financial world.</p>
            <ButtonWrapper $type="siu">
               <StyledNavLink to="signup">
						sign up
					</StyledNavLink>
               <StyledNavLink to="signin">
						sign in
					</StyledNavLink>
            </ButtonWrapper>
         </TextContent>

			<Wrapper $type="users">
				{
					users.map(user => (
						<UserWithBorder key={user+1}>
							<UserImage src={user} alt={user} />
						</UserWithBorder>
					))
				}
				<TextWrapper>
					<HeadingThree>1000 users +</HeadingThree>
					<p>Trusted by users for reliable<br/> expense tracking!</p>
				</TextWrapper>
			</Wrapper>

      </TextWrapper>

   );
}