import { 
	Container,
   Logo,
   WrapperRow,
   SkeletonWrapper,
   SkeletonWrapperCol,
   SkeletonButton,
   SkeletonProfile,
   SkeletonLogo,
   SkeletonContent,
   SkeletonTransaction,
   SkeletonText
} from "components/App.styled";

import { useLocation } from "react-router-dom";

export const PageSkeleton = () => {
	const current = useLocation().pathname;
	
   return (
      <Container>
         <SkeletonWrapper $type="nav">
            <SkeletonLogo>
               <Logo />
            </SkeletonLogo>
            <WrapperRow>
               <SkeletonButton />
               <SkeletonButton />
            </WrapperRow>
            <SkeletonProfile />
         </SkeletonWrapper>

			{ current !== '/expense-log' 
				?
				<SkeletonWrapperCol>
					<SkeletonWrapper $type="tran-header">
						<SkeletonWrapperCol>
							<SkeletonText $type="header" />
							<div>
								<SkeletonText $type="long-text" />
								<SkeletonText $type="short-text" />
							</div>
						</SkeletonWrapperCol>
						<SkeletonWrapper $type="tran-wrapper">
							<SkeletonTransaction $type="transaction" />
							<SkeletonTransaction $type="transaction" />
						</SkeletonWrapper>
					</SkeletonWrapper>
					<SkeletonContent $type="table" />
				</SkeletonWrapperCol>
				:
				<SkeletonWrapper>
					<SkeletonWrapperCol $type="header">
						<>
							<SkeletonText $type="header" />
							<div>
								<SkeletonText $type="long-text" />
								<SkeletonText $type="short-text" />
							</div>
						</>
						<SkeletonWrapper $type="transaction">
							<SkeletonTransaction />
							<SkeletonTransaction />
						</SkeletonWrapper>
						<SkeletonContent $type="chart" />
					</SkeletonWrapperCol>
					<SkeletonContent $type="form" />
				</SkeletonWrapper>
			}
      </Container>
   );
}