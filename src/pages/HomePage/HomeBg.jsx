import { GoArrowUpRight } from "react-icons/go";
import {
   Background, 
   HomeDecoBlock,
   HeadingFour,
   HeadingFive,
   BalWrapper,
   GreenText,
   HomeIcon
} from "../../components/App.styled";

import { useScreenWidth } from "../../hooks/useScreenWidth";

export const HomeBg = () => {
   const { width } = useScreenWidth();
	return (
      <Background> 
         <HomeDecoBlock>
            <HomeIcon>
               <GoArrowUpRight size={ width < 768 ? 23 : 25} />
            </HomeIcon>
            <BalWrapper>
               <HeadingFive $type="home">Your balance</HeadingFive>
               <HeadingFour $type="home">$632.00</HeadingFour>  
            </BalWrapper>
            <GreenText>+1.29%</GreenText>
         </HomeDecoBlock>
      </Background>
    );
}