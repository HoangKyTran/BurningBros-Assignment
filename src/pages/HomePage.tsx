import { Box, Typography, Skeleton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMemo } from "react";
import MySearch from "../components/Search/Search";
import { useQuery } from "react-query";
import { getProductClient } from "../api/ProductClient";
import { generateGroupedProduct } from "../utils/product";
import ProductList from "../components/GroupProduct/ProductList";
import useSearchStore from "../zustand/searchStore";

const HomePage = (): JSX.Element => {
	const productClient = getProductClient();
	const { search } = useSearchStore();

	const { data, isLoading, error } = useQuery({
		queryKey: ["products", { search }],
		queryFn: () => productClient.searchProducts({ q: search }),
		staleTime: Infinity,
	});

	const { groupCounts, groups, productList, groupedProduct } = useMemo(
		() => generateGroupedProduct(data?.products || []),
		[data],
	);

	return (
		<Box
			style={{
				borderRadius: "24px",
				height: 880,
				width: 528,
				margin: "72px auto",
				backgroundColor: "#fff",
				padding: 24,
				boxShadow:
					"0px 0px 4px 0px rgba(5, 43, 97, 0.12),2px 6px 12px 0px rgba(0, 0, 0, 0.12)",
			}}
		>
			<Grid2 container gap={2} flexDirection="column">
				<Grid2 container xs={12}>
					<MySearch />
				</Grid2>
				<Grid2 container flexDirection="row" alignItems="center">
					<Grid2 xs={3}>
						<Typography sx={{ fontSize: 20, fontWeight: 600 }}>
							Product List
						</Typography>
					</Grid2>
					<Grid2 xs={9}>
						<Box width="100%">
							<hr
								style={{
									border: "none",
									borderTop: "1px dashed #D9E0E8",
									color: "#D9E0E8",
									textAlign: "center",
									height: 1,
									width: "100%",
								}}
							/>
						</Box>
					</Grid2>
				</Grid2>
				{isLoading ? (
					<Box>
						{Array.from(new Array(10)).map((_, index) => (
							<Skeleton
								key={index}
								sx={{ marginTop: "12px" }}
								variant="rounded"
								width="100%"
								height={60}
							/>
						))}
					</Box>
				) : (
					<Grid2 container>
						{!error && <ProductList groupedProduct={groupedProduct} />}
					</Grid2>
				)}

				{/* implement Virtuoso but there's some bug with collapse of MUI
				 <GroupedVirtuoso
						groupCounts={groupCounts}
						style={{ height: 720, width: "100%" }}
						groupContent={(index) => {
							return (
								<div
									onClick={() => setChecked(index)}
									style={{
										backgroundColor: "white",
										// padding: "12px 16px 12px 16px",
										borderRadius: "8px",
									}}
								>
									{groups[index] + " " + index}
								</div>
							);
						}}
						itemContent={(index, groupIndex) => {
							return (
								<Collapse
									key={productList[index].id}
									in={checked === groupIndex}
								>
									<Product product={productList[index]} />
									{productList[index].title}({groupIndex})
								</Collapse>
							);
						}}
					/> */}
			</Grid2>
		</Box>
	);
};

export default HomePage;
