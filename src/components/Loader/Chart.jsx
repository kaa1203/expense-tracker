import { 
	ChartSkeleton, 
	ChartSkeletonWrapper, 
	ChartSkeletonList,
	ChartSkeletonItem,
} from "components/App.styled";

export const ChartLoader = () => {
	return(
		<ChartSkeletonWrapper>
			<ChartSkeleton />
			<ChartSkeletonList>
				<ChartSkeletonItem />
				<ChartSkeletonItem />
				<ChartSkeletonItem />
				<ChartSkeletonItem />
				<ChartSkeletonItem />
			</ChartSkeletonList>
		</ChartSkeletonWrapper>
	);
}